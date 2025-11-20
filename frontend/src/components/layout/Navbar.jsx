import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import './Navbar.css';

const Navbar = ({ onMenuClick }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const onLogout = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowUserMenu(false);
    logout();
    // Small delay to ensure state updates before navigation
    setTimeout(() => {
      navigate('/');
    }, 100);
  };

  const authLinks = (
    <>
      <li>
        <button
          className="btn btn-icon btn-menu-toggle"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </li>
      <li className="navbar-user">
        <div className="user-menu-container" ref={menuRef}>
          <button
            className="user-menu-trigger"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-expanded={showUserMenu}
            aria-haspopup="true"
          >
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="user-name">{user?.name || 'User'}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          {showUserMenu && (
            <div className="user-menu">
              <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                Profile Settings
              </Link>
              <button 
                onClick={onLogout}
                type="button"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to='/register' className="btn btn-outline btn-sm">Register</Link>
      </li>
      <li>
        <Link to='/login' className="btn btn-primary btn-sm">Login</Link>
      </li>
    </>
  );

  return (
    <nav className='navbar'>
      <div className="navbar-brand">
        <Link to='/'>
          <span className="navbar-logo">📋</span>
          <span className="navbar-title">TaskFlow</span>
        </Link>
      </div>
      <ul className="navbar-nav">{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;