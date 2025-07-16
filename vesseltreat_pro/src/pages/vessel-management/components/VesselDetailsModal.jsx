import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VesselDetailsModal = ({ vessel, isOpen, onClose, onEdit }) => {
  if (!isOpen || !vessel) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-accent text-white';
      case 'completed': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Activity';
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="glass-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Ship" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">{vessel.name}</h2>
              <p className="text-sm text-muted-foreground">{vessel.identifier}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status and Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Status</h3>
              <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(vessel.status)}`}>
                <Icon name={getStatusIcon(vessel.status)} size={16} />
                <span className="capitalize">{vessel.status}</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Treatment Progress</h3>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${vessel.completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-foreground">{vessel.completionPercentage}%</span>
              </div>
            </div>
          </div>

          {/* Vessel Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Vessel Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Arrival Date</p>
                  <p className="text-sm font-medium text-foreground">{vessel.arrivalDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Vessel Type</p>
                  <p className="text-sm font-medium text-foreground">{vessel.vesselType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Flag State</p>
                  <p className="text-sm font-medium text-foreground">{vessel.flagState}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Treatment Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Assigned Technician</p>
                  <p className="text-sm font-medium text-foreground">{vessel.assignedTechnician}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Treatment Start</p>
                  <p className="text-sm font-medium text-foreground">{vessel.treatmentStart}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Completion</p>
                  <p className="text-sm font-medium text-foreground">{vessel.estimatedCompletion}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {vessel.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="Clock" size={16} className="text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => onEdit(vessel)}
              iconName="Edit"
              iconPosition="left"
              iconSize={16}
            >
              Edit Vessel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VesselDetailsModal;