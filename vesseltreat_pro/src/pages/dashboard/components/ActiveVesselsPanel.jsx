import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveVesselsPanel = () => {
  // Mock data for active vessels
  const activeVessels = [
    {
      id: 'V-001',
      name: 'MV Atlantic Pioneer',
      status: 'treatment-active',
      progress: 75,
      eta: '2 hours',
      tanks: ['A1', 'A2'],
      technician: 'Sarah Mitchell',
      priority: 'high'
    },
    {
      id: 'V-002',
      name: 'SS Pacific Explorer',
      status: 'awaiting-treatment',
      progress: 0,
      eta: '4 hours',
      tanks: ['B1', 'B2', 'B3'],
      technician: 'Mike Johnson',
      priority: 'medium'
    },
    {
      id: 'V-003',
      name: 'MV Northern Star',
      status: 'inspection-required',
      progress: 100,
      eta: 'Completed',
      tanks: ['C1'],
      technician: 'Emma Davis',
      priority: 'low'
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      'treatment-active': {
        color: 'bg-warning/10 text-warning border-warning/20',
        icon: 'Activity',
        label: 'Treatment Active'
      },
      'awaiting-treatment': {
        color: 'bg-slate-100 text-slate-600 border-slate-200',
        icon: 'Clock',
        label: 'Awaiting Treatment'
      },
      'inspection-required': {
        color: 'bg-accent/10 text-accent border-accent/20',
        icon: 'Search',
        label: 'Inspection Required'
      }
    };
    return configs[status] || configs['awaiting-treatment'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error text-white',
      medium: 'bg-warning text-white',
      low: 'bg-success text-white'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-maritime-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Active Vessels</h3>
            <p className="text-sm text-slate-600 mt-1">Vessels requiring attention</p>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Plus" size={16} />
            Add Vessel
          </Button>
        </div>
      </div>

      {/* Vessels List */}
      <div className="p-6 space-y-4">
        {activeVessels.map((vessel) => {
          const statusConfig = getStatusConfig(vessel.status);
          
          return (
            <div key={vessel.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-maritime-sm transition-maritime">
              {/* Vessel Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-slate-900">{vessel.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(vessel.priority)}`}>
                      {vessel.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm ${statusConfig.color}`}>
                    <Icon name={statusConfig.icon} size={14} />
                    <span>{statusConfig.label}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>

              {/* Progress Bar */}
              {vessel.status === 'treatment-active' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
                    <span>Treatment Progress</span>
                    <span>{vessel.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full transition-all duration-300"
                      style={{ width: `${vessel.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Vessel Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Technician:</span>
                  <p className="font-medium text-slate-900">{vessel.technician}</p>
                </div>
                <div>
                  <span className="text-slate-600">ETA:</span>
                  <p className="font-medium text-slate-900">{vessel.eta}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-600">Tanks:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {vessel.tanks.map((tank) => (
                      <span key={tank} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                        {tank}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-slate-200">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="Eye" size={16} />
                  View Details
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                  <Icon name="Edit" size={16} />
                  Update Status
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-200">
        <Button variant="ghost" className="w-full">
          View All Vessels
          <Icon name="ArrowRight" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ActiveVesselsPanel;