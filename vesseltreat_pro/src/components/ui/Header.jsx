import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'Treatment Log Pending', message: 'Vessel MV-2024-001 requires completion', time: '5 min ago', type: 'warning' },
    { id: 2, title: 'Compliance Alert', message: 'Monthly report due in 2 days', time: '1 hour ago', type: 'info' },
    { id: 3, title: 'System Update', message: 'Maintenance scheduled for tonight', time: '3 hours ago', type: 'info' }
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // Mock user data
  const user = {
    name: 'Sarah Mitchell',
    role: 'Terminal Technician',
    avatar: '/assets/images/no_image.png',
    email: 'sarah.mitchell@vesseltreat.com'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      case 'success': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'success': return 'text-success';
      default: return 'text-accent';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-[1000] transition-maritime">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left section - can be used for breadcrumbs or page title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">VesselTreat Pro</h1>
        </div>

        {/* Right section - User controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-maritime"
          >
            <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-maritime-lg border border-slate-200 dark:border-slate-700 z-[1001] animate-slide-in">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-maritime">
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={getNotificationIcon(notification.type)} 
                          size={16} 
                          className={getNotificationColor(notification.type)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{notification.title}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 px-3 py-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{user.role}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-slate-600 dark:text-slate-400" />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-maritime-lg border border-slate-200 dark:border-slate-700 z-[1001] animate-slide-in">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{user.role}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-maritime flex items-center space-x-3">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-maritime flex items-center space-x-3">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-maritime flex items-center space-x-3">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                
                <div className="border-t border-slate-200 dark:border-slate-700 py-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-red-50 dark:hover:bg-red-900/20 transition-maritime flex items-center space-x-3"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;