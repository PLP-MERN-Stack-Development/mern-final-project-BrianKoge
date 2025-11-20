import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
      <div className='hero-section'>
        <div className="hero-content">
          <div className="hero-badge">
            <span>✨</span> Streamline Your Workflow
          </div>
          <h1 className="hero-title">
            TaskFlow
            <span className="hero-subtitle">Project Management Made Simple</span>
          </h1>
          <p className="hero-description">
            Streamline your project management and team collaboration with our powerful, 
            intuitive platform. Organize tasks, track progress, and work together seamlessly.
          </p>
          <div className='hero-buttons'>
            <Link to='/register' className='btn btn-primary btn-lg'>
              Get Started Free
            </Link>
            <Link to='/login' className='btn btn-outline btn-lg'>
              Sign In
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Projects Managed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-1">
            <div className="card-header">
              <div className="card-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="card-content">
              <div className="card-item">
                <span className="card-check">✓</span>
                <span>Project Planning</span>
              </div>
              <div className="card-item">
                <span className="card-check">✓</span>
                <span>Task Management</span>
              </div>
              <div className="card-item">
                <span className="card-check">✓</span>
                <span>Team Collaboration</span>
              </div>
            </div>
          </div>
          <div className="hero-card hero-card-2">
            <div className="card-header">
              <div className="card-title">Active Projects</div>
            </div>
            <div className="card-progress">
              <div className="progress-item">
                <span>Website Redesign</span>
                <div className="progress-bar-mini">
                  <div className="progress-fill-mini" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="progress-item">
                <span>Mobile App</span>
                <div className="progress-bar-mini">
                  <div className="progress-fill-mini" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='features-section'>
        <div className="features-header">
          <h2>Everything You Need to Manage Projects</h2>
          <p>Powerful features designed to help your team work better together</p>
        </div>
        <div className='features-grid'>
          <div className='feature-card'>
            <div className="feature-icon">📁</div>
            <h3>Project Management</h3>
            <p>Create and manage projects with ease. Organize your work, set deadlines, and track progress all in one place.</p>
            <ul className="feature-list">
              <li>✓ Multiple project views</li>
              <li>✓ Progress tracking</li>
              <li>✓ Team collaboration</li>
            </ul>
          </div>
          <div className='feature-card'>
            <div className="feature-icon">✓</div>
            <h3>Task Tracking</h3>
            <p>Assign and track tasks with real-time updates. Never miss a deadline with our comprehensive task management system.</p>
            <ul className="feature-list">
              <li>✓ Kanban board view</li>
              <li>✓ Priority levels</li>
              <li>✓ Due date reminders</li>
            </ul>
          </div>
          <div className='feature-card'>
            <div className="feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>Collaborate with your team in real-time. Share files, comment on tasks, and stay connected with your team members.</p>
            <ul className="feature-list">
              <li>✓ Real-time notifications</li>
              <li>✓ Comments & discussions</li>
              <li>✓ File sharing</li>
            </ul>
          </div>
          <div className='feature-card'>
            <div className="feature-icon">📊</div>
            <h3>Analytics & Reports</h3>
            <p>Get insights into your team's performance with detailed analytics and customizable reports.</p>
            <ul className="feature-list">
              <li>✓ Progress dashboards</li>
              <li>✓ Performance metrics</li>
              <li>✓ Custom reports</li>
            </ul>
          </div>
          <div className='feature-card'>
            <div className="feature-icon">📅</div>
            <h3>Calendar View</h3>
            <p>Visualize your schedule and deadlines with our intuitive calendar view. Plan ahead and stay organized.</p>
            <ul className="feature-list">
              <li>✓ Monthly calendar</li>
              <li>✓ Deadline tracking</li>
              <li>✓ Event scheduling</li>
            </ul>
          </div>
          <div className='feature-card'>
            <div className="feature-icon">🔔</div>
            <h3>Smart Notifications</h3>
            <p>Stay updated with smart notifications. Get alerts for important updates, deadlines, and team activities.</p>
            <ul className="feature-list">
              <li>✓ Real-time alerts</li>
              <li>✓ Customizable settings</li>
              <li>✓ Email notifications</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of teams already using TaskFlow to manage their projects</p>
          <div className="cta-buttons">
            <Link to='/register' className='btn btn-primary btn-lg'>
              Start Free Trial
            </Link>
            <Link to='/login' className='btn btn-outline btn-lg'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
