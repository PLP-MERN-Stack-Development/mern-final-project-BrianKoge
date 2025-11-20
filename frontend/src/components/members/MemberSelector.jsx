import React, { useState, useEffect } from 'react';
import './MemberSelector.css';

const MemberSelector = ({ selectedMembers = [], onSelect, onRemove, multiple = true, label = 'Select Members' }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch users
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Manager', avatar: 'JD' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', avatar: 'JS' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', avatar: 'BJ' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', avatar: 'AB' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Manager', avatar: 'CW' },
      ]);
    }, 500);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const isSelected = selectedMembers.some(m => m.id === user.id || m === user.id);
    return matchesSearch && (!multiple || !isSelected);
  });

  const handleSelect = (user) => {
    if (onSelect) {
      onSelect(user);
    }
    if (!multiple) {
      setShowDropdown(false);
    }
    setSearchTerm('');
  };

  const getSelectedUserNames = () => {
    if (!multiple && selectedMembers.length > 0) {
      const selectedId = typeof selectedMembers[0] === 'object' ? selectedMembers[0].id : selectedMembers[0];
      const user = users.find(u => u.id === selectedId);
      return user ? user.name : 'Select member';
    }
    if (selectedMembers.length === 0) return 'Select members';
    if (selectedMembers.length === 1) {
      const member = typeof selectedMembers[0] === 'object' ? selectedMembers[0] : users.find(u => u.id === selectedMembers[0]);
      return member?.name || 'Select members';
    }
    return `${selectedMembers.length} members selected`;
  };

  return (
    <div className="member-selector">
      <label className="member-selector-label">{label}</label>
      <div className="member-selector-container">
        {selectedMembers.length > 0 && (
          <div className="selected-members">
            {selectedMembers.map((member, index) => {
              const memberId = typeof member === 'object' ? member.id : member;
              const memberData = typeof member === 'object' ? member : users.find(u => u.id === member);
              const displayName = memberData?.name || 'Unknown';
              const avatar = memberData?.avatar || displayName.charAt(0);
              
              return (
                <div key={memberId || index} className="selected-member-tag">
                  <span className="member-avatar-small">{avatar}</span>
                  <span className="member-name-small">{displayName}</span>
                  {onRemove && (
                    <button
                      className="member-remove"
                      onClick={() => onRemove(memberId)}
                      aria-label="Remove member"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className="member-selector-input-wrapper">
          <input
            type="text"
            className="member-selector-input"
            placeholder={multiple ? "Search and add members..." : "Search member..."}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && filteredUsers.length > 0 && (
            <div className="member-dropdown">
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  className="member-dropdown-item"
                  onClick={() => handleSelect(user)}
                >
                  <div className="member-avatar-small">{user.avatar}</div>
                  <div className="member-info">
                    <span className="member-name">{user.name}</span>
                    <span className="member-email">{user.email}</span>
                  </div>
                  <span className="member-role-badge">{user.role}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showDropdown && (
        <div
          className="member-dropdown-overlay"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default MemberSelector;

