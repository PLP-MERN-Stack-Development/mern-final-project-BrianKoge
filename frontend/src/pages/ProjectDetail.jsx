import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from '../components/ui/Modal';
import Loading from '../components/ui/Loading';
import Comments from '../components/comments/Comments';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
  });

  useEffect(() => {
    // Simulate API call to get project details
    setTimeout(() => {
      setProject({
        id: id,
        name: 'Website Redesign',
        description: 'Redesign company website with modern UI and improved user experience. This project involves creating a new design system, implementing responsive layouts, and improving overall user engagement.',
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        owner: 'John Doe',
        members: [
          { id: 1, name: 'John Doe', role: 'Manager', avatar: 'JD' },
          { id: 2, name: 'Jane Smith', role: 'Developer', avatar: 'JS' },
          { id: 3, name: 'Bob Johnson', role: 'Designer', avatar: 'BJ' },
        ],
        progress: 65,
      });
      
      setTasks([
        {
          id: 1,
          title: 'Create wireframes',
          description: 'Create wireframes for all pages',
          assignee: 'Jane Smith',
          priority: 'high',
          status: 'done',
          dueDate: '2024-01-15',
        },
        {
          id: 2,
          title: 'Design homepage',
          description: 'Design the homepage layout',
          assignee: 'Bob Johnson',
          priority: 'medium',
          status: 'in-progress',
          dueDate: '2024-01-20',
        },
        {
          id: 3,
          title: 'Implement header',
          description: 'Code the header component',
          assignee: 'John Doe',
          priority: 'low',
          status: 'todo',
          dueDate: '2024-01-25',
        },
      ]);

      setComments([
        {
          id: 1,
          text: 'Great progress on the wireframes! Looking forward to seeing the designs.',
          user: { id: 1, name: 'John Doe' },
          createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        },
        {
          id: 2,
          text: 'The homepage design is almost ready. Will share the mockups soon.',
          user: { id: 3, name: 'Bob Johnson' },
          createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
        },
      ]);
      
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
    };
    setTasks([...tasks, task]);
    setShowTaskModal(false);
    setNewTask({
      title: '',
      description: '',
      assignee: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
    });
  };

  const handleAddComment = (text) => {
    const comment = {
      id: comments.length + 1,
      text,
      user: { id: 1, name: 'Current User' },
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, comment]);
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  if (loading) {
    return <Loading fullScreen text="Loading project details..." />;
  }

  if (!project) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Project not found</h2>
          <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='project-detail page-container'>
      <div className="project-detail-header">
        <div>
          <Link to="/projects" className="back-link">
            ← Back to Projects
          </Link>
          <div className="project-title-section">
            <h1>{project.name}</h1>
            <span className={`status status-${project.status}`}>
              {project.status}
            </span>
          </div>
        </div>
        <div className="project-actions">
          <button
            className="btn btn-outline"
            onClick={() => setShowEditModal(true)}
          >
            Edit Project
          </button>
        </div>
      </div>
      
      <div className="project-detail-content">
        <div className="project-main">
          <div className='card project-info'>
            <div className="card-header">
              <h2>Project Overview</h2>
            </div>
            <div className="card-body">
              <p className="project-description">{project.description}</p>
              
              <div className="project-progress-section">
                <div className="progress-header">
                  <span>Overall Progress</span>
                  <span className="progress-percentage">{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className='project-meta-grid'>
                <div className="meta-item">
                  <span className="meta-label">Start Date</span>
                  <span className="meta-value">{new Date(project.startDate).toLocaleDateString()}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">End Date</span>
                  <span className="meta-value">{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Owner</span>
                  <span className="meta-value">{project.owner}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Team Members</span>
                  <span className="meta-value">{project.members.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="project-members-section card">
            <div className="card-header">
              <h2>Team Members</h2>
            </div>
            <div className="card-body">
              <div className="members-list">
                {project.members.map((member) => (
                  <div key={member.id} className="member-item">
                    <div className="member-avatar">
                      {member.avatar || member.name.charAt(0)}
                    </div>
                    <div className="member-info">
                      <span className="member-name">{member.name}</span>
                      <span className="member-role">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className='tasks-section card'>
            <div className='tasks-header'>
              <h2>Tasks ({tasks.length})</h2>
              <button
                className='btn btn-primary btn-sm'
                onClick={() => setShowTaskModal(true)}
              >
                + Add Task
              </button>
            </div>
            <div className="card-body">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <p>No tasks yet. Create your first task!</p>
                </div>
              ) : (
                <div className='task-list'>
                  {tasks.map(task => (
                    <div key={task.id} className='task-card'>
                      <div className="task-card-header">
                        <h3>{task.title}</h3>
                        <span className={`priority priority-${task.priority}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="task-description">{task.description}</p>
                      <div className='task-details'>
                        <div className="task-detail-item">
                          <span className="task-label">Assignee:</span>
                          <span>{task.assignee}</span>
                        </div>
                        <div className="task-detail-item">
                          <span className="task-label">Due Date:</span>
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="task-detail-item">
                          <span className={`status status-${task.status}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="comments-section-wrapper">
            <Comments
              comments={comments}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title="Add New Task"
        size="medium"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowTaskModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddTask}
            >
              Create Task
            </button>
          </>
        }
      >
        <form onSubmit={handleAddTask}>
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
              placeholder="Enter task title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Enter task description"
              rows="4"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assignee">Assignee</label>
              <input
                type="text"
                id="assignee"
                name="assignee"
                value={newTask.assignee}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignee: e.target.value })
                }
                placeholder="Assignee name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectDetail;
