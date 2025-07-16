import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedCount, onBulkAction, technicians }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'update-status', label: 'Update Status' },
    { value: 'reassign-technician', label: 'Reassign Technician' },
    { value: 'generate-reports', label: 'Generate Reports' },
    { value: 'export-data', label: 'Export Data' },
    { value: 'delete', label: 'Delete Vessels' }
  ];

  const handleExecuteAction = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="glass-surface rounded-lg p-4 mb-6 border-l-4 border-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <span className="font-medium text-foreground">
            {selectedCount} vessel{selectedCount > 1 ? 's' : ''} selected
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Choose action..."
            className="min-w-48"
          />
          
          <Button
            variant="default"
            onClick={handleExecuteAction}
            disabled={!selectedAction}
            iconName="Play"
            iconPosition="left"
            iconSize={16}
          >
            Execute
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;