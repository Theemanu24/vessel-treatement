import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const UserFilters = ({ 
  searchTerm, 
  onSearchChange, 
  roleFilter, 
  onRoleFilterChange, 
  statusFilter, 
  onStatusFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  onClearFilters 
}) => {
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Administrator' },
    { value: 'technician', label: 'Technician' },
    { value: 'manager', label: 'Manager' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'operations', label: 'Operations' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'administration', label: 'Administration' }
  ];

  const hasActiveFilters = roleFilter !== 'all' || statusFilter !== 'all' || departmentFilter !== 'all' || searchTerm;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
        
        <Select
          options={roleOptions}
          value={roleFilter}
          onChange={onRoleFilterChange}
          placeholder="Filter by role"
        />
        
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusFilterChange}
          placeholder="Filter by status"
        />
        
        <Select
          options={departmentOptions}
          value={departmentFilter}
          onChange={onDepartmentFilterChange}
          placeholder="Filter by department"
        />
      </div>
      
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Filters applied. Showing filtered results.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserFilters;