import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const VesselSelectionSection = ({ selectedVessel, onVesselChange, vessels, errors }) => {
  const vesselOptions = vessels.map(vessel => ({
    value: vessel.id,
    label: `${vessel.name} (${vessel.imo})`,
    description: `Type: ${vessel.type} | Status: ${vessel.status}`
  }));

  return (
    <div className="bg-white rounded-lg shadow-maritime-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="Ship" size={16} className="text-white" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Vessel Selection</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Select
          label="Select Vessel"
          description="Choose the vessel for treatment logging"
          placeholder="Select a vessel..."
          options={vesselOptions}
          value={selectedVessel}
          onChange={onVesselChange}
          error={errors.vessel}
          required
          searchable
          className="w-full"
        />
        
        {selectedVessel && (
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="text-sm font-medium text-slate-900 mb-3">Vessel Information</h3>
            {(() => {
              const vessel = vessels.find(v => v.id === selectedVessel);
              return vessel ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Type:</span>
                    <span className="text-sm font-medium text-slate-900">{vessel.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Flag:</span>
                    <span className="text-sm font-medium text-slate-900">{vessel.flag}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Capacity:</span>
                    <span className="text-sm font-medium text-slate-900">{vessel.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Last Treatment:</span>
                    <span className="text-sm font-medium text-slate-900">{vessel.lastTreatment}</span>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default VesselSelectionSection;