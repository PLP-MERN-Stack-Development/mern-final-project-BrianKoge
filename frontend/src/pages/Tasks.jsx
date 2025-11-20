import React, { useState, useEffect } from 'react';
import Modal from '../components/ui/Modal';
import Loading from '../components/ui/Loading';
import MemberSelector from '../components/members/MemberSelector';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'kanban'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    project: '',
    assignee: null,
    priority: 'medium',
    status: 'todo',
    dueDate: '',
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTasks([
        {
          id: 1,
          title: 'Create wireframes',
          description: 'Create wireframes for all pages of the website',
          project: 'Website Redesign',
          assignee: { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', avatar: 'JS' },
          priority: 'high',
          status: 'done',
          dueDate: '2024-01-15',
        },
        {
          id: 2,
          title: 'Design homepage',
          description: 'Design the homepage layout with modern UI',
          project: 'Website Redesign',
          assignee: { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', avatar: 'BJ' },
          priority: 'medium',
          status: 'in-progress',
          dueDate: '2024-01-20',
        },
        {
          id: 3,
          title: 'Implement header',
          description: 'Code the header component with navigation',
          project: 'Website Redesign',
          assignee: { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Manager', avatar: 'JD' },
          priority: 'low',
          status: 'todo',
          dueDate: '2024-01-25',
        },
        {
          id: 4,
          title: 'Setup development environment',
          description: 'Setup React development environment',
          project: 'Mobile App Development',
          assignee: null,
          priority: 'medium',
          status: 'todo',
          dueDate: '2024-01-18',
        },
        {
          id: 5,
          title: 'API Integration',
          description: 'Integrate payment API',
          project: 'Mobile App Development',
          assignee: { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', avatar: 'AB' },
          priority: 'urgent',
          status: 'in-progress',
          dueDate: '2024-01-16',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
    };
    setTasks([...tasks, task]);
    setShowCreateModal(false);
    setNewTask({
      title: '',
      description: '',
      project: '',
      assignee: null,
      priority: 'medium',
      status: 'todo',
      dueDate: '',
    });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      project: task.project,
      assignee: task.assignee,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
    });
    setShowEditModal(true);
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    setTasks(tasks.map(t => 
      t.id === editingTask.id 
        ? { ...t, ...newTask }
        : t
    ));
    setShowEditModal(false);
    setEditingTask(null);
    setNewTask({
      title: '',
      description: '',
      project: '',
      assignee: null,
      priority: 'medium',
      status: 'todo',
      dueDate: '',
    });
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const kanbanColumns = [
    { id: 'todo', label: 'To Do', color: '#ef4444' },
    { id: 'in-progress', label: 'In Progress', color: '#3b82f6' },
    { id: 'done', label: 'Done', color: '#10b981' },
  ];

  if (loading) {
    return <Loading fullScreen text="Loading tasks..." />;
  }

  return (
    <div className='tasks page-container'>
      <div className='tasks-header'>
        <div>
          <h1>Tasks</h1>
          <p className="text-muted">Manage and track all your tasks</p>
        </div>
        <div className="tasks-header-actions">
          <div className="view-toggle">
            <button
              className={`view-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              List
            </button>
            <button
              className={`view-btn ${view === 'kanban' ? 'active' : ''}`}
              onClick={() => setView('kanban')}
            >
              Kanban
            </button>
          </div>
          <button
            className='btn btn-primary'
            onClick={() => setShowCreateModal(true)}
          >
            + Create Task
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="tasks-list-view">
          <div className="tasks-filters">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === 'todo' ? 'active' : ''}`}
                onClick={() => setFilter('todo')}
              >
                To Do
              </button>
              <button
                className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
                onClick={() => setFilter('in-progress')}
              >
                In Progress
              </button>
              <button
                className={`filter-btn ${filter === 'done' ? 'active' : ''}`}
                onClick={() => setFilter('done')}
              >
                Done
              </button>
            </div>
          </div>

          <div className='task-grid'>
            {(filter === 'all' ? tasks : tasks.filter(t => t.status === filter)).map(task => (
              <div
                key={task.id}
                className='task-card'
                onClick={() => setSelectedTask(task)}
              >
                <div className="task-card-header">
                  <h3>{task.title}</h3>
                  <span className={`priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="task-description">{task.description}</p>
              <div className="task-meta">
                <span className="task-project">{task.project}</span>
                <span className="task-assignee">
                  👤 {task.assignee?.name || 'Unassigned'}
                </span>
              </div>
                <div className="task-footer">
                  <span className={`status status-${task.status}`}>
                    {task.status}
                  </span>
                  <span className="task-due-date">📅 {task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="kanban-board">
          {kanbanColumns.map(column => {
            const columnTasks = getTasksByStatus(column.id);
            return (
              <div key={column.id} className="kanban-column">
                <div className="kanban-column-header">
                  <span>{column.label}</span>
                  <span className="kanban-column-count">{columnTasks.length}</span>
                </div>
                <div className="kanban-column-content">
                  {columnTasks.map(task => (
                    <div
                      key={task.id}
                      className="kanban-card"
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="kanban-card-actions">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTask(task);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="kanban-card-header">
                        <h4>{task.title}</h4>
                        <span className={`priority priority-${task.priority}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="kanban-card-description">{task.description}</p>
                      <div className="kanban-card-footer">
                        <span className="kanban-card-project">{task.project}</span>
                        <span className="kanban-card-assignee">
                          {task.assignee?.name || 'Unassigned'}
                        </span>
                        <span className="kanban-card-due">📅 {task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Task"
        size="medium"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleCreateTask}
            >
              Create Task
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateTask}>
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
            <div className="form-group">
              <label htmlFor="project">Project</label>
              <input
                type="text"
                id="project"
                name="project"
                value={newTask.project}
                onChange={(e) =>
                  setNewTask({ ...newTask, project: e.target.value })
                }
                placeholder="Project name"
              />
            </div>
            <div className="form-group">
              <MemberSelector
                selectedMembers={newTask.assignee ? [newTask.assignee] : []}
                onSelect={(user) => {
                  setNewTask({ ...newTask, assignee: user });
                }}
                onRemove={() => {
                  setNewTask({ ...newTask, assignee: null });
                }}
                multiple={false}
                label="Assign to Member"
              />
            </div>
          <div className="form-row">
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
        </form>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingTask(null);
          setNewTask({
            title: '',
            description: '',
            project: '',
            assignee: null,
            priority: 'medium',
            status: 'todo',
            dueDate: '',
          });
        }}
        title="Edit Task"
        size="medium"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowEditModal(false);
                setEditingTask(null);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUpdateTask}
            >
              Update Task
            </button>
          </>
        }
      >
        <form onSubmit={handleUpdateTask}>
          <div className="form-group">
            <label htmlFor="edit-title">Task Title *</label>
            <input
              type="text"
              id="edit-title"
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
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              name="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Enter task description"
              rows="4"
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-project">Project</label>
            <input
              type="text"
              id="edit-project"
              name="project"
              value={newTask.project}
              onChange={(e) =>
                setNewTask({ ...newTask, project: e.target.value })
              }
              placeholder="Project name"
            />
          </div>
          <div className="form-group">
            <MemberSelector
              selectedMembers={newTask.assignee ? [newTask.assignee] : []}
              onSelect={(user) => {
                setNewTask({ ...newTask, assignee: user });
              }}
              onRemove={() => {
                setNewTask({ ...newTask, assignee: null });
              }}
              multiple={false}
              label="Assign to Member"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-priority">Priority</label>
              <select
                id="edit-priority"
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
            <div className="form-group">
              <label htmlFor="edit-status">Status</label>
              <select
                id="edit-status"
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
          </div>
          <div className="form-group">
            <label htmlFor="edit-dueDate">Due Date</label>
            <input
              type="date"
              id="edit-dueDate"
              name="dueDate"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
            />
          </div>
        </form>
      </Modal>

      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title={selectedTask.title}
          size="medium"
        >
          <div className="task-detail">
            <div className="task-detail-section">
              <h4>Description</h4>
              <p>{selectedTask.description}</p>
            </div>
            <div className="task-detail-meta">
              <div className="meta-row">
                <span className="meta-label">Project:</span>
                <span>{selectedTask.project}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Assignee:</span>
                <div className="assignee-section">
                  <MemberSelector
                    selectedMembers={selectedTask.assignee ? [selectedTask.assignee] : []}
                    onSelect={(user) => {
                      handleStatusChange(selectedTask.id, selectedTask.status);
                      setTasks(tasks.map(t => 
                        t.id === selectedTask.id 
                          ? { ...t, assignee: user }
                          : t
                      ));
                      setSelectedTask({ ...selectedTask, assignee: user });
                    }}
                    onRemove={() => {
                      setTasks(tasks.map(t => 
                        t.id === selectedTask.id 
                          ? { ...t, assignee: null }
                          : t
                      ));
                      setSelectedTask({ ...selectedTask, assignee: null });
                    }}
                    multiple={false}
                    label="Change Assignee"
                  />
                </div>
              </div>
              <div className="meta-row">
                <span className="meta-label">Priority:</span>
                <span className={`priority priority-${selectedTask.priority}`}>
                  {selectedTask.priority}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Status:</span>
                <select
                  value={selectedTask.status}
                  onChange={(e) => {
                    handleStatusChange(selectedTask.id, e.target.value);
                    setSelectedTask({ ...selectedTask, status: e.target.value });
                  }}
                  className="status-select"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="task-detail-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleEditTask(selectedTask);
                    setSelectedTask(null);
                  }}
                >
                  Edit Task
                </button>
              </div>
              <div className="meta-row">
                <span className="meta-label">Due Date:</span>
                <span>{selectedTask.dueDate}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Tasks;
