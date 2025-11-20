const Comment = require('../models/Comment');
const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private
exports.getComments = async (req, res, next) => {
  try {
    let query;
    
    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude from query
    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Finding resource
    query = Comment.find(JSON.parse(queryStr));
    
    // Populate task and author
    query = query.populate([
      {
        path: 'task',
        select: 'title'
      },
      {
        path: 'author',
        select: 'name email'
      }
    ]);
    
    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Comment.countDocuments();
    
    query = query.skip(startIndex).limit(limit);
    
    // Executing query
    const comments = await query;
    
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.previous = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: comments.length,
      pagination,
      data: comments
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single comment
// @route   GET /api/comments/:id
// @access  Private
exports.getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate([
      {
        path: 'task',
        select: 'title'
      },
      {
        path: 'author',
        select: 'name email'
      }
    ]);
    
    if (!comment) {
      return next(
        new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
      );
    }
    
    res.status(200).json({
      success: true,
      data: comment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
exports.createComment = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.author = req.user.id;
    
    // Check if task exists
    const task = await Task.findById(req.body.task);
    
    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.body.task}`, 404)
      );
    }
    
    const comment = await Comment.create(req.body);
    
    // Populate author info
    await comment.populate([
      {
        path: 'author',
        select: 'name email'
      }
    ]);
    
    // Emit socket event for real-time update
    const io = req.app.get('socketio');
    io.to(task.project.toString()).emit('commentCreated', comment);
    
    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return next(
        new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
      );
    }
    
    // Make sure user is comment author
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this comment`,
          401
        )
      );
    }
    
    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    // Populate author info
    await comment.populate([
      {
        path: 'author',
        select: 'name email'
      }
    ]);
    
    // Get task for socket emit
    const task = await Task.findById(comment.task);
    
    // Emit socket event for real-time update
    const io = req.app.get('socketio');
    io.to(task.project.toString()).emit('commentUpdated', comment);
    
    res.status(200).json({
      success: true,
      data: comment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return next(
        new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
      );
    }
    
    // Make sure user is comment author
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this comment`,
          401
        )
      );
    }
    
    await comment.remove();
    
    // Get task for socket emit
    const task = await Task.findById(comment.task);
    
    // Emit socket event for real-time update
    const io = req.app.get('socketio');
    io.to(task.project.toString()).emit('commentDeleted', comment._id);
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};