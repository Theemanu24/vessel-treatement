import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3', path: '/dashboard' },
    { id: 'vessels', label: 'Vessel Management', icon: 'Ship', path: '/vessel-management' },
    { id: 'treatment', label: 'Treatment Logs', icon: 'FileText', path: '/treatment-log-form' },
    { id: 'users', label: 'User Management', icon: 'Users', path: '/user-management' },
    { id: 'reports', label: 'Reports & Analytics', icon: 'PieChart', path: '/reports-analytics' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[999] lg:hidden transition-opacity duration-300 ${
          isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={() => setIsCollapsed(true)}
      />
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-[1000] transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      } lg:translate-x-0 ${
        isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
      } flex flex-col`}>
        {/* Toggle Button */}
        <div className="absolute -right-3 top-6 lg:block hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-6 w-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-maritime-sm hover:shadow-maritime-md transition-maritime"
          >
            <Icon 
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
              size={12} 
              className="text-slate-600 dark:text-slate-400"
            />
          </Button>
        </div>

        {/* Navigation - Flex grow to take available space */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={isActiveRoute(item.path) ? 'default' : 'ghost'}
              onClick={() => handleNavigation(item.path)}
              className={`w-full justify-start transition-maritime ${
                isCollapsed ? 'px-2' : 'px-4'
              } ${
                isActiveRoute(item.path) 
                  ? 'bg-primary text-white shadow-maritime-sm' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon name={item.icon} size={20} />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* Bottom section - Fixed at bottom */}
        <div className="p-4 space-y-2 border-t border-slate-200 dark:border-slate-700">
          <Button
            variant="ghost"
            className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-maritime ${
              isCollapsed ? 'px-2' : 'px-4'
            }`}
          >
            <Icon name="Settings" size={20} />
            {!isCollapsed && <span className="ml-3">Settings</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={`w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-maritime ${
              isCollapsed ? 'px-2' : 'px-4'
            }`}
          >
            <Icon name="HelpCircle" size={20} />
            {!isCollapsed && <span className="ml-3">Help</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-[1001] lg:hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-maritime-sm"
      >
        <Icon name="Menu" size={20} />
      </Button>
    </>
  );
};

export default Sidebar;