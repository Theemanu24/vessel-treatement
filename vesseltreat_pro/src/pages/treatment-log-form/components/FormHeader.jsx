import React from 'react';
import Icon from '../../../components/AppIcon';

const FormHeader = ({ currentTime, vesselInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow-maritime-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Treatment Log Form</h1>
            <p className="text-sm text-slate-600">Document vessel ballast water treatment procedures</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">Current Time</p>
          <p className="text-lg font-semibold text-slate-900">{currentTime}</p>
        </div>
      </div>
      
      {vesselInfo && (
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wide">Vessel Name</p>
              <p className="font-medium text-slate-900">{vesselInfo.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wide">IMO Number</p>
              <p className="font-medium text-slate-900">{vesselInfo.imo}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wide">Status</p>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${vesselInfo.status === 'Active' ? 'bg-success' : 'bg-warning'}`}></div>
                <span className="text-sm font-medium text-slate-900">{vesselInfo.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormHeader;