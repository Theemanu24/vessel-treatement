import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserTable from './components/UserTable';
import UserCard from './components/UserCard';
import UserFilters from './components/UserFilters';
import UserStats from './components/UserStats';
import AddUserModal from './components/AddUserModal';
import BulkActionsDropdown from './components/BulkActionsDropdown';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Sarah Mitchell",
      email: "sarah.mitchell@vesseltreat.com",
      role: "admin",
      department: "administration",
      status: "active",
      lastLogin: new Date(Date.now() - 1800000), // 30 minutes ago
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      email: "michael.rodriguez@vesseltreat.com",
      role: "technician",
      department: "operations",
      status: "active",
      lastLogin: new Date(Date.now() - 7200000), // 2 hours ago
      createdAt: "2024-02-20T14:15:00Z"
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "emily.chen@vesseltreat.com",
      role: "manager",
      department: "compliance",
      status: "active",
      lastLogin: new Date(Date.now() - 86400000), // 1 day ago
      createdAt: "2024-01-10T09:00:00Z"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@vesseltreat.com",
      role: "technician",
      department: "maintenance",
      status: "inactive",
      lastLogin: new Date(Date.now() - 604800000), // 1 week ago
      createdAt: "2024-03-05T11:45:00Z"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.anderson@vesseltreat.com",
      role: "technician",
      department: "operations",
      status: "pending",
      lastLogin: null,
      createdAt: "2024-07-14T16:20:00Z"
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@vesseltreat.com",
      role: "admin",
      department: "administration",
      status: "active",
      lastLogin: new Date(Date.now() - 3600000), // 1 hour ago
      createdAt: "2024-01-05T08:30:00Z"
    },
    {
      id: 7,
      name: "Maria Garcia",
      email: "maria.garcia@vesseltreat.com",
      role: "manager",
      department: "operations",
      status: "active",
      lastLogin: new Date(Date.now() - 10800000), // 3 hours ago
      createdAt: "2024-02-28T13:10:00Z"
    },
    {
      id: 8,
      name: "Robert Brown",
      email: "robert.brown@vesseltreat.com",
      role: "technician",
      department: "maintenance",
      status: "active",
      lastLogin: new Date(Date.now() - 21600000), // 6 hours ago
      createdAt: "2024-04-12T15:25:00Z"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadUsers = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setIsLoading(false);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Apply department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(user => user.department === departmentFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'lastLogin') {
        aValue = aValue ? new Date(aValue) : new Date(0);
        bValue = bValue ? new Date(bValue) : new Date(0);
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter, departmentFilter, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectUser = (userId, isSelected) => {
    if (isSelected) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handleEditUser = (user) => {
    console.log('Edit user:', user);
    // Implement edit user functionality
  };

  const handleResetPassword = (user) => {
    console.log('Reset password for:', user);
    // Implement password reset functionality
  };

  const handleViewActivity = (user) => {
    console.log('View activity for:', user);
    // Implement view activity functionality
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    ));
  };

  const handleBulkAction = (actionId, userIds) => {
    console.log('Bulk action:', actionId, 'for users:', userIds);
    
    switch (actionId) {
      case 'activate':
        setUsers(prev => prev.map(user => 
          userIds.includes(user.id) ? { ...user, status: 'active' } : user
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev.map(user => 
          userIds.includes(user.id) ? { ...user, status: 'inactive' } : user
        ));
        break;
      case 'reset-password':
        // Implement bulk password reset
        break;
      case 'change-role':
        // Implement bulk role change
        break;
      case 'export':
        // Implement bulk export
        break;
      default:
        break;
    }
    
    setSelectedUsers([]);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
    setDepartmentFilter('all');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <main className="lg:ml-60 md:ml-16 pt-16 pb-20 lg:pb-8">
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
                <p className="text-slate-600">Loading user management...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:ml-60 md:ml-16 pt-16 flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">User Management</h1>
              <p className="text-slate-600">
                Manage user accounts, roles, and permissions for the vessel treatment system
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <div className="flex items-center bg-white rounded-lg border border-slate-200">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="Table"
                  className="rounded-r-none"
                />
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  iconName="Grid3X3"
                  className="rounded-l-none border-l"
                />
              </div>
              
              <Button
                variant="default"
                onClick={() => setIsAddUserModalOpen(true)}
                iconName="UserPlus"
                iconPosition="left"
              >
                Add New User
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Filters */}
              <UserFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                roleFilter={roleFilter}
                onRoleFilterChange={setRoleFilter}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                departmentFilter={departmentFilter}
                onDepartmentFilterChange={setDepartmentFilter}
                onClearFilters={handleClearFilters}
              />

              {/* Bulk Actions */}
              {selectedUsers.length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                      {selectedUsers.length} user(s) selected
                    </p>
                    <BulkActionsDropdown
                      selectedUsers={selectedUsers}
                      onBulkAction={handleBulkAction}
                    />
                  </div>
                </div>
              )}

              {/* Users Display */}
              {viewMode === 'table' ? (
                <UserTable
                  users={filteredUsers}
                  selectedUsers={selectedUsers}
                  onSelectUser={handleSelectUser}
                  onSelectAll={handleSelectAll}
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onEdit={handleEditUser}
                  onResetPassword={handleResetPassword}
                  onViewActivity={handleViewActivity}
                  onToggleStatus={handleToggleStatus}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onEdit={handleEditUser}
                      onResetPassword={handleResetPassword}
                      onViewActivity={handleViewActivity}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredUsers.length === 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                  <Icon name="Users" size={48} className="text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No users found</h3>
                  <p className="text-slate-600 mb-6">
                    {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' || departmentFilter !== 'all' ?'Try adjusting your filters to find users.' :'Get started by adding your first user to the system.'}
                  </p>
                  {(!searchTerm && roleFilter === 'all' && statusFilter === 'all' && departmentFilter === 'all') && (
                    <Button
                      variant="default"
                      onClick={() => setIsAddUserModalOpen(true)}
                      iconName="UserPlus"
                      iconPosition="left"
                    >
                      Add First User
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Stats */}
            <div className="xl:col-span-1">
              <UserStats users={users} />
            </div>
          </div>
        </div>
        
        <Footer />
      </main>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default UserManagement;