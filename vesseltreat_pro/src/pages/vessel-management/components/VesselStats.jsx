import React from 'react';
import Icon from '../../../components/AppIcon';

const VesselStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Vessels',
      value: stats.totalVessels,
      icon: 'Ship',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Active Treatments',
      value: stats.activeVessels,
      icon: 'Activity',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Completed Today',
      value: stats.completedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Pending Approval',
      value: stats.pendingApproval,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="glass-card rounded-lg p-6 hover:shadow-maritime-md transition-maritime">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} className={stat.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VesselStats;