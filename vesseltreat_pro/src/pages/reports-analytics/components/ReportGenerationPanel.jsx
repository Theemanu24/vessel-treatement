import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportGenerationPanel = ({ onGenerateReport, onPreviewReport, isGenerating }) => {
  const [reportConfig, setReportConfig] = useState({
    dateRange: {
      startDate: '2025-07-01',
      endDate: '2025-07-15'
    },
    vesselFilter: '',
    reportTemplate: 'standard',
    includeSignatures: true,
    includeComments: true,
    deliveryMethod: 'download'
  });

  const [emailConfig, setEmailConfig] = useState({
    recipients: 'compliance@vesseltreat.com',
    subject: 'Vessel Treatment Report - ' + new Date().toLocaleDateString(),
    intervalHours: 6,
    autoDelivery: false
  });

  const vesselOptions = [
    { value: '', label: 'All Vessels' },
    { value: 'MV-2024-001', label: 'MV Ocean Pioneer' },
    { value: 'MV-2024-002', label: 'MV Baltic Star' },
    { value: 'MV-2024-003', label: 'MV Pacific Dawn' },
    { value: 'MV-2024-004', label: 'MV Atlantic Breeze' },
    { value: 'MV-2024-005', label: 'MV Nordic Wind' }
  ];

  const templateOptions = [
    { value: 'standard', label: 'Standard Report', description: 'Complete treatment log with signatures' },
    { value: 'summary', label: 'Summary Report', description: 'Condensed overview for management' },
    { value: 'compliance', label: 'Compliance Report', description: 'Regulatory submission format' },
    { value: 'custom', label: 'Custom Report', description: 'User-defined fields and layout' }
  ];

  const deliveryOptions = [
    { value: 'download', label: 'Download PDF' },
    { value: 'email', label: 'Email Delivery' },
    { value: 'both', label: 'Download & Email' }
  ];

  const intervalOptions = [
    { value: 1, label: '1 Hour' },
    { value: 6, label: '6 Hours' },
    { value: 12, label: '12 Hours' },
    { value: 24, label: '24 Hours' }
  ];

  const handleConfigChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setReportConfig(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setReportConfig(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleEmailConfigChange = (field, value) => {
    setEmailConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateReport = () => {
    const fullConfig = {
      ...reportConfig,
      emailConfig: reportConfig.deliveryMethod !== 'download' ? emailConfig : null
    };
    onGenerateReport(fullConfig);
  };

  const handlePreviewReport = () => {
    onPreviewReport(reportConfig);
  };

  return (
    <div className="bg-white rounded-lg shadow-maritime-md border border-slate-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Report Generation</h2>
          <p className="text-sm text-slate-600">Create compliance and operational reports</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Date Range Selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-900">Date Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={reportConfig.dateRange.startDate}
              onChange={(e) => handleConfigChange('dateRange.startDate', e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={reportConfig.dateRange.endDate}
              onChange={(e) => handleConfigChange('dateRange.endDate', e.target.value)}
            />
          </div>
        </div>

        {/* Vessel Filter */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-900">Vessel Selection</h3>
          <Select
            label="Filter by Vessel"
            options={vesselOptions}
            value={reportConfig.vesselFilter}
            onChange={(value) => handleConfigChange('vesselFilter', value)}
            searchable
          />
        </div>

        {/* Report Template */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-900">Report Template</h3>
          <Select
            label="Template Type"
            options={templateOptions}
            value={reportConfig.reportTemplate}
            onChange={(value) => handleConfigChange('reportTemplate', value)}
          />
        </div>

        {/* Report Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-900">Include in Report</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={reportConfig.includeSignatures}
                onChange={(e) => handleConfigChange('includeSignatures', e.target.checked)}
                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-slate-700">Digital Signatures</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={reportConfig.includeComments}
                onChange={(e) => handleConfigChange('includeComments', e.target.checked)}
                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-slate-700">Comments & Notes</span>
            </label>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-900">Delivery Method</h3>
          <Select
            label="How to deliver report"
            options={deliveryOptions}
            value={reportConfig.deliveryMethod}
            onChange={(value) => handleConfigChange('deliveryMethod', value)}
          />
        </div>

        {/* Email Configuration */}
        {reportConfig.deliveryMethod !== 'download' && (
          <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="text-sm font-medium text-slate-900">Email Configuration</h3>
            <div className="space-y-4">
              <Input
                label="Recipients"
                type="email"
                placeholder="Enter email addresses (comma separated)"
                value={emailConfig.recipients}
                onChange={(e) => handleEmailConfigChange('recipients', e.target.value)}
              />
              <Input
                label="Subject Line"
                type="text"
                value={emailConfig.subject}
                onChange={(e) => handleEmailConfigChange('subject', e.target.value)}
              />
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="autoDelivery"
                  checked={emailConfig.autoDelivery}
                  onChange={(e) => handleEmailConfigChange('autoDelivery', e.target.checked)}
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <label htmlFor="autoDelivery" className="text-sm text-slate-700">
                  Enable automatic delivery
                </label>
              </div>
              {emailConfig.autoDelivery && (
                <Select
                  label="Delivery Interval"
                  options={intervalOptions}
                  value={emailConfig.intervalHours}
                  onChange={(value) => handleEmailConfigChange('intervalHours', value)}
                />
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={handlePreviewReport}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            Preview Report
          </Button>
          <Button
            variant="default"
            onClick={handleGenerateReport}
            loading={isGenerating}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerationPanel;