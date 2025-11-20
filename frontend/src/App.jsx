import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';

// Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Alert from './components/layout/Alert';

// Context
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import AuthContext from './context/auth/authContext';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <Navbar onMenuClick={toggleSidebar} />
      {isAuthenticated && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      <div className={`main-content ${!isAuthenticated ? 'full-width' : ''}`}>
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <AppContent />
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;