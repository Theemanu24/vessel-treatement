import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Footer from '../../components/ui/Footer';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import VesselCard from './components/VesselCard';
import VesselTable from './components/VesselTable';
import VesselFilters from './components/VesselFilters';
import BulkActions from './components/BulkActions';
import VesselStats from './components/VesselStats';
import VesselDetailsModal from './components/VesselDetailsModal';

const VesselManagement = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [selectedVessels, setSelectedVessels] = useState([]);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    technician: 'all',
    dateFrom: '',
    dateTo: ''
  });

  // Mock data for vessels
  const [vessels] = useState([
    {
      id: 1,
      name: 'MV Atlantic Pioneer',
      identifier: 'AP-2024-001',
      arrivalDate: '07/12/2025',
      status: 'active',
      assignedTechnician: 'Sarah Mitchell',
      completionPercentage: 75,
      vesselType: 'Container Ship',
      flagState: 'Panama',
      treatmentStart: '07/12/2025 08:00',
      estimatedCompletion: '07/15/2025 16:00',
      recentActivity: [
        { description: 'Treatment log updated - Tank 3 completed', timestamp: '2 hours ago' },
        { description: 'Dye injection started for Tank 4', timestamp: '4 hours ago' },
        { description: 'Vessel inspection completed', timestamp: '6 hours ago' }
      ]
    },
    {
      id: 2,
      name: 'MS Pacific Explorer',
      identifier: 'PE-2024-002',
      arrivalDate: '07/13/2025',
      status: 'pending',
      assignedTechnician: 'Michael Rodriguez',
      completionPercentage: 25,
      vesselType: 'Bulk Carrier',
      flagState: 'Liberia',
      treatmentStart: '07/13/2025 14:00',
      estimatedCompletion: '07/16/2025 10:00',
      recentActivity: [
        { description: 'Initial inspection scheduled', timestamp: '1 hour ago' },
        { description: 'Vessel documentation received', timestamp: '3 hours ago' }
      ]
    },
    {
      id: 3,
      name: 'MV Northern Star',
      identifier: 'NS-2024-003',
      arrivalDate: '07/11/2025',
      status: 'completed',
      assignedTechnician: 'David Chen',
      completionPercentage: 100,
      vesselType: 'Tanker',
      flagState: 'Marshall Islands',
      treatmentStart: '07/11/2025 09:00',
      estimatedCompletion: '07/14/2025 17:00',
      recentActivity: [
        { description: 'Final report generated and submitted', timestamp: '1 day ago' },
        { description: 'All treatment logs completed', timestamp: '1 day ago' },
        { description: 'Quality inspection passed', timestamp: '1 day ago' }
      ]
    },
    {
      id: 4,
      name: 'SS Maritime Glory',
      identifier: 'MG-2024-004',
      arrivalDate: '07/14/2025',
      status: 'active',
      assignedTechnician: 'Emily Johnson',
      completionPercentage: 45,
      vesselType: 'Cargo Ship',
      flagState: 'Singapore',
      treatmentStart: '07/14/2025 11:00',
      estimatedCompletion: '07/17/2025 15:00',
      recentActivity: [
        { description: 'Tank 2 treatment in progress', timestamp: '30 minutes ago' },
        { description: 'Dye color verification completed', timestamp: '2 hours ago' }
      ]
    },
    {
      id: 5,
      name: 'MV Ocean Breeze',
      identifier: 'OB-2024-005',
      arrivalDate: '07/15/2025',
      status: 'pending',
      assignedTechnician: 'James Wilson',
      completionPercentage: 0,
      vesselType: 'Ferry',
      flagState: 'United States',
      treatmentStart: '07/15/2025 16:00',
      estimatedCompletion: '07/18/2025 12:00',
      recentActivity: [
        { description: 'Vessel arrival confirmed', timestamp: '15 minutes ago' },
        { description: 'Pre-treatment checklist initiated', timestamp: '30 minutes ago' }
      ]
    }
  ]);

  // Mock technicians data
  const technicians = [
    { id: 1, name: 'Sarah Mitchell' },
    { id: 2, name: 'Michael Rodriguez' },
    { id: 3, name: 'David Chen' },
    { id: 4, name: 'Emily Johnson' },
    { id: 5, name: 'James Wilson' }
  ];

  // Calculate statistics
  const stats = {
    totalVessels: vessels.length,
    activeVessels: vessels.filter(v => v.status === 'active').length,
    completedToday: vessels.filter(v => v.status === 'completed' && v.arrivalDate === '07/15/2025').length,
    pendingApproval: vessels.filter(v => v.status === 'pending').length
  };

  // Filter vessels based on current filters
  const filteredVessels = vessels.filter(vessel => {
    const matchesSearch = vessel.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         vessel.identifier.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || vessel.status === filters.status;
    const matchesTechnician = filters.technician === 'all' || 
                             technicians.find(t => t.id.toString() === filters.technician)?.name === vessel.assignedTechnician;
    
    return matchesSearch && matchesStatus && matchesTechnician;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      technician: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleSelectVessel = (vesselId, isSelected) => {
    setSelectedVessels(prev => 
      isSelected 
        ? [...prev, vesselId]
        : prev.filter(id => id !== vesselId)
    );
  };

  const handleSelectAll = (isSelected) => {
    setSelectedVessels(isSelected ? filteredVessels.map(v => v.id) : []);
  };

  const handleBulkAction = (action) => {
    console.log(`Executing bulk action: ${action} on vessels:`, selectedVessels);
    // Handle bulk actions here
    setSelectedVessels([]);
  };

  const handleViewLogs = (vessel) => {
    navigate('/treatment-log-form', { state: { vesselId: vessel.id } });
  };

  const handleGenerateReport = (vessel) => {
    console.log('Generating report for vessel:', vessel.name);
    // Handle report generation
  };

  const handleEditVessel = (vessel) => {
    setSelectedVessel(vessel);
    setIsDetailsModalOpen(true);
  };

  const handleStatusUpdate = (vessel, newStatus) => {
    console.log(`Updating status for ${vessel.name} to ${newStatus}`);
    // Handle status update
  };

  const handleExportData = () => {
    console.log('Exporting vessel data...');
    // Handle data export
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Vessel Management</h1>
              <p className="text-muted-foreground">
                Monitor and manage vessel treatment operations with comprehensive tracking
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="Table"
                  iconSize={16}
                />
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  iconName="Grid3X3"
                  iconSize={16}
                />
              </div>
              
              <Button
                variant="outline"
                onClick={handleExportData}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export
              </Button>
              
              <Button
                variant="default"
                onClick={() => navigate('/treatment-log-form')}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                New Treatment
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <VesselStats stats={stats} />

          {/* Filters */}
          <VesselFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            technicians={technicians}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedVessels.length}
            onBulkAction={handleBulkAction}
            technicians={technicians}
          />

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredVessels.length} of {vessels.length} vessels
            </p>
            
            {filters.search && (
              <div className="flex items-center space-x-2">
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Results for "{filters.search}"
                </span>
              </div>
            )}
          </div>

          {/* Vessel Display */}
          {viewMode === 'table' ? (
            <VesselTable
              vessels={filteredVessels}
              selectedVessels={selectedVessels}
              onSelectVessel={handleSelectVessel}
              onSelectAll={handleSelectAll}
              onViewLogs={handleViewLogs}
              onGenerateReport={handleGenerateReport}
              onEditVessel={handleEditVessel}
              onStatusUpdate={handleStatusUpdate}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredVessels.map(vessel => (
                <VesselCard
                  key={vessel.id}
                  vessel={vessel}
                  onViewLogs={handleViewLogs}
                  onGenerateReport={handleGenerateReport}
                  onEditVessel={handleEditVessel}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredVessels.length === 0 && (
            <div className="glass-surface rounded-lg p-12 text-center mb-8">
              <Icon name="Ship" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No vessels found</h3>
              <p className="text-muted-foreground mb-6">
                {filters.search || filters.status !== 'all' || filters.technician !== 'all' ?'Try adjusting your filters to see more results.' :'No vessels are currently registered in the system.'}
              </p>
              {filters.search || filters.status !== 'all' || filters.technician !== 'all' ? (
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  onClick={() => navigate('/treatment-log-form')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add First Vessel
                </Button>
              )}
            </div>
          )}
        </div>

        <Footer />
      </main>

      {/* Vessel Details Modal */}
      <VesselDetailsModal
        vessel={selectedVessel}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedVessel(null);
        }}
        onEdit={handleEditVessel}
      />
    </div>
  );
};

export default VesselManagement;