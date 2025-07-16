import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Route mapping for breadcrumb generation
  const routeMap = {
    '/dashboard': { label: 'Dashboard', parent: null },
    '/treatment-log-form': { label: 'Treatment Logs', parent: '/dashboard' },
    '/vessel-management': { label: 'Vessel Management', parent: '/dashboard' },
    '/reports-analytics': { label: 'Reports & Analytics', parent: '/dashboard' },
    '/user-management': { label: 'User Management', parent: '/dashboard' },
  };

  const generateBreadcrumbs = () => {
    const currentPath = location.pathname;
    const breadcrumbs = [];
    
    // Always start with Dashboard if not already there
    if (currentPath !== '/dashboard') {
      breadcrumbs.push({
        label: 'Dashboard',
        path: '/dashboard',
        isActive: false
      });
    }

    // Add current page
    const currentRoute = routeMap[currentPath];
    if (currentRoute) {
      breadcrumbs.push({
        label: currentRoute.label,
        path: currentPath,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render breadcrumbs on login page or if only one item
  if (location.pathname === '/login' || breadcrumbs.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-slate-500" />
      
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-slate-400" />
          )}
          
          {crumb.isActive ? (
            <span className="font-medium text-slate-900" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(crumb.path)}
              className="text-slate-600 hover:text-slate-900 p-0 h-auto font-normal hover:bg-transparent hover:underline"
            >
              {crumb.label}
            </Button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;