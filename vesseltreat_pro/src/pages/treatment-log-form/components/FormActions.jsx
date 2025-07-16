import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  onSaveDraft, 
  onSubmit, 
  onClear, 
  isSubmitting, 
  isDraft, 
  lastSaved 
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearClick = () => {
    setShowClearConfirm(true);
  };

  const handleConfirmClear = () => {
    onClear();
    setShowClearConfirm(false);
  };

  const handleCancelClear = () => {
    setShowClearConfirm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-maritime-sm border border-slate-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Save Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {isDraft ? (
              <>
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-sm text-warning font-medium">Draft Saved</span>
              </>
            ) : (
              <>
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm text-success font-medium">Auto-saved</span>
              </>
            )}
          </div>
          {lastSaved && (
            <span className="text-xs text-slate-600">
              Last saved: {lastSaved}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            variant="ghost"
            onClick={handleClearClick}
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
            disabled={isSubmitting}
          >
            Clear Form
          </Button>
          
          <Button
            variant="outline"
            onClick={onSaveDraft}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
            disabled={isSubmitting}
          >
            Save Draft
          </Button>
          
          <Button
            variant="default"
            onClick={onSubmit}
            iconName="Send"
            iconPosition="left"
            iconSize={16}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit for Approval
          </Button>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1003]">
          <div className="bg-white rounded-lg shadow-maritime-lg border border-slate-200 p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Clear Form</h3>
                <p className="text-sm text-slate-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-700 mb-6">
              Are you sure you want to clear all form data? Any unsaved changes will be lost permanently.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                onClick={handleCancelClear}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmClear}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                Clear Form
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Form Guidelines */}
      <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <h4 className="text-sm font-medium text-slate-900 mb-2">Form Guidelines</h4>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>• All required fields must be completed before submission</li>
          <li>• Both technician and operator signatures are mandatory</li>
          <li>• Form data is automatically saved every 30 seconds</li>
          <li>• Submitted forms require supervisor approval before finalization</li>
          <li>• PDF reports are generated automatically upon approval</li>
        </ul>
      </div>
    </div>
  );
};

export default FormActions;