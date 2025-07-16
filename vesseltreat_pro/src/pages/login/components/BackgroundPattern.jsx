import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"></div>
      
      {/* Maritime Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="maritime-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Anchor symbols */}
              <g fill="currentColor" className="text-primary">
                <circle cx="20" cy="20" r="2" />
                <circle cx="80" cy="80" r="2" />
                <path d="M50 10 L50 30 M45 25 L55 25" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M50 70 L50 90 M45 85 L55 85" stroke="currentColor" strokeWidth="1" fill="none" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#maritime-pattern)" />
        </svg>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-secondary/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default BackgroundPattern;