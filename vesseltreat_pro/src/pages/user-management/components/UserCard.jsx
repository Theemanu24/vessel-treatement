import React from 'react';

import Button from '../../../components/ui/Button';

const UserCard = ({ user, onEdit, onResetPassword, onViewActivity, onToggleStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-green-50';
      case 'inactive': return 'text-error bg-red-50';
      case 'pending': return 'text-warning bg-yellow-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-primary bg-blue-50';
      case 'technician': return 'text-accent bg-sky-50';
      case 'manager': return 'text-secondary bg-slate-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const formatLastLogin = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return loginDate.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-maritime-md transition-maritime">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-600">{user.email}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Department</p>
          <p className="text-sm font-medium text-slate-900">{user.department}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Last Login</p>
          <p className="text-sm font-medium text-slate-900">{formatLastLogin(user.lastLogin)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(user)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onResetPassword(user)}
            iconName="Key"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewActivity(user)}
            iconName="Activity"
            iconPosition="left"
          >
            Activity
          </Button>
          <Button
            variant={user.status === 'active' ? 'outline' : 'default'}
            size="sm"
            onClick={() => onToggleStatus(user)}
            iconName={user.status === 'active' ? 'UserX' : 'UserCheck'}
            iconPosition="left"
          >
            {user.status === 'active' ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;