import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import Loading from '../components/ui/Loading';
import './Dashboard.css';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completed: 0,
    overdue: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadUser();
    // Simulate loading data
    setTimeout(() => {
      setStats({
        projects: 12,
        tasks: 45,
        completed: 38,
        overdue: 3,
      });
      setRecentTasks([
        {
          id: 1,
          title: 'Design homepage',
          project: 'Website Redesign',
          dueDate: '2024-01-15',
          priority: 'high',
          status: 'in-progress',
        },
        {
          id: 2,
          title: 'Setup API endpoints',
          project: 'Mobile App',
          dueDate: '2024-01-20',
          priority: 'medium',
          status: 'todo',
        },
        {
          id: 3,
          title: 'Write documentation',
          project: 'Website Redesign',
          dueDate: '2024-01-18',
          priority: 'low',
          status: 'in-progress',
        },
      ]);
      setRecentActivity([
        { id: 1, type: 'task', action: 'completed', item: 'Design homepage', user: 'John Doe', time: '2 hours ago' },
        { id: 2, type: 'project', action: 'created', item: 'Mobile App', user: 'Jane Smith', time: '5 hours ago' },
        { id: 3, type: 'comment', action: 'added', item: 'Setup API endpoints', user: 'Bob Johnson', time: '1 day ago' },
      ]);
      setLoading(false);
    }, 1000);
  }, [loadUser]);

  if (loading) {
    return <Loading fullScreen text="Loading dashboard..." />;
  }

  const completionRate = stats.tasks > 0 ? Math.round((stats.completed / stats.tasks) * 100) : 0;

  return (
    <div className='dashboard page-container'>
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name || 'User'}! 👋</h1>
          <p className="text-muted">Here's what's happening with your projects today.</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/projects" className="btn btn-primary">
            Create Project
          </Link>
        </div>
      </div>

      <div className='dashboard-stats'>
        <div className='stat-card stat-card-primary'>
          <div className="stat-card-icon">📁</div>
          <div className="stat-card-content">
            <h3>Projects</h3>
            <p className="stat-value">{stats.projects}</p>
          </div>
        </div>
        <div className='stat-card stat-card-info'>
          <div className="stat-card-icon">✓</div>
          <div className="stat-card-content">
            <h3>Total Tasks</h3>
            <p className="stat-value">{stats.tasks}</p>
          </div>
        </div>
        <div className='stat-card stat-card-success'>
          <div className="stat-card-icon">✅</div>
          <div className="stat-card-content">
            <h3>Completed</h3>
            <p className="stat-value">{stats.completed}</p>
          </div>
        </div>
        <div className='stat-card stat-card-danger'>
          <div className="stat-card-icon">⚠️</div>
          <div className="stat-card-content">
            <h3>Overdue</h3>
            <p className="stat-value">{stats.overdue}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Progress Overview</h2>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="progress-stats">
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Completion Rate</span>
                    <span className="progress-percentage">{completionRate}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="progress-item">
                  <div className="progress-label">
                    <span>Tasks This Week</span>
                    <span className="progress-percentage">12/15</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: '80%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Tasks</h2>
            <Link to="/tasks" className="btn btn-sm btn-outline">View All</Link>
          </div>
          <div className="card">
            <div className="card-body">
              {recentTasks.length === 0 ? (
                <div className="empty-state">
                  <p>No recent tasks</p>
                </div>
              ) : (
                <div className="task-list-mini">
                  {recentTasks.map(task => (
                    <div key={task.id} className="task-item-mini">
                      <div className="task-item-header">
                        <h4>{task.title}</h4>
                        <span className={`priority priority-${task.priority}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="task-item-meta">
                        <span className="text-muted">{task.project}</span>
                        <span className="text-muted">Due: {task.dueDate}</span>
                      </div>
                      <div className="task-item-status">
                        <span className={`status status-${task.status}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Activity</h2>
        </div>
        <div className="card">
          <div className="card-body">
            {recentActivity.length === 0 ? (
              <div className="empty-state">
                <p>No recent activity</p>
              </div>
            ) : (
              <div className="activity-feed">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'task' && '✓'}
                      {activity.type === 'project' && '📁'}
                      {activity.type === 'comment' && '💬'}
                    </div>
                    <div className="activity-content">
                      <p>
                        <strong>{activity.user}</strong> {activity.action} <strong>{activity.item}</strong>
                      </p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/projects" className="action-card">
            <div className="action-icon">📁</div>
            <h3>Create Project</h3>
            <p>Start a new project</p>
          </Link>
          <Link to="/tasks" className="action-card">
            <div className="action-icon">✓</div>
            <h3>Add Task</h3>
            <p>Create a new task</p>
          </Link>
          <Link to="/calendar" className="action-card">
            <div className="action-icon">📅</div>
            <h3>View Calendar</h3>
            <p>See upcoming deadlines</p>
          </Link>
          <Link to="/projects" className="action-card">
            <div className="action-icon">👥</div>
            <h3>Manage Team</h3>
            <p>Invite team members</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
