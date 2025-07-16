import React from 'react';

const MaritimeLogo = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-maritime-lg">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Vessel/Ship Icon */}
            <path 
              d="M3 12h18m-9-9v18" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <circle 
              cx="12" 
              cy="12" 
              r="3" 
              stroke="white" 
              strokeWidth="2" 
              fill="none"
            />
            {/* Wave elements */}
            <path 
              d="M2 18c2-2 4 0 6-2s4 0 6-2 4 0 6-2" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
      
      {/* Brand Name */}
      <h1 className="text-3xl font-bold text-slate-900 mb-2">VesselTreat Pro</h1>
      <p className="text-slate-600 text-sm">Maritime Terminal Operations</p>
      
      {/* Tagline */}
      <div className="mt-4 px-4 py-2 bg-slate-100 rounded-lg inline-block">
        <p className="text-xs text-slate-700 font-medium">
          Streamlined Vessel Treatment Documentation
        </p>
      </div>
    </div>
  );
};

export default MaritimeLogo;