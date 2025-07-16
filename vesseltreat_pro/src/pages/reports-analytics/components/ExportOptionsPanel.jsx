import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportOptionsPanel = ({ onExport, isExporting }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    dataRange: 'current',
    includeCharts: true,
    includeRawData: false,
    compression: 'standard'
  });

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', description: 'Formatted report with charts and tables' },
    { value: 'excel', label: 'Excel Spreadsheet', description: 'Raw data with multiple sheets' },
    { value: 'csv', label: 'CSV File', description: 'Comma-separated values for data analysis' },
    { value: 'json', label: 'JSON Data', description: 'Structured data for API integration' }
  ];

  const dataRangeOptions = [
    { value: 'current', label: 'Current View', description: 'Export currently displayed data' },
    { value: 'all', label: 'All Data', description: 'Export complete dataset' },
    { value: 'custom', label: 'Custom Range', description: 'Select specific date range' },
    { value: 'filtered', label: 'Filtered Data', description: 'Export with current filters applied' }
  ];

  const compressionOptions = [
    { value: 'none', label: 'No Compression' },
    { value: 'standard', label: 'Standard Compression' },
    { value: 'maximum', label: 'Maximum Compression' }
  ];

  const exportTemplates = [
    {
      id: 'compliance',
      name: 'Compliance Report',
      description: 'Standard regulatory compliance format',
      icon: 'Shield',
      formats: ['pdf', 'excel'],
      popular: true
    },
    {
      id: 'operational',
      name: 'Operational Summary',
      description: 'Daily/weekly operational overview',
      icon: 'BarChart3',
      formats: ['pdf', 'excel', 'csv'],
      popular: true
    },
    {
      id: 'audit',
      name: 'Audit Trail',
      description: 'Complete system activity log',
      icon: 'FileText',
      formats: ['excel', 'csv', 'json'],
      popular: false
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      description: 'Charts and performance metrics',
      icon: 'TrendingUp',
      formats: ['pdf'],
      popular: false
    },
    {
      id: 'vessel',
      name: 'Vessel Treatment Log',
      description: 'Individual vessel treatment records',
      icon: 'Ship',
      formats: ['pdf', 'excel'],
      popular: true
    },
    {
      id: 'custom',
      name: 'Custom Export',
      description: 'User-defined fields and format',
      icon: 'Settings',
      formats: ['pdf', 'excel', 'csv', 'json'],
      popular: false
    }
  ];

  const recentExports = [
    { id: 1, name: 'Weekly_Compliance_Report_2025-07-15.pdf', size: '2.4 MB', date: '2 hours ago', status: 'completed' },
    { id: 2, name: 'Treatment_Logs_Export_2025-07-14.xlsx', size: '1.8 MB', date: '1 day ago', status: 'completed' },
    { id: 3, name: 'Audit_Trail_2025-07-01_to_2025-07-15.csv', size: '856 KB', date: '2 days ago', status: 'completed' },
    { id: 4, name: 'Analytics_Dashboard_2025-07-13.pdf', size: '3.2 MB', date: '3 days ago', status: 'failed' }
  ];

  const handleConfigChange = (field, value) => {
    setExportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTemplateSelect = (template) => {
    // Auto-configure based on template
    const templateConfigs = {
      compliance: { format: 'pdf', includeCharts: true, includeRawData: false },
      operational: { format: 'excel', includeCharts: true, includeRawData: true },
      audit: { format: 'csv', includeCharts: false, includeRawData: true },
      analytics: { format: 'pdf', includeCharts: true, includeRawData: false },
      vessel: { format: 'pdf', includeCharts: false, includeRawData: true },
      custom: exportConfig
    };

    setExportConfig(prev => ({
      ...prev,
      ...templateConfigs[template.id]
    }));
  };

  const handleExport = () => {
    onExport(exportConfig);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'failed': return 'text-error bg-error/10';
      case 'processing': return 'text-warning bg-warning/10';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Export Templates */}
      <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Download" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Export Templates</h2>
            <p className="text-sm text-slate-600">Quick export options for common report types</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exportTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className="relative p-4 border border-slate-200 rounded-lg hover:border-primary hover:shadow-maritime-sm transition-maritime cursor-pointer group"
            >
              {template.popular && (
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-maritime">
                  <Icon name={template.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 group-hover:text-primary transition-maritime">
                    {template.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.formats.map((format) => (
                      <span
                        key={format}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700"
                      >
                        {format.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Configuration */}
      <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Export Configuration</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportConfig.format}
              onChange={(value) => handleConfigChange('format', value)}
            />
            <Select
              label="Data Range"
              options={dataRangeOptions}
              value={exportConfig.dataRange}
              onChange={(value) => handleConfigChange('dataRange', value)}
            />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-slate-900">Export Options</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportConfig.includeCharts}
                  onChange={(e) => handleConfigChange('includeCharts', e.target.checked)}
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-slate-700">Include Charts and Visualizations</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportConfig.includeRawData}
                  onChange={(e) => handleConfigChange('includeRawData', e.target.checked)}
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-slate-700">Include Raw Data Tables</span>
              </label>
            </div>
          </div>

          {exportConfig.format !== 'pdf' && (
            <Select
              label="Compression Level"
              options={compressionOptions}
              value={exportConfig.compression}
              onChange={(value) => handleConfigChange('compression', value)}
            />
          )}

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
            >
              Preview Export
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Exports */}
      <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Recent Exports</h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        <div className="space-y-3">
          {recentExports.map((export_item) => (
            <div key={export_item.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-maritime">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{export_item.name}</p>
                  <p className="text-xs text-slate-600">{export_item.size} • {export_item.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(export_item.status)}`}>
                  {export_item.status}
                </span>
                {export_item.status === 'completed' && (
                  <Button variant="ghost" size="sm" iconName="Download">
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportOptionsPanel;