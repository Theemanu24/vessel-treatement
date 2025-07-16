import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import MaritimeLogo from './components/MaritimeLogo';
import BackgroundPattern from './components/BackgroundPattern';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const session = localStorage.getItem('vesseltreat_session');
    const userData = localStorage.getItem('vesseltreat_user');
    
    if (session === 'active' && userData) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Main Login Container */}
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="glass-card rounded-2xl p-8 shadow-maritime-lg border border-white/20">
          {/* Logo and Branding */}
          <MaritimeLogo />
          
          {/* Login Form */}
          <LoginForm />
          
          {/* Security Badges */}
          <SecurityBadges />
        </div>
        
        {/* Footer Information */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} VesselTreat Pro. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Secure maritime terminal operations platform
          </p>
        </div>
      </div>
      
      {/* Demo Credentials Helper */}
      <div className="fixed bottom-4 right-4 bg-slate-900 text-white p-3 rounded-lg text-xs max-w-xs hidden lg:block">
        <h4 className="font-medium mb-2">Demo Credentials:</h4>
        <div className="space-y-1">
          <p><strong>Technician:</strong> sarah.mitchell@vesseltreat.com / tech2024</p>
          <p><strong>Admin:</strong> admin@vesseltreat.com / admin2024</p>
        </div>
      </div>
    </div>
  );
};

export default Login;