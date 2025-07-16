import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportPreviewModal = ({ isOpen, onClose, reportConfig, onConfirmGenerate }) => {
  if (!isOpen) return null;

  const mockReportData = {
    vesselName: 'MV Ocean Pioneer',
    vesselId: 'MV-2024-001',
    reportDate: new Date().toLocaleDateString(),
    treatmentPeriod: `${reportConfig?.dateRange?.startDate || '2025-07-01'} to ${reportConfig?.dateRange?.endDate || '2025-07-15'}`,
    totalVolume: '3,450L',
    treatmentSessions: 12,
    complianceStatus: 'Compliant',
    technician: 'Sarah Mitchell',
    supervisor: 'Mike Johnson'
  };

  const mockTreatmentData = [
    { time: '08:00', tank: 'Tank A1', volume: '450L', dyeColor: 'Blue', rate: '75L/min', status: 'Complete' },
    { time: '10:30', tank: 'Tank B2', volume: '380L', dyeColor: 'Green', rate: '68L/min', status: 'Complete' },
    { time: '13:15', tank: 'Tank A3', volume: '520L', dyeColor: 'Blue', rate: '82L/min', status: 'Complete' },
    { time: '15:45', tank: 'Tank C1', volume: '290L', dyeColor: 'Red', rate: '58L/min', status: 'Complete' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-maritime-lg border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Report Preview</h2>
              <p className="text-sm text-slate-600">Review before generating final report</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Report Header */}
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12h18m-9-9v18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">VesselTreat Pro</h1>
                  <p className="text-sm text-slate-600">Vessel Treatment Compliance Report</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Report Generated</p>
                <p className="font-medium text-slate-900">{mockReportData.reportDate}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-slate-600">Vessel Name</p>
                <p className="font-medium text-slate-900">{mockReportData.vesselName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Vessel ID</p>
                <p className="font-medium text-slate-900">{mockReportData.vesselId}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Treatment Period</p>
                <p className="font-medium text-slate-900">{mockReportData.treatmentPeriod}</p>
              </div>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-600">Total Volume</p>
              <p className="text-xl font-bold text-primary">{mockReportData.totalVolume}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-600">Sessions</p>
              <p className="text-xl font-bold text-accent">{mockReportData.treatmentSessions}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-600">Compliance</p>
              <p className="text-xl font-bold text-success">{mockReportData.complianceStatus}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-600">Status</p>
              <p className="text-xl font-bold text-success">Complete</p>
            </div>
          </div>

          {/* Treatment Data Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mb-6">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Hourly Treatment Data</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Tank</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Volume</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Dye Color</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Rate</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mockTreatmentData.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900">{row.time}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">{row.tank}</td>
                      <td className="px-4 py-3 text-sm text-slate-900">{row.volume}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          row.dyeColor === 'Blue' ? 'bg-blue-100 text-blue-800' :
                          row.dyeColor === 'Green'? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {row.dyeColor}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">{row.rate}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures Section */}
          {reportConfig?.includeSignatures && (
            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">Digital Signatures</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Technician Signature</p>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 h-24 flex items-center justify-center">
                    <p className="text-sm text-slate-500">Sarah Mitchell - Digital Signature</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Signed on {mockReportData.reportDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">Supervisor Signature</p>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 h-24 flex items-center justify-center">
                    <p className="text-sm text-slate-500">Mike Johnson - Digital Signature</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Signed on {mockReportData.reportDate}</p>
                </div>
              </div>
            </div>
          )}

          {/* Comments Section */}
          {reportConfig?.includeComments && (
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Comments & Notes</h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-900">Treatment completed successfully with no issues. All tanks processed according to protocol.</p>
                  <p className="text-xs text-slate-500 mt-1">- Sarah Mitchell, Technician</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-900">Compliance verification completed. All documentation meets regulatory requirements.</p>
                  <p className="text-xs text-slate-500 mt-1">- Mike Johnson, Supervisor</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirmGenerate} iconName="Download" iconPosition="left">
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportPreviewModal;