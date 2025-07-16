import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      role: 'technician'
    }
  });

  const roleOptions = [
    { value: 'technician', label: 'Terminal Technician' },
    { value: 'admin', label: 'System Administrator' }
  ];

  // Mock credentials for different user types
  const mockCredentials = {
    technician: {
      email: 'sarah.mitchell@vesseltreat.com',
      password: 'tech2024'
    },
    admin: {
      email: 'admin@vesseltreat.com',
      password: 'admin2024'
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { email, password, role } = data;
      const validCredentials = mockCredentials[role];
      
      if (email === validCredentials.email && password === validCredentials.password) {
        // Store user session
        const userData = {
          email,
          role,
          name: role === 'admin' ? 'System Administrator' : 'Sarah Mitchell',
          loginTime: new Date().toISOString(),
          rememberMe
        };
        
        localStorage.setItem('vesseltreat_user', JSON.stringify(userData));
        localStorage.setItem('vesseltreat_session', 'active');
        
        if (rememberMe) {
          localStorage.setItem('vesseltreat_remember', 'true');
        }
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('root', {
          type: 'manual',
          message: `Invalid credentials. Use ${validCredentials.email} / ${validCredentials.password}`
        });
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Network error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here.\nFor demo: Use the credentials shown in error messages.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          required
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            error={errors.password?.message}
            required
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-slate-500 hover:text-slate-700 transition-maritime"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {/* Role Selection */}
        <Select
          label="Access Level"
          options={roleOptions}
          value={watch('role')}
          onChange={(value) => register('role').onChange({ target: { value } })}
          error={errors.role?.message}
          required
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            size="sm"
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-maritime"
          >
            Forgot password?
          </button>
        </div>

        {/* Error Message */}
        {errors.root && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-red-600" />
              <p className="text-sm text-red-700">{errors.root.message}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
          className="mt-6"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;