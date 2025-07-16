import React, { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SignatureSection = ({ 
  technicianSignature, 
  operatorSignature, 
  onTechnicianSignature, 
  onOperatorSignature,
  errors 
}) => {
  const technicianCanvasRef = useRef(null);
  const operatorCanvasRef = useRef(null);

  useEffect(() => {
    const resizeCanvas = (canvas) => {
      if (canvas) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
      }
    };

    if (technicianCanvasRef.current) {
      resizeCanvas(technicianCanvasRef.current.getCanvas());
    }
    if (operatorCanvasRef.current) {
      resizeCanvas(operatorCanvasRef.current.getCanvas());
    }
  }, []);

  const clearTechnicianSignature = () => {
    if (technicianCanvasRef.current) {
      technicianCanvasRef.current.clear();
      onTechnicianSignature('');
    }
  };

  const clearOperatorSignature = () => {
    if (operatorCanvasRef.current) {
      operatorCanvasRef.current.clear();
      onOperatorSignature('');
    }
  };

  const handleTechnicianEnd = () => {
    if (technicianCanvasRef.current) {
      const dataURL = technicianCanvasRef.current.toDataURL();
      onTechnicianSignature(dataURL);
    }
  };

  const handleOperatorEnd = () => {
    if (operatorCanvasRef.current) {
      const dataURL = operatorCanvasRef.current.toDataURL();
      onOperatorSignature(dataURL);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-maritime-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
          <Icon name="PenTool" size={16} className="text-white" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Digital Signatures</h2>
        <div className="flex-1"></div>
        <div className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
          Touch/Click and drag to sign
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technician Signature */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-900">Technician Signature</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearTechnicianSignature}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={14}
            >
              Clear
            </Button>
          </div>
          
          <div className={`relative border-2 border-dashed rounded-lg bg-slate-50 ${
            errors.technicianSignature ? 'border-error' : 'border-slate-300'
          }`}>
            <SignatureCanvas
              ref={technicianCanvasRef}
              canvasProps={{
                className: 'w-full h-32 cursor-crosshair',
                style: { touchAction: 'none' }
              }}
              backgroundColor="rgba(255, 255, 255, 0)"
              penColor="#1E40AF"
              minWidth={1}
              maxWidth={2}
              onEnd={handleTechnicianEnd}
            />
            {!technicianSignature && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <Icon name="PenTool" size={24} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Sign here</p>
                </div>
              </div>
            )}
          </div>
          
          {errors.technicianSignature && (
            <p className="text-sm text-error">{errors.technicianSignature}</p>
          )}
          
          <div className="bg-slate-100 rounded-lg p-3">
            <p className="text-xs text-slate-600 mb-1">Technician Details</p>
            <p className="text-sm font-medium text-slate-900">Sarah Mitchell</p>
            <p className="text-xs text-slate-600">ID: TEC-2024-001</p>
            <p className="text-xs text-slate-600">Certification: BWM-TECH-A</p>
          </div>
        </div>
        
        {/* Terminal Operator Signature */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-900">Terminal Operator Signature</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearOperatorSignature}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={14}
            >
              Clear
            </Button>
          </div>
          
          <div className={`relative border-2 border-dashed rounded-lg bg-slate-50 ${
            errors.operatorSignature ? 'border-error' : 'border-slate-300'
          }`}>
            <SignatureCanvas
              ref={operatorCanvasRef}
              canvasProps={{
                className: 'w-full h-32 cursor-crosshair',
                style: { touchAction: 'none' }
              }}
              backgroundColor="rgba(255, 255, 255, 0)"
              penColor="#059669"
              minWidth={1}
              maxWidth={2}
              onEnd={handleOperatorEnd}
            />
            {!operatorSignature && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <Icon name="PenTool" size={24} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Sign here</p>
                </div>
              </div>
            )}
          </div>
          
          {errors.operatorSignature && (
            <p className="text-sm text-error">{errors.operatorSignature}</p>
          )}
          
          <div className="bg-slate-100 rounded-lg p-3">
            <p className="text-xs text-slate-600 mb-1">Terminal Operator Details</p>
            <p className="text-sm font-medium text-slate-900">Michael Rodriguez</p>
            <p className="text-xs text-slate-600">ID: OPR-2024-003</p>
            <p className="text-xs text-slate-600">Certification: BWM-OPR-B</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Signature Requirements</p>
            <p className="text-xs text-blue-700 mt-1">
              Both technician and terminal operator signatures are required for compliance. 
              Signatures will be embedded in the generated PDF report and stored securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureSection;