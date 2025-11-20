import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import './Profile.css';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  
  const { user, updateProfile } = authContext;
  const { setAlert } = alertContext;
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
      });
    }
  }, [user]);
  
  const { name, email, role } = profile;
  
  const onChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      updateProfile(profile);
      setAlert('Profile updated successfully', 'success');
      setIsEditing(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'badge-danger';
      case 'manager':
        return 'badge-warning';
      case 'member':
        return 'badge-info';
      default:
        return 'badge-secondary';
    }
  };
  
  return (
    <div className='profile page-container'>
      <div className="profile-header">
        <h1>Profile Settings</h1>
        <p className="text-muted">Manage your account information and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2>{user?.name || 'User'}</h2>
            <span className={`badge ${getRoleBadgeColor(role)}`}>
              {role || 'Member'}
            </span>
          </div>

          <div className="profile-info-section">
            {!isEditing ? (
              <>
                <div className="info-item">
                  <label>Name</label>
                  <p>{name || 'Not set'}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{email || 'Not set'}</p>
                </div>
                <div className="info-item">
                  <label>Role</label>
                  <p>{role || 'Not set'}</p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <form onSubmit={onSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor='name'>Name *</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    onChange={onChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor='email'>Email *</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={onChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor='role'>Role</label>
                  <input
                    type='text'
                    name='role'
                    id='role'
                    value={role}
                    disabled
                    className="input-disabled"
                  />
                  <small className="form-help">Role cannot be changed</small>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setProfile({
                        name: user?.name || '',
                        email: user?.email || '',
                        role: user?.role || '',
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <input
                    type='submit'
                    value='Save Changes'
                    className='btn btn-primary'
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Projects</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <h3>45</h3>
              <p>Tasks</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>38</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
