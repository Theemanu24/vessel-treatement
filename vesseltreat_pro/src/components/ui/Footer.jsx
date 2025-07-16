import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Vessels', path: '/vessel-management' },
        { name: 'Treatment Logs', path: '/treatment-log-form' },
        { name: 'Reports', path: '/reports-analytics' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Documentation', path: '#' },
        { name: 'Help Center', path: '#' },
        { name: 'Contact Support', path: '#' },
        { name: 'System Status', path: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms of Service', path: '#' },
        { name: 'Security', path: '#' },
        { name: 'Compliance', path: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 mt-auto">
      <div className="px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Ship" size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                VesselTreat Pro
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Professional maritime terminal operations platform for vessel treatment management and compliance tracking.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="text-slate-600 dark:text-slate-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Secure</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-maritime"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              © {currentYear} VesselTreat Pro. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-500">
              <div className="flex items-center space-x-1">
                <Icon name="Database" size={12} />
                <span>v2.1.0</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>UTC {new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;