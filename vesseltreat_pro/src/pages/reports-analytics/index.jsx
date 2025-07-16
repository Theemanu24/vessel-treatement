import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ReportGenerationPanel from './components/ReportGenerationPanel';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ReportPreviewModal from './components/ReportPreviewModal';
import AuditTrailPanel from './components/AuditTrailPanel';
import ExportOptionsPanel from './components/ExportOptionsPanel';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewConfig, setPreviewConfig] = useState(null);

  const tabs = [
    { id: 'analytics', label: 'Analytics Dashboard', icon: 'BarChart3' },
    { id: 'reports', label: 'Report Generation', icon: 'FileText' },
    { id: 'export', label: 'Data Export', icon: 'Download' },
    { id: 'audit', label: 'Audit Trail', icon: 'Shield' }
  ];

  const handleGenerateReport = async (config) => {
    setIsGenerating(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Report generated with config:', config);
      
      // Simulate download or email delivery
      if (config.deliveryMethod === 'download' || config.deliveryMethod === 'both') {
        // Trigger download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `vessel_treatment_report_${new Date().toISOString().split('T')[0]}.pdf`;
        link.click();
      }
      
      if (config.deliveryMethod === 'email' || config.deliveryMethod === 'both') {
        // Show email sent confirmation
        alert('Report has been sent to the specified email addresses.');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreviewReport = (config) => {
    setPreviewConfig(config);
    setShowPreviewModal(true);
  };

  const handleConfirmGenerate = () => {
    setShowPreviewModal(false);
    if (previewConfig) {
      handleGenerateReport(previewConfig);
    }
  };

  const handleExportData = async (config) => {
    setIsExporting(true);
    try {
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Data exported with config:', config);
      
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `vessel_data_export_${new Date().toISOString().split('T')[0]}.${config.format}`;
      link.click();
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:ml-60 md:ml-16 pt-16 flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
                <p className="text-slate-600 mt-1">
                  Comprehensive reporting and operational insights for compliance documentation
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => window.location.reload()}
                >
                  Refresh Data
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setActiveTab('reports')}
                >
                  New Report
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-slate-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-maritime ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'analytics' && (
              <div>
                <AnalyticsDashboard />
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-1">
                  <ReportGenerationPanel
                    onGenerateReport={handleGenerateReport}
                    onPreviewReport={handlePreviewReport}
                    isGenerating={isGenerating}
                  />
                </div>
                <div className="xl:col-span-2">
                  <AnalyticsDashboard />
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div>
                <ExportOptionsPanel
                  onExport={handleExportData}
                  isExporting={isExporting}
                />
              </div>
            )}

            {activeTab === 'audit' && (
              <div>
                <AuditTrailPanel />
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50">
            <div className="flex flex-col space-y-3">
              <Button
                variant="default"
                size="icon"
                className="w-12 h-12 rounded-full shadow-maritime-lg"
                onClick={() => setActiveTab('reports')}
              >
                <Icon name="FileText" size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full shadow-maritime-lg bg-white"
                onClick={() => setActiveTab('export')}
              >
                <Icon name="Download" size={20} />
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </main>

      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        reportConfig={previewConfig}
        onConfirmGenerate={handleConfirmGenerate}
      />
    </div>
  );
};

export default ReportsAnalytics;