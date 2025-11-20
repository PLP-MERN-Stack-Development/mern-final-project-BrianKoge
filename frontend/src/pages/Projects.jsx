import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/ui/Modal';
import Loading from '../components/ui/Loading';
import MemberSelector from '../components/members/MemberSelector';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'planning',
    members: [],
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          name: 'Website Redesign',
          description: 'Redesign company website with modern UI and improved user experience',
          status: 'active',
          startDate: '2024-01-01',
          endDate: '2024-03-31',
          progress: 65,
          members: [
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Manager', avatar: 'JD' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', avatar: 'JS' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', avatar: 'BJ' },
          ],
          tasks: 24,
        },
        {
          id: 2,
          name: 'Mobile App Development',
          description: 'Develop mobile app for iOS and Android platforms',
          status: 'planning',
          startDate: '2024-02-01',
          endDate: '2024-06-30',
          progress: 15,
          members: [
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', avatar: 'JS' },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', avatar: 'AB' },
          ],
          tasks: 12,
        },
        {
          id: 3,
          name: 'API Integration',
          description: 'Integrate third-party APIs and build custom endpoints',
          status: 'active',
          startDate: '2024-01-15',
          endDate: '2024-04-15',
          progress: 40,
          members: 3,
          tasks: 18,
        },
        {
          id: 4,
          name: 'Data Migration',
          description: 'Migrate legacy data to new system architecture',
          status: 'completed',
          startDate: '2023-12-01',
          endDate: '2023-12-31',
          progress: 100,
          members: 4,
          tasks: 30,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateProject = (e) => {
    e.preventDefault();
    const project = {
      id: projects.length + 1,
      ...newProject,
      progress: 0,
      tasks: 0,
    };
    setProjects([...projects, project]);
    setShowCreateModal(false);
    setNewProject({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'planning',
      members: [],
    });
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setNewProject({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
      members: project.members || [],
    });
    setShowEditModal(true);
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    setProjects(projects.map(p => 
      p.id === selectedProject.id 
        ? { ...p, ...newProject }
        : p
    ));
    setShowEditModal(false);
    setSelectedProject(null);
    setNewProject({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'planning',
      members: [],
    });
  };

  const handleManageMembers = (project) => {
    setSelectedProject(project);
    setShowMembersModal(true);
  };

  const handleAddMember = (user) => {
    if (selectedProject) {
      const updatedProject = {
        ...selectedProject,
        members: [...(selectedProject.members || []), user],
      };
      setProjects(projects.map(p => 
        p.id === selectedProject.id ? updatedProject : p
      ));
      setSelectedProject(updatedProject);
    }
  };

  const handleRemoveMember = (memberId) => {
    if (selectedProject) {
      const updatedProject = {
        ...selectedProject,
        members: (selectedProject.members || []).filter(m => m.id !== memberId),
      };
      setProjects(projects.map(p => 
        p.id === selectedProject.id ? updatedProject : p
      ));
      setSelectedProject(updatedProject);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <Loading fullScreen text="Loading projects..." />;
  }

  return (
    <div className='projects page-container'>
      <div className='projects-header'>
        <div>
          <h1>Projects</h1>
          <p className="text-muted">Manage and track all your projects</p>
        </div>
        <button
          className='btn btn-primary'
          onClick={() => setShowCreateModal(true)}
        >
          + Create Project
        </button>
      </div>

      <div className="projects-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'planning' ? 'active' : ''}`}
            onClick={() => setFilter('planning')}
          >
            Planning
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <h3>No projects found</h3>
          <p>Create your first project to get started!</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className='project-grid'>
          {filteredProjects.map(project => (
            <div key={project.id} className='project-card'>
              <div className="project-card-header">
                <h3>{project.name}</h3>
                <span className={`status status-${project.status}`}>
                  {project.status}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              
              <div className="project-progress">
                <div className="progress-header">
                  <span>Progress</span>
                  <span className="progress-percentage">{project.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="project-meta">
                <div className="meta-item">
                  <span className="meta-icon">👥</span>
                  <span>{project.members?.length || 0} members</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">✓</span>
                  <span>{project.tasks} tasks</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <span>{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="project-card-footer">
                <Link
                  to={`/projects/${project.id}`}
                  className='btn btn-primary btn-sm'
                >
                  View Details
                </Link>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => handleEditProject(project)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => handleManageMembers(project)}
                >
                  Members
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Project"
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
              onClick={handleCreateProject}
            >
              Create Project
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateProject}>
          <div className="form-group">
            <label htmlFor="name">Project Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              required
              placeholder="Enter project name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              placeholder="Enter project description"
              rows="4"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={newProject.startDate}
                onChange={(e) =>
                  setNewProject({ ...newProject, startDate: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={newProject.endDate}
                onChange={(e) =>
                  setNewProject({ ...newProject, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={newProject.status}
              onChange={(e) =>
                setNewProject({ ...newProject, status: e.target.value })
              }
            >
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <MemberSelector
              selectedMembers={newProject.members}
              onSelect={(user) => {
                setNewProject({
                  ...newProject,
                  members: [...newProject.members, user],
                });
              }}
              onRemove={(memberId) => {
                setNewProject({
                  ...newProject,
                  members: newProject.members.filter(m => m.id !== memberId),
                });
              }}
              multiple={true}
              label="Add Team Members"
            />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProject(null);
          setNewProject({
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            status: 'planning',
            members: [],
          });
        }}
        title="Edit Project"
        size="medium"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowEditModal(false);
                setSelectedProject(null);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUpdateProject}
            >
              Update Project
            </button>
          </>
        }
      >
        <form onSubmit={handleUpdateProject}>
          <div className="form-group">
            <label htmlFor="edit-name">Project Name *</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              required
              placeholder="Enter project name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              name="description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              placeholder="Enter project description"
              rows="4"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-startDate">Start Date</label>
              <input
                type="date"
                id="edit-startDate"
                name="startDate"
                value={newProject.startDate}
                onChange={(e) =>
                  setNewProject({ ...newProject, startDate: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-endDate">End Date</label>
              <input
                type="date"
                id="edit-endDate"
                name="endDate"
                value={newProject.endDate}
                onChange={(e) =>
                  setNewProject({ ...newProject, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="edit-status">Status</label>
            <select
              id="edit-status"
              name="status"
              value={newProject.status}
              onChange={(e) =>
                setNewProject({ ...newProject, status: e.target.value })
              }
            >
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showMembersModal}
        onClose={() => {
          setShowMembersModal(false);
          setSelectedProject(null);
        }}
        title={`Manage Members - ${selectedProject?.name || ''}`}
        size="large"
      >
        <div className="members-management">
          <MemberSelector
            selectedMembers={selectedProject?.members || []}
            onSelect={handleAddMember}
            onRemove={handleRemoveMember}
            multiple={true}
            label="Add Team Members"
          />
          <div className="members-list-section">
            <h3>Current Members ({selectedProject?.members?.length || 0})</h3>
            {selectedProject?.members && selectedProject.members.length > 0 ? (
              <div className="members-list">
                {selectedProject.members.map((member) => (
                  <div key={member.id} className="member-card">
                    <div className="member-avatar">
                      {member.avatar || member.name.charAt(0)}
                    </div>
                    <div className="member-details">
                      <span className="member-name">{member.name}</span>
                      <span className="member-email">{member.email}</span>
                    </div>
                    <span className="member-role">{member.role}</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No members added yet. Add members using the selector above.</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Projects;
