import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'new-treatment',
      title: 'New Treatment Log',
      description: 'Start a new vessel treatment documentation',
      icon: 'Plus',
      color: 'bg-primary text-white hover:bg-primary/90',
      path: '/treatment-log-form',
      primary: true
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create compliance and operational reports',
      icon: 'FileText',
      color: 'bg-accent text-white hover:bg-accent/90',
      path: '/reports-analytics',
      primary: true
    },
    {
      id: 'vessel-management',
      title: 'Manage Vessels',
      description: 'View and update vessel information',
      icon: 'Ship',
      color: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
      path: '/vessel-management',
      primary: false
    },
    {
      id: 'user-management',
      title: 'User Management',
      description: 'Manage system users and permissions',
      icon: 'Users',
      color: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
      path: '/user-management',
      primary: false
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-maritime-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Quick Actions</h3>
        <p className="text-sm text-slate-600">Frequently used operations and shortcuts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            onClick={() => handleActionClick(action.path)}
            className={`${action.color} p-6 h-auto flex-col items-start text-left space-y-3 transition-maritime shadow-maritime-sm hover:shadow-maritime-md`}
          >
            <div className="flex items-center space-x-3 w-full">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                action.primary ? 'bg-white/20' : 'bg-slate-100'
              }`}>
                <Icon 
                  name={action.icon} 
                  size={20} 
                  className={action.primary ? 'text-white' : 'text-slate-600'}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-base mb-1">{action.title}</h4>
                <p className={`text-sm ${
                  action.primary ? 'text-white/80' : 'text-slate-600'
                }`}>
                  {action.description}
                </p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className={action.primary ? 'text-white/60' : 'text-slate-400'}
              />
            </div>
          </Button>
        ))}
      </div>

      {/* Additional Quick Links */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-sm font-medium text-slate-900 mb-3">Quick Links</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start text-slate-600 hover:text-slate-900"
            onClick={() => navigate('/reports-analytics')}
          >
            <Icon name="BarChart3" size={16} />
            Analytics
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start text-slate-600 hover:text-slate-900"
            onClick={() => navigate('/vessel-management')}
          >
            <Icon name="Settings" size={16} />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start text-slate-600 hover:text-slate-900"
          >
            <Icon name="Download" size={16} />
            Export Data
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="justify-start text-slate-600 hover:text-slate-900"
          >
            <Icon name="HelpCircle" size={16} />
            Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;