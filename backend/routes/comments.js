const express = require('express');
const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comments');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getComments)
  .post(createComment);

router.route('/:id')
  .get(getComment)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;