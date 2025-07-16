import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditTrailPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '2025-07-01',
    endDate: '2025-07-15'
  });

  const userOptions = [
    { value: '', label: 'All Users' },
    { value: 'sarah.mitchell', label: 'Sarah Mitchell' },
    { value: 'mike.johnson', label: 'Mike Johnson' },
    { value: 'admin', label: 'System Admin' },
    { value: 'compliance.officer', label: 'Compliance Officer' }
  ];

  const actionOptions = [
    { value: '', label: 'All Actions' },
    { value: 'report_generated', label: 'Report Generated' },
    { value: 'data_exported', label: 'Data Exported' },
    { value: 'email_sent', label: 'Email Sent' },
    { value: 'user_login', label: 'User Login' },
    { value: 'settings_changed', label: 'Settings Changed' },
    { value: 'audit_accessed', label: 'Audit Accessed' }
  ];

  const mockAuditData = [
    {
      id: 1,
      timestamp: '2025-07-15 09:30:15',
      user: 'Sarah Mitchell',
      action: 'Report Generated',
      details: 'Generated weekly compliance report for MV Ocean Pioneer (MV-2024-001)',
      ipAddress: '192.168.1.45',
      userAgent: 'Chrome 126.0.0.0',
      status: 'Success',
      duration: '2.3s'
    },
    {
      id: 2,
      timestamp: '2025-07-15 08:15:42',
      user: 'Mike Johnson',
      action: 'Data Exported',
      details: 'Exported treatment logs to Excel format for period 07/01-07/15',
      ipAddress: '192.168.1.67',
      userAgent: 'Firefox 127.0.0',
      status: 'Success',
      duration: '1.8s'
    },
    {
      id: 3,
      timestamp: '2025-07-15 06:00:01',
      user: 'System',
      action: 'Email Sent',
      details: 'Automated 6-hour interval report delivered to compliance@vesseltreat.com',
      ipAddress: 'System',
      userAgent: 'Automated Process',
      status: 'Success',
      duration: '0.5s'
    },
    {
      id: 4,
      timestamp: '2025-07-14 16:45:23',
      user: 'Compliance Officer',
      action: 'Audit Accessed',
      details: 'Accessed audit trail for compliance review and verification',
      ipAddress: '192.168.1.89',
      userAgent: 'Edge 126.0.0.0',
      status: 'Success',
      duration: '0.2s'
    },
    {
      id: 5,
      timestamp: '2025-07-14 14:20:11',
      user: 'Sarah Mitchell',
      action: 'Settings Changed',
      details: 'Updated email notification preferences for automated reports',
      ipAddress: '192.168.1.45',
      userAgent: 'Chrome 126.0.0.0',
      status: 'Success',
      duration: '1.1s'
    },
    {
      id: 6,
      timestamp: '2025-07-14 09:15:33',
      user: 'Mike Johnson',
      action: 'User Login',
      details: 'Successful login to VesselTreat Pro system',
      ipAddress: '192.168.1.67',
      userAgent: 'Firefox 127.0.0',
      status: 'Success',
      duration: '0.8s'
    },
    {
      id: 7,
      timestamp: '2025-07-13 18:30:45',
      user: 'System Admin',
      action: 'Report Generated',
      details: 'Generated monthly compliance summary report for regulatory submission',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome 126.0.0.0',
      status: 'Success',
      duration: '4.2s'
    },
    {
      id: 8,
      timestamp: '2025-07-13 15:22:17',
      user: 'Sarah Mitchell',
      action: 'Data Exported',
      details: 'Failed to export large dataset - timeout error',
      ipAddress: '192.168.1.45',
      userAgent: 'Chrome 126.0.0.0',
      status: 'Failed',
      duration: '30.0s'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success': return 'text-success bg-success/10';
      case 'failed': return 'text-error bg-error/10';
      case 'warning': return 'text-warning bg-warning/10';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
      case 'report generated': return 'FileText';
      case 'data exported': return 'Download';
      case 'email sent': return 'Mail';
      case 'user login': return 'LogIn';
      case 'settings changed': return 'Settings';
      case 'audit accessed': return 'Shield';
      default: return 'Activity';
    }
  };

  const filteredAuditData = mockAuditData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = filterUser === '' || item.user.toLowerCase().includes(filterUser.toLowerCase());
    const matchesAction = filterAction === '' || item.action.toLowerCase().includes(filterAction.toLowerCase());
    
    return matchesSearch && matchesUser && matchesAction;
  });

  const handleExportAudit = () => {
    console.log('Exporting audit trail...');
  };

  return (
    <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-warning" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Audit Trail</h2>
          <p className="text-sm text-slate-600">System activity and user action logs</p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            label="Search"
            type="search"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            label="Filter by User"
            options={userOptions}
            value={filterUser}
            onChange={setFilterUser}
          />
          <Select
            label="Filter by Action"
            options={actionOptions}
            value={filterAction}
            onChange={setFilterAction}
          />
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={handleExportAudit}
              iconName="Download"
              iconPosition="left"
              className="w-full"
            >
              Export Audit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
          />
          <Input
            label="End Date"
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
          />
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Timestamp</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Details</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAuditData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-maritime">
                  <td className="px-4 py-3 text-sm text-slate-900 font-mono">
                    {item.timestamp}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} className="text-primary" />
                      </div>
                      <span className="text-sm text-slate-900">{item.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={getActionIcon(item.action)} size={16} className="text-slate-600" />
                      <span className="text-sm text-slate-900">{item.action}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">
                    {item.details}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 font-mono">
                    {item.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAuditData.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Search" size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No audit records found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-slate-600">
          Showing {filteredAuditData.length} of {mockAuditData.length} records
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-white">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailPanel;