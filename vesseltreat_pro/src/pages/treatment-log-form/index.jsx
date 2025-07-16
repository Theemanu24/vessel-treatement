import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FormHeader from './components/FormHeader';
import VesselSelectionSection from './components/VesselSelectionSection';
import TreatmentDetailsSection from './components/TreatmentDetailsSection';
import SignatureSection from './components/SignatureSection';
import FormActions from './components/FormActions';

const TreatmentLogForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [lastSaved, setLastSaved] = useState('');
  const [technicianSignature, setTechnicianSignature] = useState('');
  const [operatorSignature, setOperatorSignature] = useState('');
  const [errors, setErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    vessel: '',
    tankNumber: '',
    dyeColor: '',
    dischargeRate: '',
    quantityDischarged: '',
    comments: ''
  });

  // Mock data
  const vessels = [
    {
      id: 'vessel-001',
      name: 'MV Atlantic Pioneer',
      imo: 'IMO9876543',
      type: 'Container Ship',
      flag: 'Panama',
      capacity: '15,000 m³',
      status: 'Active',
      lastTreatment: '2025-07-14 08:30'
    },
    {
      id: 'vessel-002',
      name: 'MV Pacific Explorer',
      imo: 'IMO9876544',
      type: 'Bulk Carrier',
      flag: 'Liberia',
      capacity: '22,000 m³',
      status: 'Active',
      lastTreatment: '2025-07-13 14:15'
    },
    {
      id: 'vessel-003',
      name: 'MV Nordic Star',
      imo: 'IMO9876545',
      type: 'Tanker',
      flag: 'Marshall Islands',
      capacity: '18,500 m³',
      status: 'Pending',
      lastTreatment: '2025-07-12 10:45'
    }
  ];

  const tankOptions = [
    { value: 'tank-1', label: 'Tank 1 - Port Forward' },
    { value: 'tank-2', label: 'Tank 2 - Starboard Forward' },
    { value: 'tank-3', label: 'Tank 3 - Port Aft' },
    { value: 'tank-4', label: 'Tank 4 - Starboard Aft' },
    { value: 'tank-5', label: 'Tank 5 - Center' },
    { value: 'tank-6', label: 'Tank 6 - Double Bottom' }
  ];

  const dyeColorOptions = [
    { value: 'red', label: 'Red Dye' },
    { value: 'blue', label: 'Blue Dye' },
    { value: 'green', label: 'Green Dye' },
    { value: 'yellow', label: 'Yellow Dye' },
    { value: 'purple', label: 'Purple Dye' },
    { value: 'orange', label: 'Orange Dye' }
  ];

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('treatmentLogDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft.formData || {});
        setTechnicianSignature(draft.technicianSignature || '');
        setOperatorSignature(draft.operatorSignature || '');
        setIsDraft(true);
        setLastSaved(draft.timestamp || '');
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      const draftData = {
        formData,
        technicianSignature,
        operatorSignature,
        timestamp: new Date().toLocaleString()
      };
      
      localStorage.setItem('treatmentLogDraft', JSON.stringify(draftData));
      setLastSaved(draftData.timestamp);
    };

    const interval = setInterval(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearInterval(interval);
  }, [formData, technicianSignature, operatorSignature]);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vessel) newErrors.vessel = 'Please select a vessel';
    if (!formData.tankNumber) newErrors.tankNumber = 'Please select a tank number';
    if (!formData.dyeColor) newErrors.dyeColor = 'Please select a dye color';
    if (!formData.dischargeRate) newErrors.dischargeRate = 'Please enter discharge rate';
    if (!formData.quantityDischarged) newErrors.quantityDischarged = 'Please enter quantity discharged';
    if (!technicianSignature) newErrors.technicianSignature = 'Technician signature is required';
    if (!operatorSignature) newErrors.operatorSignature = 'Terminal operator signature is required';

    // Validate numeric fields
    if (formData.dischargeRate && (isNaN(formData.dischargeRate) || parseFloat(formData.dischargeRate) <= 0)) {
      newErrors.dischargeRate = 'Please enter a valid discharge rate';
    }
    if (formData.quantityDischarged && (isNaN(formData.quantityDischarged) || parseFloat(formData.quantityDischarged) <= 0)) {
      newErrors.quantityDischarged = 'Please enter a valid quantity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    const draftData = {
      formData,
      technicianSignature,
      operatorSignature,
      timestamp: new Date().toLocaleString()
    };
    
    localStorage.setItem('treatmentLogDraft', JSON.stringify(draftData));
    setIsDraft(true);
    setLastSaved(draftData.timestamp);
    
    // Show success message (you could add a toast notification here)
    console.log('Draft saved successfully');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft from localStorage
      localStorage.removeItem('treatmentLogDraft');
      
      // Navigate to success page or dashboard
      navigate('/dashboard', { 
        state: { 
          message: 'Treatment log submitted successfully for approval',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      vessel: '',
      tankNumber: '',
      dyeColor: '',
      dischargeRate: '',
      quantityDischarged: '',
      comments: ''
    });
    setTechnicianSignature('');
    setOperatorSignature('');
    setErrors({});
    setIsDraft(false);
    setLastSaved('');
    localStorage.removeItem('treatmentLogDraft');
  };

  const selectedVesselInfo = vessels.find(v => v.id === formData.vessel);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:ml-60 md:ml-16 pt-16 flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <Breadcrumb />
          
          <FormHeader 
            currentTime={currentTime}
            vesselInfo={selectedVesselInfo}
          />
          
          <VesselSelectionSection
            selectedVessel={formData.vessel}
            onVesselChange={(value) => handleFieldChange('vessel', value)}
            vessels={vessels}
            errors={errors}
          />
          
          <TreatmentDetailsSection
            formData={formData}
            onFieldChange={handleFieldChange}
            errors={errors}
            tankOptions={tankOptions}
            dyeColorOptions={dyeColorOptions}
          />
          
          <SignatureSection
            technicianSignature={technicianSignature}
            operatorSignature={operatorSignature}
            onTechnicianSignature={setTechnicianSignature}
            onOperatorSignature={setOperatorSignature}
            errors={errors}
          />
          
          <FormActions
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
            onClear={handleClear}
            isSubmitting={isSubmitting}
            isDraft={isDraft}
            lastSaved={lastSaved}
          />
          
          {errors.submit && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          )}
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default TreatmentLogForm;