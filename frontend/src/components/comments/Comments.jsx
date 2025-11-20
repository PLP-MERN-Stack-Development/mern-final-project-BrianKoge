import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import './Comments.css';

const Comments = ({ comments = [], onAddComment, onDeleteComment }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
      setShowForm(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>Comments ({comments.length})</h3>
        {!showForm && (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowForm(true)}
          >
            Add Comment
          </button>
        )}
      </div>

      {showForm && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows="3"
              className="comment-input"
              autoFocus
            />
          </div>
          <div className="comment-form-actions">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setShowForm(false);
                setNewComment('');
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-primary"
              disabled={!newComment.trim()}
            >
              Post Comment
            </button>
          </div>
        </form>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="comments-empty">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar">
                {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">
                    {comment.user?.name || 'Anonymous'}
                  </span>
                  <span className="comment-time">
                    {formatDate(comment.createdAt || comment.date)}
                  </span>
                </div>
                <div className="comment-text">{comment.text || comment.content}</div>
                {onDeleteComment && (comment.user?.id === user?.id || user?.role === 'admin') && (
                  <button
                    className="comment-delete"
                    onClick={() => onDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;

