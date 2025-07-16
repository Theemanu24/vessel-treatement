import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatsCard from './components/StatsCard';
import RecentLogsTable from './components/RecentLogsTable';
import ActiveVesselsPanel from './components/ActiveVesselsPanel';
import NotificationsPanel from './components/NotificationsPanel';
import QuickActions from './components/QuickActions';
import TrendChart from './components/TrendChart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock statistics data
  const statsData = [
    {
      title: 'Total Volume Discharged',
      value: '24,680 m³',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Droplets',
      color: 'primary'
    },
    {
      title: 'Daily Log Count',
      value: '18',
      change: '+3',
      changeType: 'increase',
      icon: 'FileText',
      color: 'success'
    },
    {
      title: 'Active Vessels',
      value: '7',
      change: '-2',
      changeType: 'decrease',
      icon: 'Ship',
      color: 'warning'
    },
    {
      title: 'Compliance Rate',
      value: '98.2%',
      change: '+0.8%',
      changeType: 'increase',
      icon: 'Shield',
      color: 'accent'
    }
  ];

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background transition-maritime flex flex-col">
      <Header />
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:ml-60 md:ml-16 pt-16 flex-1 flex flex-col">
        <div className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <Breadcrumb />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Maritime Operations Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400 flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>{formatDateTime(currentTime)}</span>
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Icon name="Download" size={16} />
                  Export Data
                </Button>
                <Button variant="default">
                  <Icon name="Plus" size={16} />
                  New Treatment Log
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Charts and Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <TrendChart />
              <QuickActions />
            </div>

            {/* Right Column - Active Vessels and Notifications */}
            <div className="space-y-6">
              <ActiveVesselsPanel />
              <NotificationsPanel />
            </div>
          </div>

          {/* Recent Logs Table */}
          <div className="mb-8">
            <RecentLogsTable />
          </div>

          {/* System Status Section */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg shadow-maritime-sm p-6 transition-maritime mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">System Status: Operational</span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Last updated: {currentTime.toLocaleTimeString()}
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <Icon name="Database" size={16} />
                  <span>DB: Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Wifi" size={16} />
                  <span>Network: Stable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} />
                  <span>Security: Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;