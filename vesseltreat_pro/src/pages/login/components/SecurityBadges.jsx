import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'CheckCircle',
      title: 'IMO Compliant',
      description: 'Maritime standards'
    },
    {
      icon: 'Lock',
      title: 'Secure Access',
      description: 'Role-based authentication'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-slate-200">
      <div className="grid grid-cols-3 gap-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name={feature.icon} size={16} className="text-green-600" />
              </div>
            </div>
            <h4 className="text-xs font-medium text-slate-900 mb-1">{feature.title}</h4>
            <p className="text-xs text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;