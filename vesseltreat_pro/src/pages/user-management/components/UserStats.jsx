import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStats = ({ users }) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;
  const pendingUsers = users.filter(user => user.status === 'pending').length;
  const adminUsers = users.filter(user => user.role === 'admin').length;
  const technicianUsers = users.filter(user => user.role === 'technician').length;

  const recentLogins = users
    .filter(user => user.lastLogin)
    .sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))
    .slice(0, 5);

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

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: 'Users',
      color: 'text-primary bg-blue-50'
    },
    {
      label: 'Active Users',
      value: activeUsers,
      icon: 'UserCheck',
      color: 'text-success bg-green-50'
    },
    {
      label: 'Inactive Users',
      value: inactiveUsers,
      icon: 'UserX',
      color: 'text-error bg-red-50'
    },
    {
      label: 'Pending Users',
      value: pendingUsers,
      icon: 'Clock',
      color: 'text-warning bg-yellow-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">User Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <Icon name={stat.icon} size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Distribution */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Role Distribution</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Administrators</span>
            <span className="text-sm font-medium text-slate-900">{adminUsers}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Technicians</span>
            <span className="text-sm font-medium text-slate-900">{technicianUsers}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Managers</span>
            <span className="text-sm font-medium text-slate-900">{totalUsers - adminUsers - technicianUsers}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Login Activity</h3>
        <div className="space-y-3">
          {recentLogins.map((user) => (
            <div key={user.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-600">{formatLastLogin(user.lastLogin)}</p>
              </div>
              <div className="w-2 h-2 bg-success rounded-full"></div>
            </div>
          ))}
          {recentLogins.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-4">No recent login activity</p>
          )}
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Pending Requests</h3>
        <div className="space-y-3">
          {pendingUsers > 0 ? (
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-sm font-medium text-slate-900">Account Approvals</span>
              </div>
              <span className="text-sm font-bold text-warning">{pendingUsers}</span>
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No pending requests</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStats;