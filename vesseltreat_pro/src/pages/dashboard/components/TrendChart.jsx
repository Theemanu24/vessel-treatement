import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const TrendChart = () => {
  // Mock data for treatment volume trends
  const volumeData = [
    { date: '07/10', volume: 2400, treatments: 8 },
    { date: '07/11', volume: 3200, treatments: 12 },
    { date: '07/12', volume: 2800, treatments: 10 },
    { date: '07/13', volume: 3600, treatments: 14 },
    { date: '07/14', volume: 4200, treatments: 16 },
    { date: '07/15', volume: 3800, treatments: 13 }
  ];

  // Mock data for vessel status distribution
  const statusData = [
    { status: 'Completed', count: 24, color: '#059669' },
    { status: 'In Progress', count: 8, color: '#D97706' },
    { status: 'Pending', count: 5, color: '#64748B' },
    { status: 'Inspection', count: 3, color: '#0EA5E9' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-maritime-md p-3">
          <p className="text-sm font-medium text-slate-900 mb-2">{`Date: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-slate-600">
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.dataKey === 'volume' ? 'Volume: ' : 'Treatments: '}
              </span>
              {entry.dataKey === 'volume' ? `${entry.value.toLocaleString()} m³` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-maritime-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Treatment Trends</h3>
            <p className="text-sm text-slate-600 mt-1">Weekly volume and activity overview</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-maritime">
              <Icon name="Download" size={16} />
            </button>
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-maritime">
              <Icon name="MoreHorizontal" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volume Trend Chart */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-4">Daily Treatment Volume</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `${value/1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#1E40AF" 
                    strokeWidth={2}
                    dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Treatment Count Chart */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-4">Daily Treatment Count</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="treatments" 
                    fill="#0EA5E9"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-sm font-medium text-slate-900 mb-4">Vessel Status Distribution</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statusData.map((item) => (
              <div key={item.status} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div 
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-slate-900">{item.count}</span>
                </div>
                <p className="text-xs text-slate-600">{item.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-slate-900">21,600</p>
              <p className="text-sm text-slate-600">Total Volume (m³)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">71</p>
              <p className="text-sm text-slate-600">Total Treatments</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">95.2%</p>
              <p className="text-sm text-slate-600">Compliance Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;