import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'compliance',
      title: 'Compliance Deadline Approaching',
      message: 'Monthly ballast water treatment report due in 2 days',
      timestamp: '2025-07-15 10:30:00',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'Planned maintenance tonight from 2:00 AM to 4:00 AM',
      timestamp: '2025-07-15 09:15:00',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'treatment',
      title: 'Treatment Log Pending Approval',
      message: 'MV Atlantic Pioneer treatment log requires supervisor approval',
      timestamp: '2025-07-15 08:45:00',
      priority: 'medium',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Equipment Calibration Due',
      message: 'Dye injection system requires calibration within 7 days',
      timestamp: '2025-07-15 07:20:00',
      priority: 'low',
      read: true
    }
  ]);

  const getNotificationIcon = (type) => {
    const icons = {
      compliance: 'Shield',
      system: 'Settings',
      treatment: 'FileText',
      alert: 'AlertTriangle'
    };
    return icons[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    
    const colors = {
      compliance: 'text-accent',
      system: 'text-slate-600',
      treatment: 'text-warning',
      alert: 'text-error'
    };
    return colors[type] || 'text-slate-600';
  };

  const getPriorityBadge = (priority) => {
    const configs = {
      high: 'bg-error/10 text-error',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-slate-100 text-slate-600'
    };
    return configs[priority] || configs.medium;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-maritime-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-error text-white text-xs font-medium rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-maritime cursor-pointer ${
              !notification.read ? 'bg-blue-50/50' : ''
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                notification.priority === 'high' ? 'bg-error/10' : 
                notification.priority === 'medium' ? 'bg-warning/10' : 'bg-slate-100'
              }`}>
                <Icon 
                  name={getNotificationIcon(notification.type)} 
                  size={16} 
                  className={getNotificationColor(notification.type, notification.priority)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                    {notification.title}
                  </h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(notification.priority)}`}>
                    {notification.priority}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-200">
        <Button variant="ghost" className="w-full">
          View All Notifications
          <Icon name="ArrowRight" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default NotificationsPanel;