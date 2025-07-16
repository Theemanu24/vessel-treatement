import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const RecentLogsTable = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for recent treatment logs
  const treatmentLogs = [
    {
      id: 'TL-2025-001',
      timestamp: '2025-07-15 10:30:00',
      vesselName: 'MV Atlantic Pioneer',
      tankNumber: 'Tank-A1',
      technician: 'Sarah Mitchell',
      status: 'completed',
      dischargeRate: '250 m³/h',
      quantity: '1,250 m³',
      dyeColor: 'Blue'
    },
    {
      id: 'TL-2025-002',
      timestamp: '2025-07-15 09:15:00',
      vesselName: 'SS Pacific Explorer',
      tankNumber: 'Tank-B2',
      technician: 'Mike Johnson',
      status: 'in-progress',
      dischargeRate: '180 m³/h',
      quantity: '890 m³',
      dyeColor: 'Green'
    },
    {
      id: 'TL-2025-003',
      timestamp: '2025-07-15 08:45:00',
      vesselName: 'MV Northern Star',
      tankNumber: 'Tank-C1',
      technician: 'Emma Davis',
      status: 'completed',
      dischargeRate: '320 m³/h',
      quantity: '1,600 m³',
      dyeColor: 'Red'
    },
    {
      id: 'TL-2025-004',
      timestamp: '2025-07-15 07:20:00',
      vesselName: 'SS Southern Cross',
      tankNumber: 'Tank-A3',
      technician: 'David Wilson',
      status: 'pending',
      dischargeRate: '200 m³/h',
      quantity: '1,100 m³',
      dyeColor: 'Yellow'
    },
    {
      id: 'TL-2025-005',
      timestamp: '2025-07-15 06:00:00',
      vesselName: 'MV Eastern Horizon',
      tankNumber: 'Tank-B1',
      technician: 'Lisa Anderson',
      status: 'completed',
      dischargeRate: '275 m³/h',
      quantity: '1,375 m³',
      dyeColor: 'Blue'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', icon: 'CheckCircle', label: 'Completed' },
      'in-progress': { color: 'bg-warning/10 text-warning', icon: 'Clock', label: 'In Progress' },
      pending: { color: 'bg-slate-100 text-slate-600', icon: 'AlertCircle', label: 'Pending' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{config.label}</span>
      </span>
    );
  };

  const filteredLogs = treatmentLogs.filter(log => {
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesSearch = log.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.tankNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-maritime-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Recent Treatment Logs</h3>
            <p className="text-sm text-slate-600 mt-1">Monitor vessel treatment activities and status</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="w-full sm:w-48">
              <Input
                type="search"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-40">
              <Select
                options={statusOptions}
                value={filterStatus}
                onChange={setFilterStatus}
                placeholder="Filter status"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Log ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Vessel
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Tank
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Technician
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-maritime">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-900">{log.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-600">{log.timestamp}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Icon name="Ship" size={16} className="text-slate-500" />
                    <span className="text-sm font-medium text-slate-900">{log.vesselName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-600">{log.tankNumber}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-600">{log.technician}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(log.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <Icon name="ChevronLeft" size={16} />
                Previous
              </Button>
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentLogsTable;