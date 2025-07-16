import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('volume');

  const periodOptions = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' }
  ];

  const metricOptions = [
    { value: 'volume', label: 'Treatment Volume' },
    { value: 'vessels', label: 'Vessel Count' },
    { value: 'compliance', label: 'Compliance Rate' },
    { value: 'efficiency', label: 'Processing Efficiency' }
  ];

  // Mock data for charts
  const treatmentVolumeData = [
    { date: '07/09', volume: 2450, vessels: 3, compliance: 98 },
    { date: '07/10', volume: 3200, vessels: 4, compliance: 100 },
    { date: '07/11', volume: 2800, vessels: 3, compliance: 95 },
    { date: '07/12', volume: 3600, vessels: 5, compliance: 100 },
    { date: '07/13', volume: 2900, vessels: 4, compliance: 97 },
    { date: '07/14', volume: 3400, vessels: 4, compliance: 100 },
    { date: '07/15', volume: 2750, vessels: 3, compliance: 98 }
  ];

  const vesselStatusData = [
    { name: 'Completed', value: 28, color: '#059669' },
    { name: 'In Progress', value: 5, color: '#0EA5E9' },
    { name: 'Pending', value: 3, color: '#D97706' },
    { name: 'Issues', value: 1, color: '#DC2626' }
  ];

  const complianceMetrics = [
    { metric: 'Documentation Complete', value: 98, target: 100, status: 'good' },
    { metric: 'Signature Compliance', value: 100, target: 100, status: 'excellent' },
    { metric: 'Timely Reporting', value: 95, target: 98, status: 'warning' },
    { metric: 'Quality Standards', value: 97, target: 95, status: 'excellent' }
  ];

  const recentActivity = [
    { id: 1, action: 'Report Generated', details: 'Weekly compliance report for MV Ocean Pioneer', time: '2 hours ago', user: 'Sarah Mitchell' },
    { id: 2, action: 'Data Export', details: 'Treatment logs exported to Excel format', time: '4 hours ago', user: 'Mike Johnson' },
    { id: 3, action: 'Email Sent', details: 'Automated 6-hour interval report delivered', time: '6 hours ago', user: 'System' },
    { id: 4, action: 'Audit Access', details: 'Compliance officer accessed audit trail', time: '8 hours ago', user: 'Admin' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-accent';
      case 'warning': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'CheckCircle';
      case 'good': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'poor': return 'AlertCircle';
      default: return 'Info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Analytics Dashboard</h2>
              <p className="text-sm text-slate-600">Operational insights and compliance metrics</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              options={periodOptions}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              className="w-full sm:w-40"
            />
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-full sm:w-40"
            />
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Volume</p>
              <p className="text-2xl font-bold text-slate-900">21,200L</p>
              <p className="text-sm text-success">+12% from last week</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Droplets" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Vessels Processed</p>
              <p className="text-2xl font-bold text-slate-900">37</p>
              <p className="text-sm text-success">+5 from last week</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Ship" size={24} className="text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Compliance Rate</p>
              <p className="text-2xl font-bold text-slate-900">98.5%</p>
              <p className="text-sm text-success">+1.2% from last week</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={24} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Reports Generated</p>
              <p className="text-2xl font-bold text-slate-900">156</p>
              <p className="text-sm text-accent">+23 from last week</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={24} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Treatment Volume Chart */}
        <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Treatment Volume Trends</h3>
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={treatmentVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#1E40AF" 
                  fill="#1E40AF" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vessel Status Distribution */}
        <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Vessel Status Distribution</h3>
            <Button variant="ghost" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vesselStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vesselStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {vesselStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-slate-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Compliance Metrics</h3>
          <Button variant="ghost" size="sm" iconName="TrendingUp">
            View Details
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceMetrics.map((metric, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900">{metric.metric}</span>
                <Icon 
                  name={getStatusIcon(metric.status)} 
                  size={16} 
                  className={getStatusColor(metric.status)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Current</span>
                  <span className={`font-medium ${getStatusColor(metric.status)}`}>
                    {metric.value}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      metric.status === 'excellent' ? 'bg-success' :
                      metric.status === 'good' ? 'bg-accent' :
                      metric.status === 'warning' ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Target: {metric.target}%</span>
                  <span>{metric.value >= metric.target ? 'Met' : 'Below Target'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
          <Button variant="ghost" size="sm" iconName="Clock">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-maritime">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Activity" size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{activity.details}</p>
                <p className="text-xs text-slate-500 mt-1">by {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;