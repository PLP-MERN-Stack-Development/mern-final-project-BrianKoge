const Task = require('../models/Task');
const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
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
    query = Task.find(JSON.parse(queryStr));
    
    // Populate project and assignee
    query = query.populate([
      {
        path: 'project',
        select: 'name'
      },
      {
        path: 'assignee',
        select: 'name email'
      },
      {
        path: 'createdBy',
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
    const total = await Task.countDocuments();
    
    query = query.skip(startIndex).limit(limit);
    
    // Executing query
    const tasks = await query;
    
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
      count: tasks.length,
      pagination,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate([
      {
        path: 'project',
        select: 'name'
      },
      {
        path: 'assignee',
        select: 'name email'
      },
      {
        path: 'createdBy',
        select: 'name email'
      }
    ]);
    
    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;
    
    // Check if project exists
    const project = await Project.findById(req.body.project);
    
    if (!project) {
      return next(
        new ErrorResponse(`Project not found with id of ${req.body.project}`, 404)
      );
    }
    
    const task = await Task.create(req.body);
    
    // Emit socket event for real-time update
    const io = req.app.get('socketio');
    io.to(project._id.toString()).emit('taskCreated', task);
    
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }
    
    // Make sure user is task creator or project owner
    const project = await Project.findById(task.project);
    
    if (
      task.createdBy.toString() !== req.user.id &&
      project.owner.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this task`,
          401
        )
      );
    }
    
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    // Emit socket event for real-time update
    const io = req.app.get('socketio');
    io.to(project._id.toString()).emit('taskUpdated', task);
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }
    
    // Make sure user is task creator or project owner
    const project = await Project.findById(task.project);
    
    if (
      task.createdBy.toString() !== req.user.id &&
      project.owner.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this task`,
          401
        )
      );
    }
    
    await task.remove();
    
    // Emit socket event for real-time update
    const io = req.app.get('socketio');
    io.to(project._id.toString()).emit('taskDeleted', task._id);
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return next(
        new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
      );
    }
    
    // Update task status
    task.status = req.body.status;
    await task.save();
    
    // Get project for socket emit
    const project = await Project.findById(task.project);
    
    // Emit socket event for real-time update
    const io = req.app.get('socketio');
    io.to(project._id.toString()).emit('taskStatusUpdated', {
      taskId: task._id,
      status: task.status
    });
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};