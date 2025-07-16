import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TreatmentDetailsSection = ({ 
  formData, 
  onFieldChange, 
  errors, 
  tankOptions, 
  dyeColorOptions 
}) => {
  const calculateEstimatedDye = () => {
    const dischargeRate = parseFloat(formData.dischargeRate) || 0;
    const quantityDischarged = parseFloat(formData.quantityDischarged) || 0;
    
    if (dischargeRate > 0 && quantityDischarged > 0) {
      // Mock calculation: 0.5% of quantity discharged
      return (quantityDischarged * 0.005).toFixed(2);
    }
    return '0.00';
  };

  const getDyeColorIndicator = (colorValue) => {
    const colorMap = {
      'red': 'bg-red-500',
      'blue': 'bg-blue-500',
      'green': 'bg-green-500',
      'yellow': 'bg-yellow-500',
      'purple': 'bg-purple-500',
      'orange': 'bg-orange-500'
    };
    return colorMap[colorValue] || 'bg-slate-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-maritime-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Droplets" size={16} className="text-white" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Treatment Details</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Select
          label="Tank Number"
          description="Select the ballast tank"
          placeholder="Choose tank..."
          options={tankOptions}
          value={formData.tankNumber}
          onChange={(value) => onFieldChange('tankNumber', value)}
          error={errors.tankNumber}
          required
        />
        
        <div className="relative">
          <Select
            label="Dye Color"
            description="Select treatment dye color"
            placeholder="Choose color..."
            options={dyeColorOptions}
            value={formData.dyeColor}
            onChange={(value) => onFieldChange('dyeColor', value)}
            error={errors.dyeColor}
            required
          />
          {formData.dyeColor && (
            <div className="absolute right-3 top-8 flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm ${getDyeColorIndicator(formData.dyeColor)}`}></div>
            </div>
          )}
        </div>
        
        <Input
          label="Discharge Rate"
          type="number"
          placeholder="0.00"
          description="Rate in m³/hour"
          value={formData.dischargeRate}
          onChange={(e) => onFieldChange('dischargeRate', e.target.value)}
          error={errors.dischargeRate}
          required
          min="0"
          step="0.01"
        />
        
        <Input
          label="Quantity Discharged"
          type="number"
          placeholder="0.00"
          description="Volume in m³"
          value={formData.quantityDischarged}
          onChange={(e) => onFieldChange('quantityDischarged', e.target.value)}
          error={errors.quantityDischarged}
          required
          min="0"
          step="0.01"
        />
        
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Estimated Dye Injected
          </label>
          <div className="flex items-center space-x-2">
            <Icon name="Calculator" size={16} className="text-slate-500" />
            <span className="text-lg font-semibold text-primary">
              {calculateEstimatedDye()} L
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">Auto-calculated based on discharge data</p>
        </div>
        
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Treatment Comments
          </label>
          <textarea
            placeholder="Enter detailed observations, procedures, or notes about the treatment process..."
            value={formData.comments}
            onChange={(e) => onFieldChange('comments', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-maritime"
            rows="4"
          />
          {errors.comments && (
            <p className="text-sm text-error mt-1">{errors.comments}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetailsSection;