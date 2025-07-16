import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserTable = ({ 
  users, 
  selectedUsers, 
  onSelectUser, 
  onSelectAll, 
  onSort, 
  sortField, 
  sortDirection,
  onEdit,
  onResetPassword,
  onViewActivity,
  onToggleStatus
}) => {
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

  const handleSort = (field) => {
    onSort(field);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = users.length > 0 && selectedUsers.length === users.length;
  const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < users.length;

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-6 py-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="font-semibold text-slate-900 hover:bg-slate-100 p-0"
                >
                  User
                  <Icon name={getSortIcon('name')} size={16} className="ml-2" />
                </Button>
              </th>
              <th className="px-6 py-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('role')}
                  className="font-semibold text-slate-900 hover:bg-slate-100 p-0"
                >
                  Role
                  <Icon name={getSortIcon('role')} size={16} className="ml-2" />
                </Button>
              </th>
              <th className="px-6 py-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('department')}
                  className="font-semibold text-slate-900 hover:bg-slate-100 p-0"
                >
                  Department
                  <Icon name={getSortIcon('department')} size={16} className="ml-2" />
                </Button>
              </th>
              <th className="px-6 py-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('lastLogin')}
                  className="font-semibold text-slate-900 hover:bg-slate-100 p-0"
                >
                  Last Login
                  <Icon name={getSortIcon('lastLogin')} size={16} className="ml-2" />
                </Button>
              </th>
              <th className="px-6 py-4 text-left">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('status')}
                  className="font-semibold text-slate-900 hover:bg-slate-100 p-0"
                >
                  Status
                  <Icon name={getSortIcon('status')} size={16} className="ml-2" />
                </Button>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="font-semibold text-slate-900">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-maritime">
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => onSelectUser(user.id, e.target.checked)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{user.name}</p>
                      <p className="text-sm text-slate-600">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-900">{user.department}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-900">{formatLastLogin(user.lastLogin)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(user)}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onResetPassword(user)}
                      iconName="Key"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewActivity(user)}
                      iconName="Activity"
                    />
                    <Button
                      variant={user.status === 'active' ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => onToggleStatus(user)}
                      iconName={user.status === 'active' ? 'UserX' : 'UserCheck'}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;