import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const VesselTable = ({ 
  vessels, 
  selectedVessels, 
  onSelectVessel, 
  onSelectAll, 
  onViewLogs, 
  onGenerateReport, 
  onEditVessel,
  onStatusUpdate 
}) => {
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

  const isAllSelected = vessels.length > 0 && selectedVessels.length === vessels.length;
  const isIndeterminate = selectedVessels.length > 0 && selectedVessels.length < vessels.length;

  return (
    <div className="glass-surface rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 w-12">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Vessel Name</th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Identifier</th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Arrival Date</th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Technician</th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Progress</th>
              <th className="text-left p-4 text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vessels.map((vessel) => (
              <tr key={vessel.id} className="border-b border-border hover:bg-muted/30 transition-maritime">
                <td className="p-4">
                  <Checkbox
                    checked={selectedVessels.includes(vessel.id)}
                    onChange={(e) => onSelectVessel(vessel.id, e.target.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{vessel.name}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground">{vessel.identifier}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{vessel.arrivalDate}</div>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vessel.status)}`}>
                    <Icon name={getStatusIcon(vessel.status)} size={12} />
                    <span className="capitalize">{vessel.status}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{vessel.assignedTechnician}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${vessel.completionPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{vessel.completionPercentage}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewLogs(vessel)}
                      iconName="FileText"
                      iconSize={14}
                    >
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VesselTable;