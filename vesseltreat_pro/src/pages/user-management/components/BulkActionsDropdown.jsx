import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsDropdown = ({ selectedUsers, onBulkAction, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const bulkActions = [
    {
      id: 'activate',
      label: 'Activate Users',
      icon: 'UserCheck',
      color: 'text-success',
      description: `Activate ${selectedUsers.length} selected user(s)`
    },
    {
      id: 'deactivate',
      label: 'Deactivate Users',
      icon: 'UserX',
      color: 'text-error',
      description: `Deactivate ${selectedUsers.length} selected user(s)`
    },
    {
      id: 'reset-password',
      label: 'Reset Passwords',
      icon: 'Key',
      color: 'text-warning',
      description: `Reset passwords for ${selectedUsers.length} user(s)`
    },
    {
      id: 'change-role',
      label: 'Change Role',
      icon: 'Shield',
      color: 'text-primary',
      description: `Change role for ${selectedUsers.length} user(s)`
    },
    {
      id: 'export',
      label: 'Export Users',
      icon: 'Download',
      color: 'text-accent',
      description: `Export ${selectedUsers.length} user(s) data`
    }
  ];

  const handleActionClick = (actionId) => {
    onBulkAction(actionId, selectedUsers);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || selectedUsers.length === 0}
        iconName="ChevronDown"
        iconPosition="right"
      >
        Bulk Actions ({selectedUsers.length})
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-maritime-lg border border-slate-200 z-[1002] animate-slide-in">
          <div className="p-3 border-b border-slate-200">
            <p className="text-sm font-medium text-slate-900">
              {selectedUsers.length} user(s) selected
            </p>
            <p className="text-xs text-slate-600">Choose an action to apply</p>
          </div>
          
          <div className="py-2">
            {bulkActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-maritime flex items-start space-x-3"
              >
                <Icon name={action.icon} size={16} className={`mt-0.5 ${action.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{action.label}</p>
                  <p className="text-xs text-slate-600">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-3 border-t border-slate-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsDropdown;