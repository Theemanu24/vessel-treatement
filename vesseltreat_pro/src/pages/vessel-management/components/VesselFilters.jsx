import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const VesselFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  technicians 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' }
  ];

  const technicianOptions = [
    { value: 'all', label: 'All Technicians' },
    ...technicians.map(tech => ({ value: tech.id, label: tech.name }))
  ];

  return (
    <div className="glass-surface rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            type="search"
            label="Search Vessels"
            placeholder="Search by name or identifier..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>
        
        <div>
          <Select
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => onFilterChange('status', value)}
          />
        </div>
        
        <div>
          <Select
            label="Assigned Technician"
            options={technicianOptions}
            value={filters.technician}
            onChange={(value) => onFilterChange('technician', value)}
          />
        </div>
        
        <div>
          <Input
            type="date"
            label="Arrival Date From"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange('dateFrom', e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Arrival Date To"
            value={filters.dateTo}
            onChange={(e) => onFilterChange('dateTo', e.target.value)}
          />
        </div>
        
        <Button
          variant="outline"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
          iconSize={16}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default VesselFilters;