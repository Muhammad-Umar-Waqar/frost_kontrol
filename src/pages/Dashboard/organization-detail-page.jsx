"use client"

import { useState, useEffect } from "react"
// TODO: Backend developer will add lock service here

const OrganizationDetailContent = ({ 
  organizationId, 
  organizationName, 
  onBack,
  //  Real dynamic functionality props
  organizations = [],
  websocket,
  connectionStatus,
  // Individual device command handlers
  onDeviceTemperatureChange,
  onDevicePowerChange,
  //  NEW: Device selection callback
  onDeviceSelect,
  //  REMOVED: lockService prop (import directly instead)
  userRole = 'admin', //   Keep user role for permissions
}) => {
  const [devices, setDevices] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [draggedDevice, setDraggedDevice] = useState(null)
  //   NEW: Device selection state
  const [selectedDeviceId, setSelectedDeviceId] = useState(null)
  
  //   NEW: Filter states
  const [filters, setFilters] = useState({
    venue: '',
    temperature: '',
    status: '',
    lock: ''
  })
  
  //   NEW: Loading state for search
  const [isSearching, setIsSearching] = useState(false)
  
  //   Processing and error states for individual devices
  const [deviceTemperatureProcessing, setDeviceTemperatureProcessing] = useState({})
  const [deviceTemperatureErrors, setDeviceTemperatureErrors] = useState({})
  const [devicePowerProcessing, setDevicePowerProcessing] = useState({})
  const [devicePowerErrors, setDevicePowerErrors] = useState({})
  //   SIMPLIFIED: Only lock processing and error states (no super lock)
  const [deviceLockProcessing, setDeviceLockProcessing] = useState({})
  const [deviceLockErrors, setDeviceLockErrors] = useState({})
  
  //   Current states for devices
  const [deviceTemperatures, setDeviceTemperatures] = useState({})
  const [devicePowerStates, setDevicePowerStates] = useState({})
  //   SIMPLIFIED: Only 'locked' or 'unlocked' states
  const [deviceLockStates, setDeviceLockStates] = useState({}) // 'unlocked' or 'locked' only

  //   Helper function to find organization
  const findOrganizationById = (orgs, id) => {
    for (const org of orgs) {
      if (org.id === id) return org;
      if (org.subOrganizations) {
        const found = findOrganizationById(org.subOrganizations, id);
        if (found) return found;
      }
    }
    return null;
  };

  //   Helper function to get all devices in organization  
  const getAllDevicesInOrganization = (org) => {
    let devices = [...(org.devices || [])];
    if (org.subOrganizations) {
      org.subOrganizations.forEach(subOrg => {
        devices = devices.concat(getAllDevicesInOrganization(subOrg));
      });
    }
    return devices;
  };

  //   NEW: Device selection handler
  const handleDeviceSelect = (deviceId) => {
    setSelectedDeviceId(deviceId);
    //   Find the device and pass it to parent
    const selectedDevice = devices.find(device => device.id === deviceId);
    if (selectedDevice && onDeviceSelect) {
      onDeviceSelect(selectedDevice);
    }
  };

  //   NEW: Search devices with backend API
  const searchDevices = async (searchQuery = '', filterParams = {}) => {
    if (!organizationId) return;
    
    setIsSearching(true);
    try {
      const queryParams = new URLSearchParams({
        organizationId,
        ...(searchQuery && { search: searchQuery }),
        ...(filterParams.venue && { venue: filterParams.venue }),
        ...(filterParams.brand && { brand: filterParams.brand }),
        limit: '100' // Reasonable limit for frontend
      });

      const response = await fetch(`/api/device/search?${queryParams}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        console.error('Search failed:', result);
        return [];
      }
    } catch (error) {
      console.error('Search error:', error);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  //   NEW: Filter handler
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  //   NEW: Apply filters to devices (frontend filtering for temperature, status, lock)
  const applyFilters = (deviceList) => {
    let filtered = [...deviceList];
    
    // Frontend filters (for states not stored in backend)
    if (filters.temperature) {
      const [min, max] = filters.temperature.split('-').map(Number);
      filtered = filtered.filter(device => 
        device.temperature >= min && device.temperature <= max
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(device => {
        if (filters.status === 'online') return device.isOn;
        if (filters.status === 'offline') return !device.isOn;
        return true;
      });
    }
    
    if (filters.lock) {
      filtered = filtered.filter(device => {
        if (filters.lock === 'locked') return device.isLocked;
        if (filters.lock === 'unlocked') return !device.isLocked;
        return true;
      });
    }
    
    return filtered;
  };

  //   Load real device data for the selected organization
  useEffect(() => {
    const loadDevices = async () => {
      if (organizationId && organizations.length > 0) {
        //   Try backend search first
        const searchResults = await searchDevices(searchTerm, { venue: filters.venue });
        
        if (searchResults && searchResults.length > 0) {
          //   Use backend search results
          const devicesWithStates = searchResults.map((device) => ({
            id: device.device_id,
            name: device.device_name,
            type: device.brand_name, // Use brand as type for now
            brand: device.brand_name,
            status: 'online', // Default status
            venue: device.device_venue || "Gulshan, block 14 Branch",
            //   Initialize with default values
            temperature: deviceTemperatures[device.device_id] || 24,
            isOn: devicePowerStates[device.device_id] === 'ON',
            isLocked: deviceLockStates[device.device_id] === 'locked',
          }));
          
          setDevices(devicesWithStates);
          
          //   Initialize device states if not already set
          const newTemperatures = {};
          const newPowerStates = {};
          const newLockStates = {};
          
          searchResults.forEach((device) => {
            if (!deviceTemperatures[device.device_id]) {
              newTemperatures[device.device_id] = 24;
            }
            if (!devicePowerStates[device.device_id]) {
              newPowerStates[device.device_id] = 'OFF';
            }
            if (!deviceLockStates[device.device_id]) {
              newLockStates[device.device_id] = 'unlocked';
            }
          });
          
          if (Object.keys(newTemperatures).length > 0) {
            setDeviceTemperatures(prev => ({ ...prev, ...newTemperatures }));
          }
          if (Object.keys(newPowerStates).length > 0) {
            setDevicePowerStates(prev => ({ ...prev, ...newPowerStates }));
          }
          if (Object.keys(newLockStates).length > 0) {
            setDeviceLockStates(prev => ({ ...prev, ...newLockStates }));
          }
          
          //   Select first device by default
          if (devicesWithStates.length > 0 && !selectedDeviceId) {
            const firstDevice = devicesWithStates[0];
            setSelectedDeviceId(firstDevice.id);
            if (onDeviceSelect) {
              onDeviceSelect(firstDevice);
            }
          }
        } else {
          //   Fallback to organization-based loading
          const organization = findOrganizationById(organizations, organizationId);
          if (organization) {
            const orgDevices = getAllDevicesInOrganization(organization);
            
            const devicesWithStates = orgDevices.map((device) => ({
              id: device.id,
              name: device.name,
              type: device.type,
              brand: device.brand,
              status: device.status,
              venue: "Gulshan, block 14 Branch",
              temperature: deviceTemperatures[device.id] || 24,
              isOn: devicePowerStates[device.id] === 'ON',
              isLocked: deviceLockStates[device.id] === 'locked',
            }));
            
            setDevices(devicesWithStates);
            
            //   Select first device by default
            if (devicesWithStates.length > 0 && !selectedDeviceId) {
              const firstDevice = devicesWithStates[0];
              setSelectedDeviceId(firstDevice.id);
              if (onDeviceSelect) {
                onDeviceSelect(firstDevice);
              }
            }
          }
        }
      }
    };
    
    loadDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId, organizations, searchTerm, filters.venue]);

  //   NEW: Handle filter and search changes
  useEffect(() => {
    if (organizationId) {
      searchDevices(searchTerm, { venue: filters.venue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filters.venue, organizationId]);

  //   NEW: Update selected device data when device states change
  useEffect(() => {
    if (selectedDeviceId && devices.length > 0) {
      const selectedDevice = devices.find(device => device.id === selectedDeviceId);
      if (selectedDevice && onDeviceSelect) {
        onDeviceSelect(selectedDevice);
      }
    }
  }, [selectedDeviceId, devices, onDeviceSelect]);

  // Drag and drop handlers
  const handleDragStart = (e, deviceId) => {
    setDraggedDevice(deviceId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', deviceId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDeviceId) => {
    e.preventDefault();
    const sourceDeviceId = draggedDevice;
    
    if (sourceDeviceId && sourceDeviceId !== targetDeviceId) {
      const sourceIndex = devices.findIndex(device => device.id === sourceDeviceId);
      const targetIndex = devices.findIndex(device => device.id === targetDeviceId);
      
      const newDevices = [...devices];
      const [movedDevice] = newDevices.splice(sourceIndex, 1);
      newDevices.splice(targetIndex, 0, movedDevice);
      
      setDevices(newDevices);
    }
    
    setDraggedDevice(null);
  };

  const handleDragEnd = () => {
    setDraggedDevice(null);
  };

  //   Individual device temperature handler
  const handleDeviceTemperatureChange = async (deviceId, increment) => {
    const currentTemp = deviceTemperatures[deviceId] || 24;
    const newTemp = Math.max(16, Math.min(30, currentTemp + increment));
    
    if (newTemp === currentTemp) return;
    
    console.log(`🌡️ Device temperature change: ${deviceId} -> ${newTemp}°C`);
    
    if (connectionStatus !== 'connected') {
      setDeviceTemperatureErrors(prev => ({
        ...prev,
        [deviceId]: 'WebSocket not connected'
      }));
      return;
    }

    const controlName = `temp_${newTemp}`;
    const commandValue = newTemp;

    setDeviceTemperatureProcessing(prev => ({ ...prev, [deviceId]: true }));
    setDeviceTemperatureErrors(prev => ({ ...prev, [deviceId]: null }));

    try {
      console.log(`Sending individual device temperature command: ${controlName} with value ${commandValue} to device ${deviceId}...`);
      
      // TODO: Backend developer will implement WebSocket command
      // const result = await websocket.sendBatchCommandsMultiBrand(...)
      const result = { success: false, error: 'Not implemented' };
      
      console.log('Device temperature command result:', result);
      
      if (result && result.success && result.brandResults) {
        setDeviceTemperatures(prev => ({
          ...prev,
          [deviceId]: newTemp
        }));
        
        setDevices(prevDevices =>
          prevDevices.map(device =>
            device.id === deviceId ? { ...device, temperature: newTemp } : device
          )
        );
        
        console.log(`  Device temperature command successful for ${deviceId}: ${newTemp}°C`);
        
      } else {
        throw new Error(result?.error || 'Command failed without specific error');
      }
      
    } catch (error) {
      console.error(`❌ Device temperature command failed for ${deviceId}:`, error);
      setDeviceTemperatureErrors(prev => ({
        ...prev,
        [deviceId]: error.message || 'Failed to set temperature'
      }));
    } finally {
      setDeviceTemperatureProcessing(prev => ({ ...prev, [deviceId]: false }));
    }
  };

  //   Individual device power toggle handler
  const handleDevicePowerToggle = async (deviceId) => {
    const currentPowerState = devicePowerStates[deviceId] || 'OFF';
    const newPowerState = currentPowerState === 'ON' ? 'OFF' : 'ON';
    
    console.log(`⚡ Device power change: ${deviceId} -> ${newPowerState}`);
    
    if (connectionStatus !== 'connected') {
      setDevicePowerErrors(prev => ({
        ...prev,
        [deviceId]: 'WebSocket not connected'
      }));
      return;
    }

    const powerStateMap = {
      'ON': { controlName: 'power_on', value: 'on' },
      'OFF': { controlName: 'power_off', value: 'off' }
    };

    const { controlName, value } = powerStateMap[newPowerState];

    setDevicePowerProcessing(prev => ({ ...prev, [deviceId]: true }));
    setDevicePowerErrors(prev => ({ ...prev, [deviceId]: null }));

    try {
      console.log(`Sending individual device power command: ${controlName} with value "${value}" to device ${deviceId}...`);
      
      // TODO: Backend developer will implement WebSocket command
      // const result = await websocket.sendBatchCommandsMultiBrand(...)
      const result = { success: false, error: 'Not implemented' };
      
      console.log('Device power command result:', result);
      
      if (result && result.success && result.brandResults) {
        setDevicePowerStates(prev => ({
          ...prev,
          [deviceId]: newPowerState
        }));
        
        setDevices(prevDevices =>
          prevDevices.map(device =>
            device.id === deviceId ? { ...device, isOn: newPowerState === 'ON' } : device
          )
        );
        
        console.log(`  Device power command successful for ${deviceId}: ${newPowerState}`);
        
      } else {
        throw new Error(result?.error || 'Command failed without specific error');
      }
      
    } catch (error) {
      console.error(`❌ Device power command failed for ${deviceId}:`, error);
      setDevicePowerErrors(prev => ({
        ...prev,
        [deviceId]: error.message || 'Failed to change power state'
      }));
    } finally {
      setDevicePowerProcessing(prev => ({ ...prev, [deviceId]: false }));
    }
  };

  //   SIMPLIFIED: Simple lock toggle handler (locked/unlocked only)
  const handleDeviceLockToggle = async (deviceId) => {
    const currentLockState = deviceLockStates[deviceId] || 'unlocked';
    const newLockState = currentLockState === 'locked' ? 'unlocked' : 'locked';
    
    console.log(`🔒 Device lock toggle: ${deviceId} -> ${newLockState}`);

    setDeviceLockProcessing(prev => ({ ...prev, [deviceId]: true }));
    setDeviceLockErrors(prev => ({ ...prev, [deviceId]: null }));

    try {
      console.log(`Setting lock state for device ${deviceId} to ${newLockState}...`);
      
      // TODO: Backend developer will implement lock service call
      // const result = await lockService.setLockState(deviceId, newLockState);
      const result = { success: false, error: 'Not implemented' };
      
      console.log('Device lock command result:', result);
      
      //   Success: Update device lock state
      setDeviceLockStates(prev => ({
        ...prev,
        [deviceId]: newLockState
      }));
      
      //   Update devices state for UI
      setDevices(prevDevices =>
        prevDevices.map(device =>
          device.id === deviceId ? { 
            ...device, 
            isLocked: newLockState === 'locked'
          } : device
        )
      );
      
      console.log(`  Device lock command successful for ${deviceId}: ${newLockState}`);
      
    } catch (error) {
      console.error(`❌ Device lock command failed for ${deviceId}:`, error);
      setDeviceLockErrors(prev => ({
        ...prev,
        [deviceId]: error.message || 'Failed to set lock state'
      }));
    } finally {
      setDeviceLockProcessing(prev => ({ ...prev, [deviceId]: false }));
    }
  };

  //   NEW: Apply all filters to devices
  const filteredDevices = applyFilters(devices).filter((device) => {
    // Additional search filter for device name/ID (frontend fallback)
    if (searchTerm) {
      return device.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
             device.name?.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  //   Mock data for stats cards (will be replaced with backend route later)
  const mockStats = {
    totalDevices: 98,
    faultDevices: 32,
    energy: 82.4
  }

  return (
    <div className="w-full p-2 space-y-2 max-h-[calc(100vh-2rem)] custom-scrollbar">
      {/* Organization Name and Stats Cards in horizontal layout */}
      <div className="flex flex-col lg:flex-row gap-2 items-start">
        {/* Organization Name */}
        <div className="lg:w-2/3">
          <p className="text-xs text-gray-500">Organization</p>
          <h1 className="text-lg font-bold text-gray-800">{organizationName}</h1>
        </div>

        {/* Stats Cards - Using mock data */}
        <div className="lg:w-3/5 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* No. of Devices */}
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">No. of Devices</p>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-800">{mockStats.totalDevices}</span>
                <span className="text-sm text-gray-500">Devices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fault Devices */}
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Fault Devices</p>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-800">{mockStats.faultDevices}</span>
                <span className="text-sm text-gray-500">Devices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Energy */}
        <div className="bg-white rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Energy</p>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-800">{mockStats.energy}</span>
                <span className="text-sm text-gray-500">kV</span>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>

      {/* Device Table */}
      <div className="overflow-hidden">
        {/* SVG cap as background with controls */}
        <div
          className="w-full relative"
          style={{
            height: "64px", // or whatever height looks best
            background: "url('/Vector 137.svg') no-repeat center top / cover"
          }}
        >
          {/* Controls overlay */}
          <div className="absolute inset-0 flex items-center justify-start px-6">
            {/* Left side - Four dropdowns */}
            <div className="flex space-x-3">
              <select 
                value={filters.venue}
                onChange={(e) => handleFilterChange('venue', e.target.value)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(209, 213, 219, 0.6)',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.875rem',
                  color: 'rgba(55, 65, 81, 0.9)',
                  outline: 'none',
                  backdropFilter: 'blur(4px)'
                }}
                className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Venue</option>
                <option value="ORIC_ST09">ORIC_ST09</option>
                <option value="ORIC_ST08">ORIC_ST08</option>
                <option value="ORIC_342">ORIC_342</option>
                <option value="gulshan">Gulshan</option>
                <option value="banani">Banani</option>
              </select>
              
              <select 
                value={filters.temperature}
                onChange={(e) => handleFilterChange('temperature', e.target.value)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(209, 213, 219, 0.6)',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.875rem',
                  color: 'rgba(55, 65, 81, 0.9)',
                  outline: 'none',
                  backdropFilter: 'blur(4px)'
                }}
                className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Temperature</option>
                <option value="16-20">16-20°C</option>
                <option value="21-25">21-25°C</option>
                <option value="26-30">26-30°C</option>
              </select>
              
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(209, 213, 219, 0.6)',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.875rem',
                  color: 'rgba(55, 65, 81, 0.9)',
                  outline: 'none',
                  backdropFilter: 'blur(4px)'
                }}
                className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              
              <select 
                value={filters.lock}
                onChange={(e) => handleFilterChange('lock', e.target.value)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(209, 213, 219, 0.6)',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.875rem',
                  color: 'rgba(55, 65, 81, 0.9)',
                  outline: 'none',
                  backdropFilter: 'blur(4px)'
                }}
                className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Lock</option>
                <option value="locked">Locked</option>
                <option value="unlocked">Unlocked</option>
              </select>
            </div>
            
            {/* Search bar - moved closer to filters */}
            <div className="flex items-center ml-45">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search devices by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(209, 213, 219, 0.8)',
                    borderRadius: '9999px',
                    padding: '0.25rem 0.75rem 0.25rem 2rem',
                    fontSize: '0.875rem',
                    color: 'rgba(55, 65, 81, 0.9)',
                    outline: 'none',
                    backdropFilter: 'blur(4px)',
                    width: '14rem'
                  }}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                />
                <svg 
                  style={{
                    position: 'absolute',
                    left: '0.625rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1rem',
                    height: '1rem',
                    color: 'rgba(156, 163, 175, 0.7)'
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border-2 border-blue-500 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map((device, index) => (
                <tr 
                  key={device.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, device.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, device.id)}
                  onDragEnd={handleDragEnd}
                  //   NEW: Make row clickable and selectable
                  onClick={() => handleDeviceSelect(device.id)}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-200 ${
                    draggedDevice === device.id ? 'opacity-50' : ''
                  } ${
                    selectedDeviceId === device.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  {/* Device ID with drag icon */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 flex items-center justify-center">
                        <img 
                          src="/Group 630.svg" 
                          alt="Drag handle" 
                          className="w-4 h-4 opacity-60"
                          onError={(e) => {
                            e.target.src = "/Group 630.png";
                          }}
                        />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${
                          selectedDeviceId === device.id ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {device.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Venue */}
                  <td className="px-6 py-4">
                    <div className={`text-sm ${
                      selectedDeviceId === device.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {device.venue}
                    </div>
                  </td>

                  {/* Temperature Control */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); //   Prevent row selection
                          handleDeviceTemperatureChange(device.id, -1);
                        }}
                        disabled={deviceTemperatureProcessing[device.id]}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 text-sm font-medium"
                      >
                        -
                      </button>
                      <div className="bg-gray-100 rounded-full px-4 py-1 min-w-[3rem] text-center">
                        <span className="text-sm font-medium text-gray-900">{device.temperature}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); //   Prevent row selection
                          handleDeviceTemperatureChange(device.id, 1);
                        }}
                        disabled={deviceTemperatureProcessing[device.id]}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 text-sm font-medium"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Status Toggle with integrated ON/OFF text */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); //   Prevent row selection
                            handleDevicePowerToggle(device.id);
                          }}
                          disabled={devicePowerProcessing[device.id]}
                          className={`relative inline-flex h-7 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                            device.isOn 
                              ? "bg-green-500 focus:ring-green-500" 
                              : "bg-gray-400 focus:ring-gray-300"
                          }`}
                        >
                          {/* Toggle Circle */}
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                              device.isOn ? "translate-x-9" : "translate-x-1"
                            }`}
                          />
                          
                          {/* ON/OFF Text integrated into toggle */}
                          <span className={`absolute text-xs font-medium text-white transition-all duration-200 ${
                            device.isOn 
                              ? "left-2 opacity-100" 
                              : "right-2 opacity-100"
                          }`}>
                            {device.isOn ? "ON" : "OFF"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Events */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button 
                        onClick={(e) => e.stopPropagation()} //   Prevent row selection
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <span className="text-gray-600 font-bold text-lg">+</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? "No devices found matching your search." : "No devices found in this organization."}
            </p>
          </div>
        )}
      </div>
      </div>  
    </div>
  )
}

export default OrganizationDetailContent
