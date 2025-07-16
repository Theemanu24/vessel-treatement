import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VesselCard = ({ vessel, onViewLogs, onGenerateReport, onEditVessel, onStatusUpdate }) => {
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
    <div className="glass-card rounded-lg p-6 hover:shadow-maritime-md transition-maritime">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{vessel.name}</h3>
          <p className="text-sm text-muted-foreground">{vessel.identifier}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vessel.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(vessel.status)} size={12} />
            <span className="capitalize">{vessel.status}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Arrival Date</p>
          <p className="text-sm font-medium text-foreground">{vessel.arrivalDate}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Assigned Technician</p>
          <p className="text-sm font-medium text-foreground">{vessel.assignedTechnician}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Treatment Progress</span>
          <span className="text-xs font-medium text-foreground">{vessel.completionPercentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${vessel.completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewLogs(vessel)}
          iconName="FileText"
          iconPosition="left"
          iconSize={14}
        >
          View Logs
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onGenerateReport(vessel)}
          iconName="Download"
          iconSize={14}
        >
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEditVessel(vessel)}
          iconName="Edit"
          iconSize={14}
        >
        </Button>
      </div>
    </div>
  );
};

export default VesselCard;