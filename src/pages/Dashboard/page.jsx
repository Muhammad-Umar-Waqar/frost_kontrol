// "use client"
// import { useState, useEffect } from "react"
// import FreezerDeviceCard from "./FreezerDeviceCard"
// import MaintenanceList from "./MaintenanceList"
// import BatteryAlert from "./BatteryAlert"
// import OrganizationDetailContent from "./organization-detail-page"
// // TODO: Backend developer will add API services here
// import VenueDetailsPanel from "./VenueDetailsPanel"
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css" 

// const chartData = [
//   { name: "05", hours: 70, energy: 30 },
//   { name: "06", hours: 50, energy: 40 },
//   { name: "07", hours: 80, energy: 60 },
//   { name: "08", hours: 60, energy: 50 },
//   { name: "09", hours: 90, energy: 70 },
//   { name: "10", hours: 75, energy: 55 },
//   { name: "11", hours: 85, energy: 65 },
// ]

// // Mock freezer device data based on the target image
// const mockFreezerDevices = [
//   {
//     id: 1,
//     deviceId: "KCL023",
//     ambientTemperature: 28,
//     freezerTemperature: -4,
//     batteryLow: true,
//   },
//   {
//     id: 2,
//     deviceId: "KCL023",
//     ambientTemperature: 25,
//     freezerTemperature: -8,
//     batteryLow: false,
//   },
//   {
//     id: 3,
//     deviceId: "KCL023",
//     ambientTemperature: 28,
//     freezerTemperature: -4,
//     batteryLow: true,
//   },
//   {
//     id: 4,
//     deviceId: "KCL023",
//     ambientTemperature: 25,
//     freezerTemperature: -3,
//     batteryLow: false,
//   },
//   {
//     id: 5,
//     deviceId: "KCL023",
//     ambientTemperature: 30,
//     freezerTemperature: -6,
//     batteryLow: true,
//   },
//   {
//     id: 6,
//     deviceId: "KCL023",
//     ambientTemperature: 26,
//     freezerTemperature: -3,
//     batteryLow: false,
//   },
//   {
//     id: 7,
//     deviceId: "KCL023",
//     ambientTemperature: 27,
//     freezerTemperature: -5,
//     batteryLow: true,
//   },
//   {
//     id: 8,
//     deviceId: "KCL023",
//     ambientTemperature: 24,
//     freezerTemperature: -7,
//     batteryLow: false,
//   },
//   {
//     id: 9,
//     deviceId: "KCL023",
//     ambientTemperature: 29,
//     freezerTemperature: -2,
//     batteryLow: true,
//   },
//   {
//     id: 10,
//     deviceId: "KCL023",
//     ambientTemperature: 23,
//     freezerTemperature: -9,
//     batteryLow: false,
//   },
// ]
// export default function Dashboard() {
//   const [organizations, setOrganizations] = useState([])
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices)
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedOrganizationId, setSelectedOrganizationId] = useState("")
//   const [selectedOrganizationData, setSelectedOrganizationData] = useState(null)
//   const [showDetailPage, setShowDetailPage] = useState(false)
//   const [selectedDevice, setSelectedDevice] = useState(null)
//   // TODO: Backend developer will add WebSocket connection here
//   const [connectionStatus, setConnectionStatus] = useState("disconnected")
//   const [bulkLockProcessing, setBulkLockProcessing] = useState({})
//   const [lockErrors, setLockErrors] = useState({})
//   const [organizationLockStates, setOrganizationLockStates] = useState({})
//   const [organizationTemperatures, setOrganizationTemperatures] = useState({})
//   const [temperatureProcessing, setTemperatureProcessing] = useState({})
//   const [temperatureErrors, setTemperatureErrors] = useState({})
//   const [organizationPowerStates, setOrganizationPowerStates] = useState({})
//   const [powerProcessing, setPowerProcessing] = useState({})
//   const [powerErrors, setPowerErrors] = useState({})
//   const [faultAlerts, setFaultAlerts] = useState([])
//   const [organizationFaultSummaries, setOrganizationFaultSummaries] = useState({})
//   const [deviceFaultStates, setDeviceFaultStates] = useState({})
//   const [maintenanceItems, setMaintenanceItems] = useState([
//     {
//       id: 1,
//       name: "SSUET BLK-AFth",
//       devices: 18,
//       nestedItems: [
//         { id: 1.1, name: "SSUET BLK-AFth1", date: "21 May 2025" },
//         { id: 1.2, name: "SSUET BLK-AFth2", date: "13 May 2025" }
//       ]
//     },
//     {
//       id: 2,
//       name: "SSUET BLK-AS",
//       devices: 5,
//       nestedItems: [
//         { id: 2.1, name: "SSUET BLK-AS1", date: "15 May 2025" },
//         { id: 2.2, name: "SSUET BLK-AS2", date: "22 May 2025" }
//       ]
//     },
//     {
//       id: 3,
//       name: "SSUET BLK-AT",
//       devices: 12,
//       nestedItems: [
//         { id: 3.1, name: "SSUET BLK-AT1", date: "18 May 2025" }
//       ]
//     },
//     {
//       id: 4,
//       name: "SSUET BLK-AF",
//       devices: 2,
//       nestedItems: [
//         { id: 4.1, name: "SSUET BLK-AF1", date: "21 May 2025" },
//         { id: 4.2, name: "SSUET BLK-AF2", date: "13 May 2025" }
//       ]
//     },
//     {
//       id: 5,
//       name: "SSUET BLK-BS",
//       devices: 8,
//       nestedItems: [
//         { id: 5.1, name: "SSUET BLK-BS1", date: "25 May 2025" },
//         { id: 5.2, name: "SSUET BLK-BS2", date: "30 May 2025" }
//       ]
//     },
//     {
//       id: 6,
//       name: "SSUET BLK-CF",
//       devices: 15,
//       nestedItems: [
//         { id: 6.1, name: "SSUET BLK-CF1", date: "12 May 2025" }
//       ]
//     }
//   ])
//   const [deviceTemperatureProcessing, setDeviceTemperatureProcessing] = useState({})
//   const [deviceTemperatureErrors, setDeviceTemperatureErrors] = useState({})
//   const [devicePowerProcessing, setDevicePowerProcessing] = useState({})
//   const [devicePowerErrors, setDevicePowerErrors] = useState({})
//   const [deviceLockProcessing, setDeviceLockProcessing] = useState({})
//   const [deviceLockErrors, setDeviceLockErrors] = useState({})
//   // TODO: Backend developer will implement WebSocket connection
//   // useEffect(() => {
//   //   const setupWebSocket = async () => {
//   //     const connected = await websocket.connect()
//   //     setConnectionStatus(connected ? "connected" : "disconnected")
//   //   }
//   //   setupWebSocket()
//   // }, [websocket])
//   // TODO: Backend developer will implement WebSocket fault alert listener
//   // useEffect(() => {
//   //   const handleDeviceFaultAlert = (data) => {
//   //     console.log("🚨 Device fault alert received:", data)
//   //     const faultAlert = {
//   //       ...data,
//   //       timestamp: new Date().toISOString(),
//   //       organizationId: findDeviceOrganization(data.deviceId),
//   //     }
//   //     setFaultAlerts((prev) => [...prev, faultAlert].slice(-50))
//   //     setDeviceFaultStates((prev) => ({
//   //       ...prev,
//   //       [data.deviceId]: {
//   //         fault: data.fault,
//   //         alert: data.alert,
//   //         faultCount: data.faultCount || 0,
//   //         lastUpdate: new Date().toISOString(),
//   //       },
//   //     }))
//   //     updateOrganizationFaultSummaries()
//   //   }
//   //   // TODO: Backend developer will add WebSocket listeners
//   //   websocket.on("deviceFaultAlert", handleDeviceFaultAlert)
//   //   return () => {
//   //     websocket.off("deviceFaultAlert", handleDeviceFaultAlert)
//   //   }
//   // }, [organizations, websocket, updateOrganizationFaultSummaries])
//   useEffect(() => {
//     if (organizations.length > 0) {
//       updateOrganizationFaultSummaries()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [organizations, deviceFaultStates, faultAlerts])
//   const getAllDevicesInOrganization = (org) => {
//     let devices = [...(org.devices || [])]
//     if (org.subOrganizations) {
//       org.subOrganizations.forEach((subOrg) => {
//         devices = devices.concat(getAllDevicesInOrganization(subOrg))
//       })
//     }
//     return devices
//   }
//   const findOrganizationById = (orgs, id) => {
//     for (const org of orgs) {
//       if (org.id === id) return org
//       if (org.subOrganizations) {
//         const found = findOrganizationById(org.subOrganizations, id)
//         if (found) return found
//       }
//     }
//     return null
//   }
//   const findDeviceOrganization = (deviceId) => {
//     for (const org of organizations) {
//       const allDevices = getAllDevicesInOrganization(org)
//       if (allDevices.some((device) => device.id === deviceId)) {
//         return org.id
//       }
//     }
//     return null
//   }
//   const updateOrganizationFaultSummaries = () => {
//     const summaries = {}
//     organizations.forEach((org) => {
//       const allDevices = getAllDevicesInOrganization(org)
//       const faultyDevices = allDevices.filter((device) => deviceFaultStates[device.id]?.fault === true)
//       const orgFaults = faultAlerts.filter((alert) => alert.organizationId === org.id && alert.fault === true)
//       const lastFaultTime = orgFaults.length > 0 ? orgFaults[orgFaults.length - 1].timestamp : null
//       summaries[org.id] = {
//         organizationId: org.id,
//         organizationName: org.name,
//         totalDevices: allDevices.length,
//         faultyDevices: faultyDevices.length,
//         faultDevicesList: faultyDevices.map((d) => d.id),
//         lastFaultTime: lastFaultTime,
//         maintenanceRequired: faultyDevices.length > 0,
//       }
//     })
//     setOrganizationFaultSummaries(summaries)
//     const maintenanceData = organizations
//       .map((org) => summaries[org.id])
//       .filter((summary) => summary.maintenanceRequired)
//       .map((summary) => ({
//         id: summary.organizationId,
//         name: summary.organizationName,
//         devices: summary.faultyDevices,
//         date: summary.lastFaultTime ? new Date(summary.lastFaultTime).toLocaleDateString() : "",
//         nestedItems: summary.faultDevicesList.map((deviceId) => ({
//           id: deviceId,
//           name: deviceId,
//           date: summary.lastFaultTime ? new Date(summary.lastFaultTime).toLocaleDateString() : "",
//         })),
//       }))
//     // setMaintenanceItems(maintenanceData) // Commented out to show dummy data
//   }
//   const transformHierarchicalOrg = (backendOrg) => {
//     return {
//       id: backendOrg.organization_name,
//       name: backendOrg.organization_name,
//       type: backendOrg.organization_type || "main",
//       devices: (backendOrg.devices || []).map((device) => ({
//         id: device.device_id,
//         name: device.device_id,
//         type: "air_conditioner",
//         brand: device.device_brand || "unknown",
//         status: "online",
//       })),
//       subOrganizations: (backendOrg.children || []).map((child) => transformHierarchicalOrg(child)),
//       parentId: backendOrg.parent_organization_name,
//     }
//   }
//   const handleDeviceSelect = (device) => {
//     setSelectedDevice(device)
//   }
//   const handleDeviceTemperatureChange = async (deviceId, newTemperature) => {
//     console.log(`🌡️ Individual device temperature change: ${deviceId} -> ${newTemperature}°C`)
//     if (connectionStatus !== "connected") {
//       setDeviceTemperatureErrors((prev) => ({
//         ...prev,
//         [deviceId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const controlName = `temp_${newTemperature}`
//     const commandValue = newTemperature
//     setDeviceTemperatureProcessing((prev) => ({ ...prev, [deviceId]: true }))
//     setDeviceTemperatureErrors((prev) => ({ ...prev, [deviceId]: null }))
//     try {
//       console.log(
//         `Sending individual device temperature command: ${controlName} with value ${commandValue} to device ${deviceId}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(...)
//       const result = { success: false, error: 'Not implemented' }
//       if (result && result.success && result.brandResults) {
//         if (selectedDevice && selectedDevice.id === deviceId) {
//           setSelectedDevice((prev) => ({
//             ...prev,
//             temperature: newTemperature,
//           }))
//         }
//         console.log(`✅ Device temperature command successful for ${deviceId}: ${newTemperature}°C`)
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Device temperature command failed for ${deviceId}:`, error)
//       setDeviceTemperatureErrors((prev) => ({
//         ...prev,
//         [deviceId]: error.message || "Failed to set temperature",
//       }))
//     } finally {
//       setDeviceTemperatureProcessing((prev) => ({ ...prev, [deviceId]: false }))
//     }
//   }
//   const handleDevicePowerToggle = async (deviceId) => {
//     console.log(`⚡ Individual device power toggle: ${deviceId}`)
//     if (connectionStatus !== "connected") {
//       setDevicePowerErrors((prev) => ({
//         ...prev,
//         [deviceId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const currentPowerState = selectedDevice?.isOn ? "ON" : "OFF"
//     const newPowerState = currentPowerState === "ON" ? "OFF" : "ON"
//     const powerStateMap = {
//       ON: { controlName: "power_on", value: "on" },
//       OFF: { controlName: "power_off", value: "off" },
//     }
//     const { controlName, value } = powerStateMap[newPowerState]
//     setDevicePowerProcessing((prev) => ({ ...prev, [deviceId]: true }))
//     setDevicePowerErrors((prev) => ({ ...prev, [deviceId]: null }))
//     try {
//       console.log(
//         `Sending individual device power command: ${controlName} with value "${value}" to device ${deviceId}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(...)
//       const result = { success: false, error: 'Not implemented' }
//       if (result && result.success && result.brandResults) {
//         if (selectedDevice && selectedDevice.id === deviceId) {
//           setSelectedDevice((prev) => ({
//             ...prev,
//             isOn: newPowerState === "ON",
//           }))
//         }
//         console.log(`✅ Device power command successful for ${deviceId}: ${newPowerState}`)
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Device power command failed for ${deviceId}:`, error)
//       setDevicePowerErrors((prev) => ({
//         ...prev,
//         [deviceId]: error.message || "Failed to change power state",
//       }))
//     } finally {
//       setDevicePowerProcessing((prev) => ({ ...prev, [deviceId]: false }))
//     }
//   }
//   const handleDeviceLockToggle = async (deviceId) => {
//     console.log(`🔒 Individual device lock toggle: ${deviceId}`)
//     const currentLockState = selectedDevice?.isLocked ? "locked" : "unlocked"
//     const newLockState = currentLockState === "locked" ? "unlocked" : "locked"
//     setDeviceLockProcessing((prev) => ({ ...prev, [deviceId]: true }))
//     setDeviceLockErrors((prev) => ({ ...prev, [deviceId]: null }))
//     try {
//       console.log(`Setting lock state for device ${deviceId} to ${newLockState}...`)
//       // TODO: Backend developer will implement lock service call
//       // const result = await lockService.setLockState(deviceId, newLockState)
//       const result = { success: false, error: 'Not implemented' }
//       if (selectedDevice && selectedDevice.id === deviceId) {
//         setSelectedDevice((prev) => ({
//           ...prev,
//           isLocked: newLockState === "locked",
//         }))
//       }
//       console.log(`✅ Device lock command successful for ${deviceId}: ${newLockState}`)
//     } catch (error) {
//       console.error(`  Device lock command failed for ${deviceId}:`, error)
//       setDeviceLockErrors((prev) => ({
//         ...prev,
//         [deviceId]: error.message || "Failed to set lock state",
//       }))
//     } finally {
//       setDeviceLockProcessing((prev) => ({ ...prev, [deviceId]: false }))
//     }
//   }
//   const getOrganizationCardProps = (org) => {
//     const allDevices = getAllDevicesInOrganization(org)
//     const currentLockState = organizationLockStates[org.id] || "Unlocked"
//     const currentTemperature = organizationTemperatures[org.id] || 24
//     const currentPowerState = organizationPowerStates[org.id] || "OFF"
//     const faultSummary = organizationFaultSummaries[org.id]
//     const realFaultDevices = faultSummary ? faultSummary.faultyDevices : 0
//     return {
//       organizationName: org.name,
//       status: currentPowerState,
//       energy: (Math.random() * 20 + 5).toFixed(2),
//       isLocked: currentLockState !== "Unlocked",
//       lockState: currentLockState,
//       deviceCount: allDevices.length,
//       faultDevices: realFaultDevices,
//       isLockProcessing: bulkLockProcessing[org.id] || false,
//       lockError: lockErrors[org.id] || null,
//       currentTemperature: currentTemperature,
//       isTemperatureProcessing: temperatureProcessing[org.id] || false,
//       temperatureError: temperatureErrors[org.id] || null,
//       powerState: currentPowerState,
//       isPowerProcessing: powerProcessing[org.id] || false,
//       powerError: powerErrors[org.id] || null,
//     }
//   }
//   const handleOrganizationTemperatureChange = async (organizationId, newTemperature) => {
//     console.log(`🌡️ Temperature change: ${organizationId} -> ${newTemperature}°C`)
//     if (connectionStatus !== "connected") {
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const selectedOrg = findOrganizationById(organizations, organizationId)
//     if (!selectedOrg) {
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Organization not found",
//       }))
//       return
//     }
//     const allDevices = getAllDevicesInOrganization(selectedOrg)
//     const deviceIds = allDevices.map((device) => device.id)
//     if (deviceIds.length === 0) {
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: "No devices found in organization",
//       }))
//       return
//     }
//     const controlName = `temp_${newTemperature}`
//     const commandValue = newTemperature
//     setTemperatureProcessing((prev) => ({ ...prev, [organizationId]: true }))
//     setTemperatureErrors((prev) => ({ ...prev, [organizationId]: null }))
//     const startTime = performance.now()
//     try {
//       console.log(
//         `Sending temperature command: ${controlName} with value ${commandValue} to ${deviceIds.length} devices in ${selectedOrg.name}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(...)
//       const result = { success: false, error: 'Not implemented' }
//       const endTime = performance.now()
//       const timeTaken = endTime - startTime
//       console.log(`Temperature command completed in ${timeTaken.toFixed(2)}ms`)
//       console.log("Temperature command result:", result)
//       if (result && result.success && result.brandResults) {
//         setOrganizationTemperatures((prev) => ({
//           ...prev,
//           [organizationId]: newTemperature,
//         }))
//         const totalSuccess =
//           result.brandResults?.reduce((acc, brandResult) => {
//             const results = brandResult?.result?.results
//             if (Array.isArray(results)) {
//               return acc + results.filter((r) => r?.success).length
//             }
//             return acc
//           }, 0) || 0
//         console.log(
//           `✅ Temperature command successful for ${selectedOrg.name}: ${totalSuccess}/${result.totalDevices} devices updated`,
//         )
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Temperature command failed for ${selectedOrg.name}:`, error)
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: error.message || "Failed to set temperature",
//       }))
//     } finally {
//       setTemperatureProcessing((prev) => ({ ...prev, [organizationId]: false }))
//     }
//   }
//   const handleOrganizationBulkLock = async (organizationId, lockState) => {
//     console.log(`🔒 Bulk lock operation: ${organizationId} -> ${lockState}`)
//     const selectedOrg = findOrganizationById(organizations, organizationId)
//     if (!selectedOrg) {
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Organization not found",
//       }))
//       return
//     }
//     const deviceIds = getAllDevicesInOrganization(selectedOrg).map((d) => d.id)
//     if (deviceIds.length === 0) {
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: "No devices found in organization",
//       }))
//       return
//     }
//     const apiLockStateMap = {
//       Unlocked: "unlocked",
//       Locked: "locked",
//       "Super Locked": "super_lock",
//       "Admin lock": "super_lock",
//     }
//     const apiLockState = apiLockStateMap[lockState]
//     if (!apiLockState) {
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Invalid lock state",
//       }))
//       return
//     }
//     setBulkLockProcessing((prev) => ({ ...prev, [organizationId]: true }))
//     setLockErrors((prev) => ({ ...prev, [organizationId]: null }))
//     try {
//       // TODO: Backend developer will implement bulk lock service call
//       // const result = await lockService.bulkSetLockState(deviceIds, apiLockState)
//       const result = { success: false, error: 'Not implemented' }
//       setOrganizationLockStates((prev) => ({
//         ...prev,
//         [organizationId]: lockState,
//       }))
//       console.log(`✅ Bulk lock successful for ${selectedOrg.name}:`, result)
//     } catch (error) {
//       console.error(`  Bulk lock failed for ${selectedOrg.name}:`, error)
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: error.message || "Failed to perform bulk lock operation",
//       }))
//     } finally {
//       setBulkLockProcessing((prev) => ({ ...prev, [organizationId]: false }))
//     }
//   }
//   const handleOrganizationPowerChange = async (organizationId, newPowerState) => {
//     console.log(`⚡ Power change: ${organizationId} -> ${newPowerState}`)
//     if (connectionStatus !== "connected") {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const selectedOrg = findOrganizationById(organizations, organizationId)
//     if (!selectedOrg) {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Organization not found",
//       }))
//       return
//     }
//     const allDevices = getAllDevicesInOrganization(selectedOrg)
//     const deviceIds = allDevices.map((device) => device.id)
//     if (deviceIds.length === 0) {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "No devices found in organization",
//       }))
//       return
//     }
//     const powerStateMap = {
//       ON: { controlName: "power_on", value: "on" },
//       OFF: { controlName: "power_off", value: "off" },
//     }
//     const { controlName, value } = powerStateMap[newPowerState]
//     if (!controlName) {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Invalid power state",
//       }))
//       return
//     }
//     setPowerProcessing((prev) => ({ ...prev, [organizationId]: true }))
//     setPowerErrors((prev) => ({ ...prev, [organizationId]: null }))
//     const startTime = performance.now()
//     try {
//       console.log(
//         `Sending power command: ${controlName} with value "${value}" to ${deviceIds.length} devices in ${selectedOrg.name}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(deviceIds, controlName, value, organizationId)
//       const result = { success: false, error: 'Not implemented' }
//       const endTime = performance.now()
//       const timeTaken = endTime - startTime
//       console.log(`Power command completed in ${timeTaken.toFixed(2)}ms`)
//       console.log("Power command result:", result)
//       if (result && result.success && result.brandResults) {
//         setOrganizationPowerStates((prev) => ({
//           ...prev,
//           [organizationId]: newPowerState,
//         }))
//         const totalSuccess =
//           result.brandResults?.reduce((acc, brandResult) => {
//             const results = brandResult?.result?.results
//             if (Array.isArray(results)) {
//               return acc + results.filter((r) => r?.success).length
//             }
//             return acc
//           }, 0) || 0
//         console.log(
//           `✅ Power command successful for ${selectedOrg.name}: ${totalSuccess}/${result.totalDevices} devices updated to ${newPowerState}`,
//         )
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Power command failed for ${selectedOrg.name}:`, error)
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: error.message || "Failed to change power state",
//       }))
//     } finally {
//       setPowerProcessing((prev) => ({ ...prev, [organizationId]: false }))
//     }
//   }
//   // TODO: Backend developer will implement organization fetching
//   const fetchOrganizations = async () => {
//     setLoading(true)
//     // Static placeholder data - Backend developer should replace with API call
//     // Example:
//     // const response = await fetch('YOUR_API_URL/organization/fetch/hierarchical', {
//     //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//     // });
//     // const data = await response.json();
    
//     // Static mock data for UI preview
//     const mockOrgs = []
//     setOrganizations(mockOrgs)
//     setLoading(false)
//   }
//   useEffect(() => {
//     fetchOrganizations()
//   }, [])
//   useEffect(() => {
//     if (selectedOrganizationId && organizations.length > 0) {
//       const org = findOrganizationById(organizations, selectedOrganizationId)
//       if (org) {
//         setSelectedOrganizationData(getOrganizationCardProps(org))
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     selectedOrganizationId,
//     organizations,
//     organizationLockStates,
//     bulkLockProcessing,
//     lockErrors,
//     organizationTemperatures,
//     temperatureProcessing,
//     temperatureErrors,
//     organizationPowerStates,
//     powerProcessing,
//     powerErrors,
//   ])
//   if (loading) {
//     return (
//       <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
//         <div className="flex justify-center items-center w-full h-64">
//           <div className="text-lg text-gray-600">Loading organizations...</div>
//         </div>
//       </div>
//     )
//   }
//   if (error) {
//     return (
//       <div className="flex w-full flex-col lg:flex-row h-full bg-gray-100  font-inter rounded-md overflow-hidden">
//         <div className="flex flex-col justify-center items-center w-full h-64 space-y-4">
//           <div className="text-lg text-red-600">Error: {error}</div>
//           {error === 'Authentication required. Please login.' ? (
//             <div className="text-sm text-gray-600 text-center px-4">
//               <p>You need to login first. Please go to the login page.</p>
//             </div>
//           ) : (
//             <>
//               <div className="text-sm text-gray-600 text-center px-4 max-w-lg">
//                 <p className="mb-2">{error}</p>
//                 {error.includes('Cannot connect to backend') && (
//                   <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
//                     <p className="font-semibold mb-1">Troubleshooting:</p>
//                     <ul className="text-left list-disc list-inside space-y-1 text-xs">
//                       <li>Make sure your backend server is running</li>
//                       <li>Check if the backend URL is correct: <code className="bg-gray-100 px-1">{import.meta.env.VITE_BACKEND_API || 'http://localhost:3001'}</code></li>
//                       <li>If you changed .env file, restart your dev server (npm run dev)</li>
//                     </ul>
//                   </div>
//                 )}
//                 {error.includes('API endpoint not found') && (
//                   <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
//                     <p className="text-xs">The endpoint <code className="bg-gray-100 px-1">/organization/fetch/hierarchical</code> might not exist on your backend.</p>
//                   </div>
//                 )}
//               </div>
//               <button onClick={fetchOrganizations} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2">
//                 Retry
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     )
//   }
//   const handleFreezerDeviceSelect = (deviceId) => {
//     setSelectedFreezerDeviceId(deviceId)
//   }
//   const handleBackToDashboard = () => {
//     setShowDetailPage(false)
//     setSelectedDevice(null)
//   }
//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       {/* Main Content Area */}
//       <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">
//         {!showDetailPage && (
//           <>
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <p className="text-sm text-[#64748B] font-medium">Organization</p>
                
//                 <h1 className="text-2xl text-[#1E293B] font-bold">
//                   {(selectedOrganizationData?.organizationName || "Karim Containers LTD").replace("SSUET_MAIN", "Karim Containers LTD")}
//                 </h1>
//               </div>
//               <div className="flex items-center">
//                 <button className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1D4ED8] transition-colors">
//                   <span>Venue</span>
//                   <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="m6 9 6 6 6-6"/>
//                     </svg>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Freezer Device Cards Grid with Fixed Height and Scroll */}
//             <div className="flex-1 min-h-0">
//               <div className="freezer-cards-container custom-scrollbar">
//                 {freezerDevices.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                     <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                     <p className="text-lg font-medium">No Freezer Devices Found</p>
//                     <p className="text-sm">Add some freezer devices to get started</p>
//                   </div>
//                 ) : (
//                   <div className="freezer-cards-grid freezer-cards-container">
//                     {freezerDevices.map((device) => (
//                       <FreezerDeviceCard
//                         key={device.id}
//                         deviceId={device.deviceId}
//                         ambientTemperature={device.ambientTemperature}
//                         freezerTemperature={device.freezerTemperature}
//                         batteryLow={device.batteryLow}
//                         onCardSelect={() => handleFreezerDeviceSelect(device.id)}
//                         isSelected={device.id === selectedFreezerDeviceId}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Bottom Section: Refrigerator Alert and Battery Alert - Fixed Height */}
//             <div className="flex-shrink-0">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Refrigerator Alert Section */}
//                 <div className="p-4" style={{backgroundColor: '#07518D12', borderRadius: '20px'}}>
//                   <MaintenanceList items={maintenanceItems} />
//                 </div>
                
//                 {/* Battery Alert Section */}
//                 <div className="p-4" style={{backgroundColor: '#07518D12', borderRadius: '20px'}}>
//                   <BatteryAlert items={maintenanceItems} />
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
        
//         {showDetailPage && (
//           <OrganizationDetailContent
//             className="flex-grow overflow-y-auto"
//             organizationId={selectedOrganizationId}
//             organizationName={selectedOrganizationData?.organizationName || ""}
//             onBack={handleBackToDashboard}
//             organizations={organizations}
//             websocket={null}
//             connectionStatus={connectionStatus}
//             onDeviceTemperatureChange={handleOrganizationTemperatureChange}
//             onDevicePowerChange={handleOrganizationPowerChange}
//             onDeviceSelect={handleDeviceSelect}
//           />
//         )}
//       </div>

//       {/* Right Sidebar - Venue Details Panel */}
//       <div className="dashboard-right-panel shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar p-4 lg:p-6 border-l border-[#E5E7EB]/40 bg-white flex-shrink-0">
//         {selectedFreezerDeviceId ? (
//           // Show venue details for selected device
//           (() => {
//             const selectedDevice = freezerDevices.find(d => d.id === selectedFreezerDeviceId)
//             return (
//               <VenueDetailsPanel
//                 venueName="Karim Korangi Branch"
//                 freezerTemperature={selectedDevice?.freezerTemperature || -4}
//                 ambientTemperature={selectedDevice?.ambientTemperature || 25}
//                 batteryLow={selectedDevice?.batteryLow || false}
//                 needMaintenance={selectedDevice?.batteryLow || false}
//                 apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
//                 chartData={chartData.map(item => ({ date: item.name, value: item.energy }))}
//               />
//             )
//           })()
//         ) : (
//           // Show default venue details if no device is selected
//           <VenueDetailsPanel
//             venueName="Karim Korangi Branch"
//             freezerTemperature={-4}
//             ambientTemperature={25}
//             batteryLow={true}
//             needMaintenance={true}
//             apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
//             chartData={chartData.map(item => ({ date: item.name, value: item.energy }))}
//           />
//         )}
//       </div>
//     </div>
//   )
// }






























// // src/pages/dashboard/Dashboard.jsx
// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrganizations } from "../../slices/OrganizationSlice";
// import { fetchAllDevices } from "../../slices/DeviceSlice";
// import Swal from "sweetalert2";
// import "../../styles/pages/management-pages.css";

// const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
// const getToken = () => localStorage.getItem("token");

// const Dashboard = () => {
//   const dispatch = useDispatch();

//   // global slices
//   const { Organizations = [], isLoading: orgLoading } = useSelector((s) => s.Organization || {});
//   const { DeviceArray = [], isLoading: devicesLoading } = useSelector((s) => s.Device || {});

//   // local UI state
//   const [selectedOrgId, setSelectedOrgId] = useState("");
//   const [venues, setVenues] = useState([]);
//   const [venuesLoading, setVenuesLoading] = useState(false);
//   const [venuesError, setVenuesError] = useState(null);
//   const [selectedVenueId, setSelectedVenueId] = useState("");

//   // --- load orgs and devices on mount
//   useEffect(() => {
//     dispatch(fetchAllOrganizations());
//     dispatch(fetchAllDevices());
//   }, [dispatch]);

//   // --- when organizations arrive, default-select first organization
//   useEffect(() => {
//     if (!selectedOrgId && Organizations && Organizations.length > 0) {
//       const firstOrg = Organizations[0];
//       setSelectedOrgId(String(firstOrg._id ?? firstOrg.id ?? firstOrg));
//     }
//   }, [Organizations, selectedOrgId]);

//   // fetch venues for an organization
//   const fetchVenuesByOrg = async (orgId) => {
//     if (!orgId) {
//       setVenues([]);
//       setSelectedVenueId("");
//       return;
//     }
//     try {
//       setVenuesLoading(true);
//       setVenuesError(null);
//       const token = getToken();
//       const res = await fetch(`${BASE}/venue/venue-by-org/${orgId}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       const data = await res.json();
//       console.log("ARR:>>", data);

//       if (!res.ok) {
//         const message = data?.message || "Failed to fetch venues for organization";
//         setVenues([]);
//         setSelectedVenueId("");
//         setVenuesError(message);
//         return;
//       }

//       // backend should return array of venues
//       const arr = Array.isArray(data?.venues) ? data.venues : [];
//       console.log("ARRRRR>", arr)
//       setVenues(arr);

//       // default-select first venue if none selected
//       if (arr.length > 0) {
//         setSelectedVenueId(String(arr[0]._id ?? arr[0].id ?? arr[0]));
//       } else {
//         setSelectedVenueId("");
//       }
//     } catch (err) {
//       console.error("fetchVenuesByOrg error:", err);
//       setVenues([]);
//       setSelectedVenueId("");
//       setVenuesError(err?.message || "Network error");
//     } finally {
//       setVenuesLoading(false);
//     }
//   };

//   // whenever selectedOrgId changes, fetch venues
//   useEffect(() => {
//     if (selectedOrgId) fetchVenuesByOrg(selectedOrgId);
//     else {
//       setVenues([]);
//       setSelectedVenueId("");
//     }
//   }, [selectedOrgId]);

//   // derive filtered devices for selected venue
//   // device.venue may be object or id; handle both
//   const filteredDevices = useMemo(() => {
//     if (!selectedVenueId) return [];
//     return (DeviceArray || []).filter((d) => {
//       // venue can be populated object or just id
//       const v = d?.venue;
//       if (!v) return false;
//       const vid = String(v._id ?? v.id ?? v);
//       return vid === String(selectedVenueId);
//     });
//   }, [DeviceArray, selectedVenueId]);

//   // UI helpers
//   const onOrgChange = (e) => {
//     setSelectedOrgId(e.target.value);
//     // selectedVenueId will be set by fetchVenuesByOrg's default behavior
//   };

//   const onVenueChange = (e) => {
//     setSelectedVenueId(e.target.value);
//   };

//   // small helper to show messages if no orgs/venues present
//   useEffect(() => {
//     if (!orgLoading && Organizations?.length === 0) {
//       // Not necessarily an error; but show friendly hint once after load
//       // (commented out — uncomment if you want an alert)
//       // Swal.fire("No organizations", "You don't have any organizations yet.", "info");
//     }
//   }, [orgLoading, Organizations]);

//   return (
//     <div className="p-4">
//       <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E7EB]">
//         <h2 className="text-xl font-semibold mb-3">Dashboard</h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           {/* Organization select */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
//             <select
//               value={selectedOrgId}
//               onChange={onOrgChange}
//               className="w-full rounded-md border px-3 py-2"
//             >
//               <option value="">Select organization</option>
//               {Organizations.map((org) => (
//                 <option key={org._id ?? org.id} value={String(org._id ?? org.id)}>
//                   {org.name ?? org.organization_name ?? org._id}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Venue select */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
//             <select
//               value={selectedVenueId}
//               onChange={onVenueChange}
//               className="w-full rounded-md border px-3 py-2"
//             >
//               <option value="">{venuesLoading ? "Loading venues..." : "Select venue"}</option>
//               {venues.map((v) => (
//                 <option key={v._id ?? v.id} value={String(v._id ?? v.id)}>
//                   {v.name ?? v.venue_name ?? v._id}
//                 </option>
//               ))}
//             </select>
//             {venuesError && <div className="text-xs text-red-600 mt-1">{venuesError}</div>}
//           </div>

//           {/* Quick stats */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
//             <div className="rounded-md border px-3 py-2 bg-gray-50">
//               <div className="text-sm">Organizations: <strong>{Organizations.length}</strong></div>
//               <div className="text-sm">Venues (selected org): <strong>{venues.length}</strong></div>
//               <div className="text-sm">Devices (selected venue): <strong>{filteredDevices.length}</strong></div>
//             </div>
//           </div>
//         </div>

//         {/* Devices list */}
//         <div className="mt-4">
//           <h3 className="text-md font-semibold mb-2">Devices</h3>

//           {devicesLoading ? (
//             <div className="p-4 text-center">Loading devices...</div>
//           ) : !selectedVenueId ? (
//             <div className="p-4 text-center text-gray-600">Select an organization and venue to view devices.</div>
//           ) : filteredDevices.length === 0 ? (
//             <div className="p-4 text-center text-gray-600">No devices found for this venue.</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full table-auto text-left">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="py-2 px-4 font-bold">#</th>
//                     <th className="py-2 px-4 font-bold">Device ID</th>
//                     <th className="py-2 px-4 font-bold">API Key</th>
//                     <th className="py-2 px-4 font-bold">Conditions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredDevices.map((d, i) => (
//                     <tr key={d._id ?? i} className="border-b">
//                       <td className="py-2 px-4">{i + 1}</td>
//                       <td className="py-2 px-4 font-medium">{d.deviceId}</td>
//                       <td className="py-2 px-4 break-words text-xs">{d.apiKey ?? "—"}</td>
//                       <td className="py-2 px-4 text-sm">
//                         {(d.conditions || []).map((c, idx) => (
//                           <div key={idx}>{c.type} {c.operator} {c.value}</div>
//                         ))}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
































// "use client"
// import { useState, useEffect } from "react"
// import FreezerDeviceCard from "./FreezerDeviceCard"
// import MaintenanceList from "./MaintenanceList"
// import BatteryAlert from "./BatteryAlert"
// import OrganizationDetailContent from "./organization-detail-page"
// // TODO: Backend developer will add API services here
// import VenueDetailsPanel from "./VenueDetailsPanel"
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css" 
// import OrganizatoinSelect from "./OrganizationSelect"
// import OrganizationSelect from "./OrganizationSelect"
// import VenueSelect from "./VenueSelect"
// import AlertsPanel from "./AlertsPanel"
// import { User } from "lucide-react"

// const chartData = [
//   { name: "05", hours: 70, energy: 30 },
//   { name: "06", hours: 50, energy: 40 },
//   { name: "07", hours: 80, energy: 60 },
//   { name: "08", hours: 60, energy: 50 },
//   { name: "09", hours: 90, energy: 70 },
//   { name: "10", hours: 75, energy: 55 },
//   { name: "11", hours: 85, energy: 65 },
// ]

// // Mock freezer device data based on the target image
// const mockFreezerDevices = [
//   {
//     id: 1,
//     deviceId: "KCL023",
//     ambientTemperature: 28,
//     freezerTemperature: -4,
//     batteryLow: true,
//   },
//   {
//     id: 2,
//     deviceId: "KCL023",
//     ambientTemperature: 25,
//     freezerTemperature: -8,
//     batteryLow: false,
//   },
//   {
//     id: 3,
//     deviceId: "KCL023",
//     ambientTemperature: 28,
//     freezerTemperature: -4,
//     batteryLow: true,
//   },
//   {
//     id: 4,
//     deviceId: "KCL023",
//     ambientTemperature: 25,
//     freezerTemperature: -3,
//     batteryLow: false,
//   },
//   {
//     id: 5,
//     deviceId: "KCL023",
//     ambientTemperature: 30,
//     freezerTemperature: -6,
//     batteryLow: true,
//   },
//   {
//     id: 6,
//     deviceId: "KCL023",
//     ambientTemperature: 26,
//     freezerTemperature: -3,
//     batteryLow: false,
//   },
//   {
//     id: 7,
//     deviceId: "KCL023",
//     ambientTemperature: 27,
//     freezerTemperature: -5,
//     batteryLow: true,
//   },
//   {
//     id: 8,
//     deviceId: "KCL023",
//     ambientTemperature: 24,
//     freezerTemperature: -7,
//     batteryLow: false,
//   },
//   {
//     id: 9,
//     deviceId: "KCL023",
//     ambientTemperature: 29,
//     freezerTemperature: -2,
//     batteryLow: true,
//   },
//   {
//     id: 10,
//     deviceId: "KCL023",
//     ambientTemperature: 23,
//     freezerTemperature: -9,
//     batteryLow: false,
//   },
// ]
// export default function Dashboard() {
//   const [organizations, setOrganizations] = useState([])
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices)
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedOrganizationId, setSelectedOrganizationId] = useState("")
//   const [selectedOrganizationData, setSelectedOrganizationData] = useState(null)
//   const [showDetailPage, setShowDetailPage] = useState(false)
//   const [selectedDevice, setSelectedDevice] = useState(null)
//   // TODO: Backend developer will add WebSocket connection here
//   const [connectionStatus, setConnectionStatus] = useState("disconnected")
//   const [bulkLockProcessing, setBulkLockProcessing] = useState({})
//   const [lockErrors, setLockErrors] = useState({})
//   const [organizationLockStates, setOrganizationLockStates] = useState({})
//   const [organizationTemperatures, setOrganizationTemperatures] = useState({})
//   const [temperatureProcessing, setTemperatureProcessing] = useState({})
//   const [temperatureErrors, setTemperatureErrors] = useState({})
//   const [organizationPowerStates, setOrganizationPowerStates] = useState({})
//   const [powerProcessing, setPowerProcessing] = useState({})
//   const [powerErrors, setPowerErrors] = useState({})
//   const [faultAlerts, setFaultAlerts] = useState([])
//   const [organizationFaultSummaries, setOrganizationFaultSummaries] = useState({})
//   const [deviceFaultStates, setDeviceFaultStates] = useState({})
//   const [maintenanceItems, setMaintenanceItems] = useState([
//     {
//       id: 1,
//       name: "SSUET BLK-AFth",
//       devices: 18,
//       nestedItems: [
//         { id: 1.1, name: "SSUET BLK-AFth1", date: "21 May 2025" },
//         { id: 1.2, name: "SSUET BLK-AFth2", date: "13 May 2025" }
//       ]
//     },
//     {
//       id: 2,
//       name: "SSUET BLK-AS",
//       devices: 5,
//       nestedItems: [
//         { id: 2.1, name: "SSUET BLK-AS1", date: "15 May 2025" },
//         { id: 2.2, name: "SSUET BLK-AS2", date: "22 May 2025" }
//       ]
//     },
//     {
//       id: 3,
//       name: "SSUET BLK-AT",
//       devices: 12,
//       nestedItems: [
//         { id: 3.1, name: "SSUET BLK-AT1", date: "18 May 2025" }
//       ]
//     },
//     {
//       id: 4,
//       name: "SSUET BLK-AF",
//       devices: 2,
//       nestedItems: [
//         { id: 4.1, name: "SSUET BLK-AF1", date: "21 May 2025" },
//         { id: 4.2, name: "SSUET BLK-AF2", date: "13 May 2025" }
//       ]
//     },
//     {
//       id: 5,
//       name: "SSUET BLK-BS",
//       devices: 8,
//       nestedItems: [
//         { id: 5.1, name: "SSUET BLK-BS1", date: "25 May 2025" },
//         { id: 5.2, name: "SSUET BLK-BS2", date: "30 May 2025" }
//       ]
//     },
//     {
//       id: 6,
//       name: "SSUET BLK-CF",
//       devices: 15,
//       nestedItems: [
//         { id: 6.1, name: "SSUET BLK-CF1", date: "12 May 2025" }
//       ]
//     }
//   ])
//   const [deviceTemperatureProcessing, setDeviceTemperatureProcessing] = useState({})
//   const [deviceTemperatureErrors, setDeviceTemperatureErrors] = useState({})
//   const [devicePowerProcessing, setDevicePowerProcessing] = useState({})
//   const [devicePowerErrors, setDevicePowerErrors] = useState({})
//   const [deviceLockProcessing, setDeviceLockProcessing] = useState({})
//   const [deviceLockErrors, setDeviceLockErrors] = useState({})
//   // TODO: Backend developer will implement WebSocket connection
//   // useEffect(() => {
//   //   const setupWebSocket = async () => {
//   //     const connected = await websocket.connect()
//   //     setConnectionStatus(connected ? "connected" : "disconnected")
//   //   }
//   //   setupWebSocket()
//   // }, [websocket])
//   // TODO: Backend developer will implement WebSocket fault alert listener
//   // useEffect(() => {
//   //   const handleDeviceFaultAlert = (data) => {
//   //     console.log("🚨 Device fault alert received:", data)
//   //     const faultAlert = {
//   //       ...data,
//   //       timestamp: new Date().toISOString(),
//   //       organizationId: findDeviceOrganization(data.deviceId),
//   //     }
//   //     setFaultAlerts((prev) => [...prev, faultAlert].slice(-50))
//   //     setDeviceFaultStates((prev) => ({
//   //       ...prev,
//   //       [data.deviceId]: {
//   //         fault: data.fault,
//   //         alert: data.alert,
//   //         faultCount: data.faultCount || 0,
//   //         lastUpdate: new Date().toISOString(),
//   //       },
//   //     }))
//   //     updateOrganizationFaultSummaries()
//   //   }
//   //   // TODO: Backend developer will add WebSocket listeners
//   //   websocket.on("deviceFaultAlert", handleDeviceFaultAlert)
//   //   return () => {
//   //     websocket.off("deviceFaultAlert", handleDeviceFaultAlert)
//   //   }
//   // }, [organizations, websocket, updateOrganizationFaultSummaries])
//   useEffect(() => {
//     if (organizations.length > 0) {
//       updateOrganizationFaultSummaries()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [organizations, deviceFaultStates, faultAlerts])

//   const getAllDevicesInOrganization = (org) => {
//     let devices = [...(org.devices || [])]
//     if (org.subOrganizations) {
//       org.subOrganizations.forEach((subOrg) => {
//         devices = devices.concat(getAllDevicesInOrganization(subOrg))
//       })
//     }
//     return devices
//   }
  
//   const findOrganizationById = (orgs, id) => {
//     for (const org of orgs) {
//       if (org.id === id) return org
//       if (org.subOrganizations) {
//         const found = findOrganizationById(org.subOrganizations, id)
//         if (found) return found
//       }
//     }
//     return null
//   }
//   const findDeviceOrganization = (deviceId) => {
//     for (const org of organizations) {
//       const allDevices = getAllDevicesInOrganization(org)
//       if (allDevices.some((device) => device.id === deviceId)) {
//         return org.id
//       }
//     }
//     return null
//   }
//   const updateOrganizationFaultSummaries = () => {
//     const summaries = {}
//     organizations.forEach((org) => {
//       const allDevices = getAllDevicesInOrganization(org)
//       const faultyDevices = allDevices.filter((device) => deviceFaultStates[device.id]?.fault === true)
//       const orgFaults = faultAlerts.filter((alert) => alert.organizationId === org.id && alert.fault === true)
//       const lastFaultTime = orgFaults.length > 0 ? orgFaults[orgFaults.length - 1].timestamp : null
//       summaries[org.id] = {
//         organizationId: org.id,
//         organizationName: org.name,
//         totalDevices: allDevices.length,
//         faultyDevices: faultyDevices.length,
//         faultDevicesList: faultyDevices.map((d) => d.id),
//         lastFaultTime: lastFaultTime,
//         maintenanceRequired: faultyDevices.length > 0,
//       }
//     })
//     setOrganizationFaultSummaries(summaries)
//     const maintenanceData = organizations
//       .map((org) => summaries[org.id])
//       .filter((summary) => summary.maintenanceRequired)
//       .map((summary) => ({
//         id: summary.organizationId,
//         name: summary.organizationName,
//         devices: summary.faultyDevices,
//         date: summary.lastFaultTime ? new Date(summary.lastFaultTime).toLocaleDateString() : "",
//         nestedItems: summary.faultDevicesList.map((deviceId) => ({
//           id: deviceId,
//           name: deviceId,
//           date: summary.lastFaultTime ? new Date(summary.lastFaultTime).toLocaleDateString() : "",
//         })),
//       }))
//     // setMaintenanceItems(maintenanceData) // Commented out to show dummy data
//   }
//   const transformHierarchicalOrg = (backendOrg) => {
//     return {
//       id: backendOrg.organization_name,
//       name: backendOrg.organization_name,
//       type: backendOrg.organization_type || "main",
//       devices: (backendOrg.devices || []).map((device) => ({
//         id: device.device_id,
//         name: device.device_id,
//         type: "air_conditioner",
//         brand: device.device_brand || "unknown",
//         status: "online",
//       })),
//       subOrganizations: (backendOrg.children || []).map((child) => transformHierarchicalOrg(child)),
//       parentId: backendOrg.parent_organization_name,
//     }
//   }
//   const handleDeviceSelect = (device) => {
//     setSelectedDevice(device)
//   }
//   const handleDeviceTemperatureChange = async (deviceId, newTemperature) => {
//     console.log(`🌡️ Individual device temperature change: ${deviceId} -> ${newTemperature}°C`)
//     if (connectionStatus !== "connected") {
//       setDeviceTemperatureErrors((prev) => ({
//         ...prev,
//         [deviceId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const controlName = `temp_${newTemperature}`
//     const commandValue = newTemperature
//     setDeviceTemperatureProcessing((prev) => ({ ...prev, [deviceId]: true }))
//     setDeviceTemperatureErrors((prev) => ({ ...prev, [deviceId]: null }))
//     try {
//       console.log(
//         `Sending individual device temperature command: ${controlName} with value ${commandValue} to device ${deviceId}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(...)
//       const result = { success: false, error: 'Not implemented' }
//       if (result && result.success && result.brandResults) {
//         if (selectedDevice && selectedDevice.id === deviceId) {
//           setSelectedDevice((prev) => ({
//             ...prev,
//             temperature: newTemperature,
//           }))
//         }
//         console.log(`✅ Device temperature command successful for ${deviceId}: ${newTemperature}°C`)
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Device temperature command failed for ${deviceId}:`, error)
//       setDeviceTemperatureErrors((prev) => ({
//         ...prev,
//         [deviceId]: error.message || "Failed to set temperature",
//       }))
//     } finally {
//       setDeviceTemperatureProcessing((prev) => ({ ...prev, [deviceId]: false }))
//     }
//   }
//   const handleDevicePowerToggle = async (deviceId) => {
//     console.log(`⚡ Individual device power toggle: ${deviceId}`)
//     if (connectionStatus !== "connected") {
//       setDevicePowerErrors((prev) => ({
//         ...prev,
//         [deviceId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const currentPowerState = selectedDevice?.isOn ? "ON" : "OFF"
//     const newPowerState = currentPowerState === "ON" ? "OFF" : "ON"
//     const powerStateMap = {
//       ON: { controlName: "power_on", value: "on" },
//       OFF: { controlName: "power_off", value: "off" },
//     }
//     const { controlName, value } = powerStateMap[newPowerState]
//     setDevicePowerProcessing((prev) => ({ ...prev, [deviceId]: true }))
//     setDevicePowerErrors((prev) => ({ ...prev, [deviceId]: null }))
//     try {
//       console.log(
//         `Sending individual device power command: ${controlName} with value "${value}" to device ${deviceId}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(...)
//       const result = { success: false, error: 'Not implemented' }
//       if (result && result.success && result.brandResults) {
//         if (selectedDevice && selectedDevice.id === deviceId) {
//           setSelectedDevice((prev) => ({
//             ...prev,
//             isOn: newPowerState === "ON",
//           }))
//         }
//         console.log(`✅ Device power command successful for ${deviceId}: ${newPowerState}`)
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Device power command failed for ${deviceId}:`, error)
//       setDevicePowerErrors((prev) => ({
//         ...prev,
//         [deviceId]: error.message || "Failed to change power state",
//       }))
//     } finally {
//       setDevicePowerProcessing((prev) => ({ ...prev, [deviceId]: false }))
//     }
//   }
//   const handleDeviceLockToggle = async (deviceId) => {
//     console.log(`🔒 Individual device lock toggle: ${deviceId}`)
//     const currentLockState = selectedDevice?.isLocked ? "locked" : "unlocked"
//     const newLockState = currentLockState === "locked" ? "unlocked" : "locked"
//     setDeviceLockProcessing((prev) => ({ ...prev, [deviceId]: true }))
//     setDeviceLockErrors((prev) => ({ ...prev, [deviceId]: null }))
//     try {
//       console.log(`Setting lock state for device ${deviceId} to ${newLockState}...`)
//       // TODO: Backend developer will implement lock service call
//       // const result = await lockService.setLockState(deviceId, newLockState)
//       const result = { success: false, error: 'Not implemented' }
//       if (selectedDevice && selectedDevice.id === deviceId) {
//         setSelectedDevice((prev) => ({
//           ...prev,
//           isLocked: newLockState === "locked",
//         }))
//       }
//       console.log(`✅ Device lock command successful for ${deviceId}: ${newLockState}`)
//     } catch (error) {
//       console.error(`  Device lock command failed for ${deviceId}:`, error)
//       setDeviceLockErrors((prev) => ({
//         ...prev,
//         [deviceId]: error.message || "Failed to set lock state",
//       }))
//     } finally {
//       setDeviceLockProcessing((prev) => ({ ...prev, [deviceId]: false }))
//     }
//   }

//   const getOrganizationCardProps = (org) => {
//     const allDevices = getAllDevicesInOrganization(org)
//     const currentLockState = organizationLockStates[org.id] || "Unlocked"
//     const currentTemperature = organizationTemperatures[org.id] || 24
//     const currentPowerState = organizationPowerStates[org.id] || "OFF"
//     const faultSummary = organizationFaultSummaries[org.id]
//     const realFaultDevices = faultSummary ? faultSummary.faultyDevices : 0
//     return {
//       organizationName: org.name,
//       status: currentPowerState,
//       energy: (Math.random() * 20 + 5).toFixed(2),
//       isLocked: currentLockState !== "Unlocked",
//       lockState: currentLockState,
//       deviceCount: allDevices.length,
//       faultDevices: realFaultDevices,
//       isLockProcessing: bulkLockProcessing[org.id] || false,
//       lockError: lockErrors[org.id] || null,
//       currentTemperature: currentTemperature,
//       isTemperatureProcessing: temperatureProcessing[org.id] || false,
//       temperatureError: temperatureErrors[org.id] || null,
//       powerState: currentPowerState,
//       isPowerProcessing: powerProcessing[org.id] || false,
//       powerError: powerErrors[org.id] || null,
//     }
//   }
//   const handleOrganizationTemperatureChange = async (organizationId, newTemperature) => {
//     console.log(`🌡️ Temperature change: ${organizationId} -> ${newTemperature}°C`)
//     if (connectionStatus !== "connected") {
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const selectedOrg = findOrganizationById(organizations, organizationId)
//     if (!selectedOrg) {
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Organization not found",
//       }))
//       return
//     }
//     const allDevices = getAllDevicesInOrganization(selectedOrg)
//     const deviceIds = allDevices.map((device) => device.id)
//     if (deviceIds.length === 0) {
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: "No devices found in organization",
//       }))
//       return
//     }
//     const controlName = `temp_${newTemperature}`
//     const commandValue = newTemperature
//     setTemperatureProcessing((prev) => ({ ...prev, [organizationId]: true }))
//     setTemperatureErrors((prev) => ({ ...prev, [organizationId]: null }))
//     const startTime = performance.now()
//     try {
//       console.log(
//         `Sending temperature command: ${controlName} with value ${commandValue} to ${deviceIds.length} devices in ${selectedOrg.name}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(...)
//       const result = { success: false, error: 'Not implemented' }
//       const endTime = performance.now()
//       const timeTaken = endTime - startTime
//       console.log(`Temperature command completed in ${timeTaken.toFixed(2)}ms`)
//       console.log("Temperature command result:", result)
//       if (result && result.success && result.brandResults) {
//         setOrganizationTemperatures((prev) => ({
//           ...prev,
//           [organizationId]: newTemperature,
//         }))
//         const totalSuccess =
//           result.brandResults?.reduce((acc, brandResult) => {
//             const results = brandResult?.result?.results
//             if (Array.isArray(results)) {
//               return acc + results.filter((r) => r?.success).length
//             }
//             return acc
//           }, 0) || 0
//         console.log(
//           `✅ Temperature command successful for ${selectedOrg.name}: ${totalSuccess}/${result.totalDevices} devices updated`,
//         )
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Temperature command failed for ${selectedOrg.name}:`, error)
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: error.message || "Failed to set temperature",
//       }))
//     } finally {
//       setTemperatureProcessing((prev) => ({ ...prev, [organizationId]: false }))
//     }
//   }
//   const handleOrganizationBulkLock = async (organizationId, lockState) => {
//     console.log(`🔒 Bulk lock operation: ${organizationId} -> ${lockState}`)
//     const selectedOrg = findOrganizationById(organizations, organizationId)
//     if (!selectedOrg) {
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Organization not found",
//       }))
//       return
//     }
//     const deviceIds = getAllDevicesInOrganization(selectedOrg).map((d) => d.id)
//     if (deviceIds.length === 0) {
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: "No devices found in organization",
//       }))
//       return
//     }
//     const apiLockStateMap = {
//       Unlocked: "unlocked",
//       Locked: "locked",
//       "Super Locked": "super_lock",
//       "Admin lock": "super_lock",
//     }
//     const apiLockState = apiLockStateMap[lockState]
//     if (!apiLockState) {
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Invalid lock state",
//       }))
//       return
//     }
//     setBulkLockProcessing((prev) => ({ ...prev, [organizationId]: true }))
//     setLockErrors((prev) => ({ ...prev, [organizationId]: null }))
//     try {
//       // TODO: Backend developer will implement bulk lock service call
//       // const result = await lockService.bulkSetLockState(deviceIds, apiLockState)
//       const result = { success: false, error: 'Not implemented' }
//       setOrganizationLockStates((prev) => ({
//         ...prev,
//         [organizationId]: lockState,
//       }))
//       console.log(`✅ Bulk lock successful for ${selectedOrg.name}:`, result)
//     } catch (error) {
//       console.error(`  Bulk lock failed for ${selectedOrg.name}:`, error)
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: error.message || "Failed to perform bulk lock operation",
//       }))
//     } finally {
//       setBulkLockProcessing((prev) => ({ ...prev, [organizationId]: false }))
//     }
//   }
//   const handleOrganizationPowerChange = async (organizationId, newPowerState) => {
//     console.log(`⚡ Power change: ${organizationId} -> ${newPowerState}`)
//     if (connectionStatus !== "connected") {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const selectedOrg = findOrganizationById(organizations, organizationId)
//     if (!selectedOrg) {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Organization not found",
//       }))
//       return
//     }
//     const allDevices = getAllDevicesInOrganization(selectedOrg)
//     const deviceIds = allDevices.map((device) => device.id)
//     if (deviceIds.length === 0) {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "No devices found in organization",
//       }))
//       return
//     }
//     const powerStateMap = {
//       ON: { controlName: "power_on", value: "on" },
//       OFF: { controlName: "power_off", value: "off" },
//     }
//     const { controlName, value } = powerStateMap[newPowerState]
//     if (!controlName) {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Invalid power state",
//       }))
//       return
//     }
//     setPowerProcessing((prev) => ({ ...prev, [organizationId]: true }))
//     setPowerErrors((prev) => ({ ...prev, [organizationId]: null }))
//     const startTime = performance.now()
//     try {
//       console.log(
//         `Sending power command: ${controlName} with value "${value}" to ${deviceIds.length} devices in ${selectedOrg.name}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(deviceIds, controlName, value, organizationId)
//       const result = { success: false, error: 'Not implemented' }
//       const endTime = performance.now()
//       const timeTaken = endTime - startTime
//       console.log(`Power command completed in ${timeTaken.toFixed(2)}ms`)
//       console.log("Power command result:", result)
//       if (result && result.success && result.brandResults) {
//         setOrganizationPowerStates((prev) => ({
//           ...prev,
//           [organizationId]: newPowerState,
//         }))
//         const totalSuccess =
//           result.brandResults?.reduce((acc, brandResult) => {
//             const results = brandResult?.result?.results
//             if (Array.isArray(results)) {
//               return acc + results.filter((r) => r?.success).length
//             }
//             return acc
//           }, 0) || 0
//         console.log(
//           `✅ Power command successful for ${selectedOrg.name}: ${totalSuccess}/${result.totalDevices} devices updated to ${newPowerState}`,
//         )
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Power command failed for ${selectedOrg.name}:`, error)
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: error.message || "Failed to change power state",
//       }))
//     } finally {
//       setPowerProcessing((prev) => ({ ...prev, [organizationId]: false }))
//     }
//   }
//   // add these hooks
// const [selectedOrgId, setSelectedOrgId] = useState("");
// const [selectedVenueId, setSelectedVenueId] = useState("");


// useEffect(() => {
//   if (!selectedVenueId) {
//     setFreezerDevices([]);
//     return;
//   }

//   const BASE = import.meta.env.VITE_BACKEND_API || 'http://localhost:5050'

//   const fetchDevices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });
//       const data = await res.json();
//       console.log("DEVICES>>FROM>>DASHBOARD", data)
//       if (res.ok) {
//         setFreezerDevices(data.devices || []);
//       } else {
//         setFreezerDevices([]);
//         console.error(data.message);
//       }
//     } catch (err) {
//       console.error("Device fetch error:", err.message);
//       setFreezerDevices([]);
//     }
//   };

//   fetchDevices();

//     // Set interval to run every 10 minutes (600000 ms)
//   const interval = setInterval(fetchDevices, 600000);

//   // Cleanup on unmount or when selectedVenueId changes
//   return () => clearInterval(interval);


// }, [selectedVenueId]);



//   // TODO: Backend developer will implement organization fetching
//   const fetchOrganizations = async () => {
//     setLoading(true)
//     // Static placeholder data - Backend developer should replace with API call
//     // Example:
//     // const response = await fetch('YOUR_API_URL/organization/fetch/hierarchical', {
//     //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//     // });
//     // const data = await response.json();
    
//     // Static mock data for UI preview
//     const mockOrgs = []
//     setOrganizations(mockOrgs)
//     setLoading(false)
//   }
//   useEffect(() => {
//     fetchOrganizations()
//   }, [])
//   useEffect(() => {
//     if (selectedOrganizationId && organizations.length > 0) {
//       const org = findOrganizationById(organizations, selectedOrganizationId)
//       if (org) {
//         setSelectedOrganizationData(getOrganizationCardProps(org))
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     selectedOrganizationId,
//     organizations,
//     organizationLockStates,
//     bulkLockProcessing,
//     lockErrors,
//     organizationTemperatures,
//     temperatureProcessing,
//     temperatureErrors,
//     organizationPowerStates,
//     powerProcessing,
//     powerErrors,
//   ])
//   if (loading) {
//     return (
//       <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
//         <div className="flex justify-center items-center w-full h-64">
//           <div className="text-lg text-gray-600">Loading organizations...</div>
//         </div>
//       </div>
//     )
//   }
//   if (error) {
//     return (
//       <div className="flex w-full flex-col lg:flex-row h-full bg-gray-100  font-inter rounded-md overflow-hidden">
//         <div className="flex flex-col justify-center items-center w-full h-64 space-y-4">
//           <div className="text-lg text-red-600">Error: {error}</div>
//           {error === 'Authentication required. Please login.' ? (
//             <div className="text-sm text-gray-600 text-center px-4">
//               <p>You need to login first. Please go to the login page.</p>
//             </div>
//           ) : (
//             <>
//               <div className="text-sm text-gray-600 text-center px-4 max-w-lg">
//                 <p className="mb-2">{error}</p>
//                 {error.includes('Cannot connect to backend') && (
//                   <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
//                     <p className="font-semibold mb-1">Troubleshooting:</p>
//                     <ul className="text-left list-disc list-inside space-y-1 text-xs">
//                       <li>Make sure your backend server is running</li>
//                       <li>Check if the backend URL is correct: <code className="bg-gray-100 px-1">{import.meta.env.VITE_BACKEND_API || 'http://localhost:3001'}</code></li>
//                       <li>If you changed .env file, restart your dev server (npm run dev)</li>
//                     </ul>
//                   </div>
//                 )}
//                 {error.includes('API endpoint not found') && (
//                   <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
//                     <p className="text-xs">The endpoint <code className="bg-gray-100 px-1">/organization/fetch/hierarchical</code> might not exist on your backend.</p>
//                   </div>
//                 )}
//               </div>
//               <button onClick={fetchOrganizations} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2">
//                 Retry
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     )
//   }
//   const handleFreezerDeviceSelect = (deviceId) => {
//     setSelectedFreezerDeviceId(deviceId)
//   }
//   const handleBackToDashboard = () => {
//     setShowDetailPage(false)
//     setSelectedDevice(null)
//   }
//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       {/* Main Content Area */}
//       <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">
//         {!showDetailPage && (
//           <>
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <p className="text-sm text-[#64748B] font-medium">Organization</p>
//                 <OrganizationSelect
//             value={selectedOrgId}
//             onChange={(id) => {
//               setSelectedOrgId(id);
//               setSelectedVenueId(""); // reset venue when org changes
//             }}
//             className="mt-1"
//           />
//                 <h1 className="text-2xl text-[#1E293B] font-bold">
//                   {(selectedOrganizationData?.organizationName || "Karim Containers LTD").replace("SSUET_MAIN", "Karim Containers LTD")}
//                 </h1>
//               </div>
//               <div className="flex items-center">
//                 {/* <button className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1D4ED8] transition-colors">
//                   <span>Venue</span>
//                   <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="m6 9 6 6 6-6"/>
//                     </svg>
//                   </div> */}
//                 {/* </button> */}
//             <VenueSelect
//                 organizationId={selectedOrgId}
//                 value={selectedVenueId}
//                 onChange={(id) => setSelectedVenueId(id)}
//                 className="mt-1"
//               />
//               </div>
//             </div>

//             {/* Freezer Device Cards Grid with Fixed Height and Scroll */}
//             <div className="flex-1 min-h-0">
//               <div className="freezer-cards-container custom-scrollbar">
//                 {/* {freezerDevices.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                     <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                     <p className="text-lg font-medium">No Freezer Devices Found</p>
//                     <p className="text-sm">Add some freezer devices to get started</p>
//                   </div>
//                 ) : (
//                   <div className="freezer-cards-grid freezer-cards-container">
//                     {freezerDevices.map((device) => (
//                       <FreezerDeviceCard
//                         key={device.id}
//                         deviceId={device.deviceId}
//                         ambientTemperature={device.ambientTemperature}
//                         freezerTemperature={device.freezerTemperature}
//                         batteryLow={device.batteryLow}
//                         onCardSelect={() => handleFreezerDeviceSelect(device.id)}
//                         isSelected={device.id === selectedFreezerDeviceId}
//                       />
//                     ))}
//                   </div>
//                 )} */}

//                 {freezerDevices.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                 <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//                 <p className="text-lg font-medium">No Freezer Devices Found</p>
//                 <p className="text-sm">Add some freezer devices to get started</p>
//               </div>
//             ) : (
//               <div className="freezer-cards-grid freezer-cards-container">
//                 {freezerDevices.map((device) => {
                  
//                   return(
//                   <FreezerDeviceCard
//                     key={device._id}
//                     deviceId={device.deviceId}
//                     ambientTemperature={device?.AmbientData?.temperature}
//                     freezerTemperature={device?.FreezerData?.temperature}
//                     batteryLow={device?.batteryAlert || false}
//                     refrigeratorAlert = {device?.refrigeratorAlert || false}
//                     onCardSelect={() => handleFreezerDeviceSelect(device._id)}
//                     isSelected={device._id === selectedFreezerDeviceId}
//                   />
//                 )})}
//               </div>
//             )}

//               </div>
//             </div>

//             {/* Bottom Section: Refrigerator Alert and Battery Alert - Fixed Height */}
//             {/* <div className="flex-shrink-0">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
//                 <div className="p-4" style={{backgroundColor: '#07518D12', borderRadius: '20px'}}>
//                   <MaintenanceList items={maintenanceItems} />
//                 </div>
                
                
//                 <div className="p-4" style={{backgroundColor: '#07518D12', borderRadius: '20px'}}>
//                   <BatteryAlert items={maintenanceItems} />
//                 </div>
//               </div>
//             </div> */}

//             <AlertsPanel organizationId={selectedOrgId}/>
//           </>
//         )}
        
//         {showDetailPage && (
//           <OrganizationDetailContent
//             className="flex-grow overflow-y-auto"
//             organizationId={selectedOrganizationId}
//             organizationName={selectedOrganizationData?.organizationName || ""}
//             onBack={handleBackToDashboard}
//             organizations={organizations}
//             websocket={null}
//             connectionStatus={connectionStatus}
//             onDeviceTemperatureChange={handleOrganizationTemperatureChange}
//             onDevicePowerChange={handleOrganizationPowerChange}
//             onDeviceSelect={handleDeviceSelect}
//           />
//         )}
//       </div>

//       {/* Right Sidebar - Venue Details Panel */}
//       <div className="dashboard-right-panel shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar p-4 lg:p-6 border-l border-[#E5E7EB]/40 bg-white flex-shrink-0">
//         {selectedFreezerDeviceId ? (
//           // Show venue details for selected device
//           (() => {
//             const selectedDevice = freezerDevices.find(d => d._id === selectedFreezerDeviceId)
            
//             return (
//               <VenueDetailsPanel
//                 venueName="Karim Korangi Branch"
//                 freezerTemperature={selectedDevice?.AmbientData?.temperature || 0}
//                 ambientTemperature={selectedDevice?.FreezerData?.temperature|| 0}
//                 batteryLow={selectedDevice?.batteryLow || false}
//                 needMaintenance={selectedDevice?.batteryLow || false}
//                 apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
//                 chartData={chartData.map(item => ({ date: item.name, value: item.energy }))}
//                 organizationId = {selectedOrgId}
//               />
//             )
//           })()
//         ) : (
//           // Show default venue details if no device is selected
//           <VenueDetailsPanel
//             venueName="Karim Korangi Branch"
//             freezerTemperature={-4}
//             ambientTemperature={25}
//             batteryLow={true}
//             needMaintenance={true}
//             apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
//             chartData={chartData.map(item => ({ date: item.name, value: item.energy }))}
//             organizationId = {selectedOrgId}
//           />
//         )}
//       </div>
//     </div>
//   )
// }























// "use client"
// import { useState, useEffect } from "react"
// import FreezerDeviceCard from "./FreezerDeviceCard"
// import MaintenanceList from "./MaintenanceList"
// import BatteryAlert from "./BatteryAlert"
// import OrganizationDetailContent from "./organization-detail-page"
// // TODO: Backend developer will add API services here
// import VenueDetailsPanel from "./VenueDetailsPanel"
// import "../../styles/pages/Dashboard/dashboard-styles.css"
// import "../../styles/pages/Dashboard/freezer-cards-responsive.css" 
// import OrganizatoinSelect from "./OrganizationSelect"
// import OrganizationSelect from "./OrganizationSelect"
// import VenueSelect from "./VenueSelect"
// import AlertsPanel from "./AlertsPanel"
// import { User } from "lucide-react"
// import { useStore } from "../../contexts/storecontexts"
// import { useLocation, useNavigate } from "react-router-dom"


// const chartData = [
//   { name: "05", hours: 70, energy: 30 },
//   { name: "06", hours: 50, energy: 40 },
//   { name: "07", hours: 80, energy: 60 },
//   { name: "08", hours: 60, energy: 50 },
//   { name: "09", hours: 90, energy: 70 },
//   { name: "10", hours: 75, energy: 55 },
//   { name: "11", hours: 85, energy: 65 },
// ]

// // Mock freezer device data based on the target image
// const mockFreezerDevices = [
//   {
//     id: 1,
//     deviceId: "KCL023",
//     ambientTemperature: 28,
//     freezerTemperature: -4,
//     batteryLow: true,
//   },
//   {
//     id: 2,
//     deviceId: "KCL023",
//     ambientTemperature: 25,
//     freezerTemperature: -8,
//     batteryLow: false,
//   },
//   {
//     id: 3,
//     deviceId: "KCL023",
//     ambientTemperature: 28,
//     freezerTemperature: -4,
//     batteryLow: true,
//   },
//   {
//     id: 4,
//     deviceId: "KCL023",
//     ambientTemperature: 25,
//     freezerTemperature: -3,
//     batteryLow: false,
//   },
//   {
//     id: 5,
//     deviceId: "KCL023",
//     ambientTemperature: 30,
//     freezerTemperature: -6,
//     batteryLow: true,
//   },
//   {
//     id: 6,
//     deviceId: "KCL023",
//     ambientTemperature: 26,
//     freezerTemperature: -3,
//     batteryLow: false,
//   },
//   {
//     id: 7,
//     deviceId: "KCL023",
//     ambientTemperature: 27,
//     freezerTemperature: -5,
//     batteryLow: true,
//   },
//   {
//     id: 8,
//     deviceId: "KCL023",
//     ambientTemperature: 24,
//     freezerTemperature: -7,
//     batteryLow: false,
//   },
//   {
//     id: 9,
//     deviceId: "KCL023",
//     ambientTemperature: 29,
//     freezerTemperature: -2,
//     batteryLow: true,
//   },
//   {
//     id: 10,
//     deviceId: "KCL023",
//     ambientTemperature: 23,
//     freezerTemperature: -9,
//     batteryLow: false,
//   },
// ]
// export default function Dashboard() {
//   const [organizations, setOrganizations] = useState([])
//   const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices)
//   const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedOrganizationId, setSelectedOrganizationId] = useState("")
//   const [selectedOrganizationData, setSelectedOrganizationData] = useState(null)
//   const [showDetailPage, setShowDetailPage] = useState(false)
//   const [selectedDevice, setSelectedDevice] = useState(null)
//   // TODO: Backend developer will add WebSocket connection here
//   const [connectionStatus, setConnectionStatus] = useState("disconnected")
//   const [bulkLockProcessing, setBulkLockProcessing] = useState({})
//   const [lockErrors, setLockErrors] = useState({})
//   const [organizationLockStates, setOrganizationLockStates] = useState({})
//   const [organizationTemperatures, setOrganizationTemperatures] = useState({})
//   const [temperatureProcessing, setTemperatureProcessing] = useState({})
//   const [temperatureErrors, setTemperatureErrors] = useState({})
//   const [organizationPowerStates, setOrganizationPowerStates] = useState({})
//   const [powerProcessing, setPowerProcessing] = useState({})
//   const [powerErrors, setPowerErrors] = useState({})
//   const [faultAlerts, setFaultAlerts] = useState([])
//   const [organizationFaultSummaries, setOrganizationFaultSummaries] = useState({})
//   const [deviceFaultStates, setDeviceFaultStates] = useState({})
//   const [maintenanceItems, setMaintenanceItems] = useState([
//     {
//       id: 1,
//       name: "SSUET BLK-AFth",
//       devices: 18,
//       nestedItems: [
//         { id: 1.1, name: "SSUET BLK-AFth1", date: "21 May 2025" },
//         { id: 1.2, name: "SSUET BLK-AFth2", date: "13 May 2025" }
//       ]
//     },
//     {
//       id: 2,
//       name: "SSUET BLK-AS",
//       devices: 5,
//       nestedItems: [
//         { id: 2.1, name: "SSUET BLK-AS1", date: "15 May 2025" },
//         { id: 2.2, name: "SSUET BLK-AS2", date: "22 May 2025" }
//       ]
//     },
//     {
//       id: 3,
//       name: "SSUET BLK-AT",
//       devices: 12,
//       nestedItems: [
//         { id: 3.1, name: "SSUET BLK-AT1", date: "18 May 2025" }
//       ]
//     },
//     {
//       id: 4,
//       name: "SSUET BLK-AF",
//       devices: 2,
//       nestedItems: [
//         { id: 4.1, name: "SSUET BLK-AF1", date: "21 May 2025" },
//         { id: 4.2, name: "SSUET BLK-AF2", date: "13 May 2025" }
//       ]
//     },
//     {
//       id: 5,
//       name: "SSUET BLK-BS",
//       devices: 8,
//       nestedItems: [
//         { id: 5.1, name: "SSUET BLK-BS1", date: "25 May 2025" },
//         { id: 5.2, name: "SSUET BLK-BS2", date: "30 May 2025" }
//       ]
//     },
//     {
//       id: 6,
//       name: "SSUET BLK-CF",
//       devices: 15,
//       nestedItems: [
//         { id: 6.1, name: "SSUET BLK-CF1", date: "12 May 2025" }
//       ]
//     }
//   ])
//   const [deviceTemperatureProcessing, setDeviceTemperatureProcessing] = useState({})
//   const [deviceTemperatureErrors, setDeviceTemperatureErrors] = useState({})
//   const [devicePowerProcessing, setDevicePowerProcessing] = useState({})
//   const [devicePowerErrors, setDevicePowerErrors] = useState({})
//   const [deviceLockProcessing, setDeviceLockProcessing] = useState({})
//   const [deviceLockErrors, setDeviceLockErrors] = useState({})


//   const {user} = useStore();
//   // TODO: Backend developer will implement WebSocket connection
//   // useEffect(() => {
//   //   const setupWebSocket = async () => {
//   //     const connected = await websocket.connect()
//   //     setConnectionStatus(connected ? "connected" : "disconnected")
//   //   }
//   //   setupWebSocket()
//   // }, [websocket])
//   // TODO: Backend developer will implement WebSocket fault alert listener
//   // useEffect(() => {
//   //   const handleDeviceFaultAlert = (data) => {
//   //     console.log("🚨 Device fault alert received:", data)
//   //     const faultAlert = {
//   //       ...data,
//   //       timestamp: new Date().toISOString(),
//   //       organizationId: findDeviceOrganization(data.deviceId),
//   //     }
//   //     setFaultAlerts((prev) => [...prev, faultAlert].slice(-50))
//   //     setDeviceFaultStates((prev) => ({
//   //       ...prev,
//   //       [data.deviceId]: {
//   //         fault: data.fault,
//   //         alert: data.alert,
//   //         faultCount: data.faultCount || 0,
//   //         lastUpdate: new Date().toISOString(),
//   //       },
//   //     }))
//   //     updateOrganizationFaultSummaries()
//   //   }
//   //   // TODO: Backend developer will add WebSocket listeners
//   //   websocket.on("deviceFaultAlert", handleDeviceFaultAlert)
//   //   return () => {
//   //     websocket.off("deviceFaultAlert", handleDeviceFaultAlert)
//   //   }
//   // }, [organizations, websocket, updateOrganizationFaultSummaries])
//   useEffect(() => {
//     if (organizations.length > 0) {
//       updateOrganizationFaultSummaries()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [organizations, deviceFaultStates, faultAlerts])

//   const getAllDevicesInOrganization = (org) => {
//     let devices = [...(org.devices || [])]
//     if (org.subOrganizations) {
//       org.subOrganizations.forEach((subOrg) => {
//         devices = devices.concat(getAllDevicesInOrganization(subOrg))
//       })
//     }
//     return devices
//   }

//   const findOrganizationById = (orgs, id) => {
//     for (const org of orgs) {
//       if (org.id === id) return org
//       if (org.subOrganizations) {
//         const found = findOrganizationById(org.subOrganizations, id)
//         if (found) return found
//       }
//     }
//     return null
//   }
//   const findDeviceOrganization = (deviceId) => {
//     for (const org of organizations) {
//       const allDevices = getAllDevicesInOrganization(org)
//       if (allDevices.some((device) => device.id === deviceId)) {
//         return org.id
//       }
//     }
//     return null
//   }
//   const updateOrganizationFaultSummaries = () => {
//     const summaries = {}
//     organizations.forEach((org) => {
//       const allDevices = getAllDevicesInOrganization(org)
//       const faultyDevices = allDevices.filter((device) => deviceFaultStates[device.id]?.fault === true)
//       const orgFaults = faultAlerts.filter((alert) => alert.organizationId === org.id && alert.fault === true)
//       const lastFaultTime = orgFaults.length > 0 ? orgFaults[orgFaults.length - 1].timestamp : null
//       summaries[org.id] = {
//         organizationId: org.id,
//         organizationName: org.name,
//         totalDevices: allDevices.length,
//         faultyDevices: faultyDevices.length,
//         faultDevicesList: faultyDevices.map((d) => d.id),
//         lastFaultTime: lastFaultTime,
//         maintenanceRequired: faultyDevices.length > 0,
//       }
//     })
//     setOrganizationFaultSummaries(summaries)
//     const maintenanceData = organizations
//       .map((org) => summaries[org.id])
//       .filter((summary) => summary.maintenanceRequired)
//       .map((summary) => ({
//         id: summary.organizationId,
//         name: summary.organizationName,
//         devices: summary.faultyDevices,
//         date: summary.lastFaultTime ? new Date(summary.lastFaultTime).toLocaleDateString() : "",
//         nestedItems: summary.faultDevicesList.map((deviceId) => ({
//           id: deviceId,
//           name: deviceId,
//           date: summary.lastFaultTime ? new Date(summary.lastFaultTime).toLocaleDateString() : "",
//         })),
//       }))
//     // setMaintenanceItems(maintenanceData) // Commented out to show dummy data
//   }
//   const transformHierarchicalOrg = (backendOrg) => {
//     return {
//       id: backendOrg.organization_name,
//       name: backendOrg.organization_name,
//       type: backendOrg.organization_type || "main",
//       devices: (backendOrg.devices || []).map((device) => ({
//         id: device.device_id,
//         name: device.device_id,
//         type: "air_conditioner",
//         brand: device.device_brand || "unknown",
//         status: "online",
//       })),
//       subOrganizations: (backendOrg.children || []).map((child) => transformHierarchicalOrg(child)),
//       parentId: backendOrg.parent_organization_name,
//     }
//   }
//   const handleDeviceSelect = (device) => {
//     setSelectedDevice(device)
//   }
//   const handleDeviceTemperatureChange = async (deviceId, newTemperature) => {
//     console.log(`🌡️ Individual device temperature change: ${deviceId} -> ${newTemperature}°C`)
//     if (connectionStatus !== "connected") {
//       setDeviceTemperatureErrors((prev) => ({
//         ...prev,
//         [deviceId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const controlName = `temp_${newTemperature}`
//     const commandValue = newTemperature
//     setDeviceTemperatureProcessing((prev) => ({ ...prev, [deviceId]: true }))
//     setDeviceTemperatureErrors((prev) => ({ ...prev, [deviceId]: null }))
//     try {
//       console.log(
//         `Sending individual device temperature command: ${controlName} with value ${commandValue} to device ${deviceId}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(...)
//       const result = { success: false, error: 'Not implemented' }
//       if (result && result.success && result.brandResults) {
//         if (selectedDevice && selectedDevice.id === deviceId) {
//           setSelectedDevice((prev) => ({
//             ...prev,
//             temperature: newTemperature,
//           }))
//         }
//         console.log(`✅ Device temperature command successful for ${deviceId}: ${newTemperature}°C`)
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Device temperature command failed for ${deviceId}:`, error)
//       setDeviceTemperatureErrors((prev) => ({
//         ...prev,
//         [deviceId]: error.message || "Failed to set temperature",
//       }))
//     } finally {
//       setDeviceTemperatureProcessing((prev) => ({ ...prev, [deviceId]: false }))
//     }
//   }
//   const handleDevicePowerToggle = async (deviceId) => {
//     console.log(`⚡ Individual device power toggle: ${deviceId}`)
//     if (connectionStatus !== "connected") {
//       setDevicePowerErrors((prev) => ({
//         ...prev,
//         [deviceId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const currentPowerState = selectedDevice?.isOn ? "ON" : "OFF"
//     const newPowerState = currentPowerState === "ON" ? "OFF" : "ON"
//     const powerStateMap = {
//       ON: { controlName: "power_on", value: "on" },
//       OFF: { controlName: "power_off", value: "off" },
//     }
//     const { controlName, value } = powerStateMap[newPowerState]
//     setDevicePowerProcessing((prev) => ({ ...prev, [deviceId]: true }))
//     setDevicePowerErrors((prev) => ({ ...prev, [deviceId]: null }))
//     try {
//       console.log(
//         `Sending individual device power command: ${controlName} with value "${value}" to device ${deviceId}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(...)
//       const result = { success: false, error: 'Not implemented' }
//       if (result && result.success && result.brandResults) {
//         if (selectedDevice && selectedDevice.id === deviceId) {
//           setSelectedDevice((prev) => ({
//             ...prev,
//             isOn: newPowerState === "ON",
//           }))
//         }
//         console.log(`✅ Device power command successful for ${deviceId}: ${newPowerState}`)
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Device power command failed for ${deviceId}:`, error)
//       setDevicePowerErrors((prev) => ({
//         ...prev,
//         [deviceId]: error.message || "Failed to change power state",
//       }))
//     } finally {
//       setDevicePowerProcessing((prev) => ({ ...prev, [deviceId]: false }))
//     }
//   }
//   const handleDeviceLockToggle = async (deviceId) => {
//     console.log(`🔒 Individual device lock toggle: ${deviceId}`)
//     const currentLockState = selectedDevice?.isLocked ? "locked" : "unlocked"
//     const newLockState = currentLockState === "locked" ? "unlocked" : "locked"
//     setDeviceLockProcessing((prev) => ({ ...prev, [deviceId]: true }))
//     setDeviceLockErrors((prev) => ({ ...prev, [deviceId]: null }))
//     try {
//       console.log(`Setting lock state for device ${deviceId} to ${newLockState}...`)
//       // TODO: Backend developer will implement lock service call
//       // const result = await lockService.setLockState(deviceId, newLockState)
//       const result = { success: false, error: 'Not implemented' }
//       if (selectedDevice && selectedDevice.id === deviceId) {
//         setSelectedDevice((prev) => ({
//           ...prev,
//           isLocked: newLockState === "locked",
//         }))
//       }
//       console.log(`✅ Device lock command successful for ${deviceId}: ${newLockState}`)
//     } catch (error) {
//       console.error(`  Device lock command failed for ${deviceId}:`, error)
//       setDeviceLockErrors((prev) => ({
//         ...prev,
//         [deviceId]: error.message || "Failed to set lock state",
//       }))
//     } finally {
//       setDeviceLockProcessing((prev) => ({ ...prev, [deviceId]: false }))
//     }
//   }

//   const getOrganizationCardProps = (org) => {
//     const allDevices = getAllDevicesInOrganization(org)
//     const currentLockState = organizationLockStates[org.id] || "Unlocked"
//     const currentTemperature = organizationTemperatures[org.id] || 24
//     const currentPowerState = organizationPowerStates[org.id] || "OFF"
//     const faultSummary = organizationFaultSummaries[org.id]
//     const realFaultDevices = faultSummary ? faultSummary.faultyDevices : 0
//     return {
//       organizationName: org.name,
//       status: currentPowerState,
//       energy: (Math.random() * 20 + 5).toFixed(2),
//       isLocked: currentLockState !== "Unlocked",
//       lockState: currentLockState,
//       deviceCount: allDevices.length,
//       faultDevices: realFaultDevices,
//       isLockProcessing: bulkLockProcessing[org.id] || false,
//       lockError: lockErrors[org.id] || null,
//       currentTemperature: currentTemperature,
//       isTemperatureProcessing: temperatureProcessing[org.id] || false,
//       temperatureError: temperatureErrors[org.id] || null,
//       powerState: currentPowerState,
//       isPowerProcessing: powerProcessing[org.id] || false,
//       powerError: powerErrors[org.id] || null,
//     }
//   }
//   const handleOrganizationTemperatureChange = async (organizationId, newTemperature) => {
//     console.log(`🌡️ Temperature change: ${organizationId} -> ${newTemperature}°C`)
//     if (connectionStatus !== "connected") {
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const selectedOrg = findOrganizationById(organizations, organizationId)
//     if (!selectedOrg) {
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Organization not found",
//       }))
//       return
//     }
//     const allDevices = getAllDevicesInOrganization(selectedOrg)
//     const deviceIds = allDevices.map((device) => device.id)
//     if (deviceIds.length === 0) {
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: "No devices found in organization",
//       }))
//       return
//     }
//     const controlName = `temp_${newTemperature}`
//     const commandValue = newTemperature
//     setTemperatureProcessing((prev) => ({ ...prev, [organizationId]: true }))
//     setTemperatureErrors((prev) => ({ ...prev, [organizationId]: null }))
//     const startTime = performance.now()
//     try {
//       console.log(
//         `Sending temperature command: ${controlName} with value ${commandValue} to ${deviceIds.length} devices in ${selectedOrg.name}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(...)
//       const result = { success: false, error: 'Not implemented' }
//       const endTime = performance.now()
//       const timeTaken = endTime - startTime
//       console.log(`Temperature command completed in ${timeTaken.toFixed(2)}ms`)
//       console.log("Temperature command result:", result)
//       if (result && result.success && result.brandResults) {
//         setOrganizationTemperatures((prev) => ({
//           ...prev,
//           [organizationId]: newTemperature,
//         }))
//         const totalSuccess =
//           result.brandResults?.reduce((acc, brandResult) => {
//             const results = brandResult?.result?.results
//             if (Array.isArray(results)) {
//               return acc + results.filter((r) => r?.success).length
//             }
//             return acc
//           }, 0) || 0
//         console.log(
//           `✅ Temperature command successful for ${selectedOrg.name}: ${totalSuccess}/${result.totalDevices} devices updated`,
//         )
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Temperature command failed for ${selectedOrg.name}:`, error)
//       setTemperatureErrors((prev) => ({
//         ...prev,
//         [organizationId]: error.message || "Failed to set temperature",
//       }))
//     } finally {
//       setTemperatureProcessing((prev) => ({ ...prev, [organizationId]: false }))
//     }
//   }
//   const handleOrganizationBulkLock = async (organizationId, lockState) => {
//     console.log(`🔒 Bulk lock operation: ${organizationId} -> ${lockState}`)
//     const selectedOrg = findOrganizationById(organizations, organizationId)
//     if (!selectedOrg) {
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Organization not found",
//       }))
//       return
//     }
//     const deviceIds = getAllDevicesInOrganization(selectedOrg).map((d) => d.id)
//     if (deviceIds.length === 0) {
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: "No devices found in organization",
//       }))
//       return
//     }
//     const apiLockStateMap = {
//       Unlocked: "unlocked",
//       Locked: "locked",
//       "Super Locked": "super_lock",
//       "Admin lock": "super_lock",
//     }
//     const apiLockState = apiLockStateMap[lockState]
//     if (!apiLockState) {
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Invalid lock state",
//       }))
//       return
//     }
//     setBulkLockProcessing((prev) => ({ ...prev, [organizationId]: true }))
//     setLockErrors((prev) => ({ ...prev, [organizationId]: null }))
//     try {
//       // TODO: Backend developer will implement bulk lock service call
//       // const result = await lockService.bulkSetLockState(deviceIds, apiLockState)
//       const result = { success: false, error: 'Not implemented' }
//       setOrganizationLockStates((prev) => ({
//         ...prev,
//         [organizationId]: lockState,
//       }))
//       console.log(`✅ Bulk lock successful for ${selectedOrg.name}:`, result)
//     } catch (error) {
//       console.error(`  Bulk lock failed for ${selectedOrg.name}:`, error)
//       setLockErrors((prev) => ({
//         ...prev,
//         [organizationId]: error.message || "Failed to perform bulk lock operation",
//       }))
//     } finally {
//       setBulkLockProcessing((prev) => ({ ...prev, [organizationId]: false }))
//     }
//   }
//   const handleOrganizationPowerChange = async (organizationId, newPowerState) => {
//     console.log(`⚡ Power change: ${organizationId} -> ${newPowerState}`)
//     if (connectionStatus !== "connected") {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "WebSocket not connected",
//       }))
//       return
//     }
//     const selectedOrg = findOrganizationById(organizations, organizationId)
//     if (!selectedOrg) {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Organization not found",
//       }))
//       return
//     }
//     const allDevices = getAllDevicesInOrganization(selectedOrg)
//     const deviceIds = allDevices.map((device) => device.id)
//     if (deviceIds.length === 0) {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "No devices found in organization",
//       }))
//       return
//     }
//     const powerStateMap = {
//       ON: { controlName: "power_on", value: "on" },
//       OFF: { controlName: "power_off", value: "off" },
//     }
//     const { controlName, value } = powerStateMap[newPowerState]
//     if (!controlName) {
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: "Invalid power state",
//       }))
//       return
//     }
//     setPowerProcessing((prev) => ({ ...prev, [organizationId]: true }))
//     setPowerErrors((prev) => ({ ...prev, [organizationId]: null }))
//     const startTime = performance.now()
//     try {
//       console.log(
//         `Sending power command: ${controlName} with value "${value}" to ${deviceIds.length} devices in ${selectedOrg.name}...`,
//       )
//       // TODO: Backend developer will implement WebSocket command
//       // const result = await websocket.sendBatchCommandsMultiBrand(deviceIds, controlName, value, organizationId)
//       const result = { success: false, error: 'Not implemented' }
//       const endTime = performance.now()
//       const timeTaken = endTime - startTime
//       console.log(`Power command completed in ${timeTaken.toFixed(2)}ms`)
//       console.log("Power command result:", result)
//       if (result && result.success && result.brandResults) {
//         setOrganizationPowerStates((prev) => ({
//           ...prev,
//           [organizationId]: newPowerState,
//         }))
//         const totalSuccess =
//           result.brandResults?.reduce((acc, brandResult) => {
//             const results = brandResult?.result?.results
//             if (Array.isArray(results)) {
//               return acc + results.filter((r) => r?.success).length
//             }
//             return acc
//           }, 0) || 0
//         console.log(
//           `✅ Power command successful for ${selectedOrg.name}: ${totalSuccess}/${result.totalDevices} devices updated to ${newPowerState}`,
//         )
//       } else {
//         throw new Error(result?.error || "Command failed without specific error")
//       }
//     } catch (error) {
//       console.error(`  Power command failed for ${selectedOrg.name}:`, error)
//       setPowerErrors((prev) => ({
//         ...prev,
//         [organizationId]: error.message || "Failed to change power state",
//       }))
//     } finally {
//       setPowerProcessing((prev) => ({ ...prev, [organizationId]: false }))
//     }
//   }
//   // add these hooks
// const [selectedOrgId, setSelectedOrgId] = useState("");
// const [selectedVenueId, setSelectedVenueId] = useState("");


// useEffect(() => {
//   if (!selectedVenueId) {
//     setFreezerDevices([]);
//     return;
//   }

//   const BASE = import.meta.env.VITE_BACKEND_API || 'http://localhost:5050'

//   const fetchDevices = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       });
//       const data = await res.json();
//       console.log("DEVICES>>FROM>>DASHBOARD", data)
//       if (res.ok) {
//         setFreezerDevices(data.devices || []);
//       } else {
//         setFreezerDevices([]);
//         console.error(data.message);
//       }
//     } catch (err) {
//       console.error("Device fetch error:", err.message);
//       setFreezerDevices([]);
//     }
//   };

//   fetchDevices();

//     // Set interval to run every 10 minutes (600000 ms)
//   const interval = setInterval(fetchDevices, 600000);

//   // Cleanup on unmount or when selectedVenueId changes
//   return () => clearInterval(interval);


// }, [selectedVenueId]);



//   // TODO: Backend developer will implement organization fetching
//   const fetchOrganizations = async () => {
//     setLoading(true)
//     // Static placeholder data - Backend developer should replace with API call
//     // Example:
//     // const response = await fetch('YOUR_API_URL/organization/fetch/hierarchical', {
//     //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//     // });
//     // const data = await response.json();
    
//     // Static mock data for UI preview
//     const mockOrgs = []
//     setOrganizations(mockOrgs)
//     setLoading(false)
//   }
//   useEffect(() => {
//     fetchOrganizations()
//   }, [])
//   useEffect(() => {
//     if (selectedOrganizationId && organizations.length > 0) {
//       const org = findOrganizationById(organizations, selectedOrganizationId)
//       if (org) {
//         setSelectedOrganizationData(getOrganizationCardProps(org))
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     selectedOrganizationId,
//     organizations,
//     organizationLockStates,
//     bulkLockProcessing,
//     lockErrors,
//     organizationTemperatures,
//     temperatureProcessing,
//     temperatureErrors,
//     organizationPowerStates,
//     powerProcessing,
//     powerErrors,
//   ])
//   if (loading) {
//     return (
//       <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
//         <div className="flex justify-center items-center w-full h-64">
//           <div className="text-lg text-gray-600">Loading organizations...</div>
//         </div>
//       </div>
//     )
//   }
//   if (error) {
//     return (
//       <div className="flex w-full flex-col lg:flex-row h-full bg-gray-100  font-inter rounded-md overflow-hidden">
//         <div className="flex flex-col justify-center items-center w-full h-64 space-y-4">
//           <div className="text-lg text-red-600">Error: {error}</div>
//           {error === 'Authentication required. Please login.' ? (
//             <div className="text-sm text-gray-600 text-center px-4">
//               <p>You need to login first. Please go to the login page.</p>
//             </div>
//           ) : (
//             <>
//               <div className="text-sm text-gray-600 text-center px-4 max-w-lg">
//                 <p className="mb-2">{error}</p>
//                 {error.includes('Cannot connect to backend') && (
//                   <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
//                     <p className="font-semibold mb-1">Troubleshooting:</p>
//                     <ul className="text-left list-disc list-inside space-y-1 text-xs">
//                       <li>Make sure your backend server is running</li>
//                       <li>Check if the backend URL is correct: <code className="bg-gray-100 px-1">{import.meta.env.VITE_BACKEND_API || 'http://localhost:3001'}</code></li>
//                       <li>If you changed .env file, restart your dev server (npm run dev)</li>
//                     </ul>
//                   </div>
//                 )}
//                 {error.includes('API endpoint not found') && (
//                   <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
//                     <p className="text-xs">The endpoint <code className="bg-gray-100 px-1">/organization/fetch/hierarchical</code> might not exist on your backend.</p>
//                   </div>
//                 )}
//               </div>
//               <button onClick={fetchOrganizations} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2">
//                 Retry
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     )
//   }

//   const handleFreezerDeviceSelect = (deviceId) => {
//     setSelectedFreezerDeviceId(deviceId)
//   }
//   const handleBackToDashboard = () => {
//     setShowDetailPage(false)
//     setSelectedDevice(null)
//   }



//   const location = useLocation()
//   const navigate = useNavigate()

//   // keep selectedVenueId in sync with URL ?venue=
// useEffect(() => {
//   const sp = new URLSearchParams(location.search)
//   const venueFromUrl = sp.get("venue") || ""
//   if (venueFromUrl && venueFromUrl !== selectedVenueId) {
//     setSelectedVenueId(venueFromUrl)
//   }
//   // if there is no venue param, you may want to clear devices
//   if (!venueFromUrl) {
//     // optional: setFreezerDevices([]) // your preference
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [location.search])

// // when organization changes, clear venue query and local selected venue
// useEffect(() => {
//   if (!selectedOrgId) return
//   // clear existing ?venue when organization changes
//   const sp = new URLSearchParams(location.search)
//   if (sp.get("venue")) {
//     sp.delete("venue")
//     navigate(`${location.pathname}?${sp.toString()}`, { replace: true })
//     setSelectedVenueId("")
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [selectedOrgId])





//   return (
//     <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
//       {/* Main Content Area */}
//       <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">
//         {!showDetailPage && (
//           <>
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <p className="text-sm text-[#64748B] font-medium">Organization</p>
//                 {
//                   user?.role === "admin" && 
//                 <OrganizationSelect
//             value={selectedOrgId}
//             onChange={(id) => {
//               setSelectedOrgId(id || user?.organization);
//               setSelectedVenueId(""); // reset venue when org changes
//             }}
//             className="mt-1"
//           />
//                 }
//                 <h1 className="text-2xl text-[#1E293B] font-bold">
//                   {(selectedOrganizationData?.organizationName || "Karim Containers LTD").replace("SSUET_MAIN", "Karim Containers LTD")}
//                 </h1>
//               </div>
//               <div className="flex items-center">
//                 {/* <button className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-[#1D4ED8] transition-colors">
//                   <span>Venue</span>
//                   <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="m6 9 6 6 6-6"/>
//                     </svg>
//                   </div> */}
//                 {/* </button> */}

                
                
//                 {/* <VenueSelect
//                 organizationId={selectedOrgId || user?.organization}
//                 value={selectedVenueId}
//                 onChange={(id) => setSelectedVenueId(id)}
//                 className="mt-1"
//               /> */}
                
//               <VenueSelect
//                 organizationId={selectedOrgId || user?.organization}
//                 value={selectedVenueId}
//                 onChange={(id) => {
//                   setSelectedVenueId(id)
//                   const basePath = location.pathname.split("?")[0]
//                   if (id) navigate(`${basePath}?venue=${id}`, { replace: false })
//                   else navigate(basePath, { replace: false })
//                 }}
//                 className="mt-1"
//                 excludeFirstN={user?.role === "user" ? 4 : 0} // <-- important
//               />

            
//               </div>
//             </div>

//             {/* Freezer Device Cards Grid with Fixed Height and Scroll */}
//             <div className="flex-1 min-h-0">
//               <div className="freezer-cards-container custom-scrollbar">
//                 {/* {freezerDevices.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                     <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                     </svg>
//                     <p className="text-lg font-medium">No Freezer Devices Found</p>
//                     <p className="text-sm">Add some freezer devices to get started</p>
//                   </div>
//                 ) : (
//                   <div className="freezer-cards-grid freezer-cards-container">
//                     {freezerDevices.map((device) => (
//                       <FreezerDeviceCard
//                         key={device.id}
//                         deviceId={device.deviceId}
//                         ambientTemperature={device.ambientTemperature}
//                         freezerTemperature={device.freezerTemperature}
//                         batteryLow={device.batteryLow}
//                         onCardSelect={() => handleFreezerDeviceSelect(device.id)}
//                         isSelected={device.id === selectedFreezerDeviceId}
//                       />
//                     ))}
//                   </div>
//                 )} */}

//                 {freezerDevices.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
//                 <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//                 <p className="text-lg font-medium">No Freezer Devices Found</p>
//                 <p className="text-sm">Add some freezer devices to get started</p>
//               </div>
//             ) : (
//               <div className="freezer-cards-grid freezer-cards-container">
//                 {freezerDevices.map((device) => {
                  
//                   return(
//                   <FreezerDeviceCard
//                     key={device._id}
//                     deviceId={device.deviceId}
//                     ambientTemperature={device?.AmbientData?.temperature}
//                     freezerTemperature={device?.FreezerData?.temperature}
//                     batteryLow={device?.batteryAlert || false}
//                     refrigeratorAlert = {device?.refrigeratorAlert || false}
//                     onCardSelect={() => handleFreezerDeviceSelect(device._id)}
//                     isSelected={device._id === selectedFreezerDeviceId}
//                   />
//                 )})}
//               </div>
//             )}

//               </div>
//             </div>

//             {/* Bottom Section: Refrigerator Alert and Battery Alert - Fixed Height */}
//             {/* <div className="flex-shrink-0">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
//                 <div className="p-4" style={{backgroundColor: '#07518D12', borderRadius: '20px'}}>
//                   <MaintenanceList items={maintenanceItems} />
//                 </div>
                
                
//                 <div className="p-4" style={{backgroundColor: '#07518D12', borderRadius: '20px'}}>
//                   <BatteryAlert items={maintenanceItems} />
//                 </div>
//               </div>
//             </div> */}

//             <AlertsPanel organizationId={selectedOrgId}/>
//           </>
//         )}
        
//         {showDetailPage && (
//           <OrganizationDetailContent
//             className="flex-grow overflow-y-auto"
//             organizationId={selectedOrganizationId}
//             organizationName={selectedOrganizationData?.organizationName || ""}
//             onBack={handleBackToDashboard}
//             organizations={organizations}
//             websocket={null}
//             connectionStatus={connectionStatus}
//             onDeviceTemperatureChange={handleOrganizationTemperatureChange}
//             onDevicePowerChange={handleOrganizationPowerChange}
//             onDeviceSelect={handleDeviceSelect}
//           />
//         )}
//       </div>

//       {/* Right Sidebar - Venue Details Panel */}
//       <div className="dashboard-right-panel shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar p-4 lg:p-6 border-l border-[#E5E7EB]/40 bg-white flex-shrink-0">
//         {selectedFreezerDeviceId ? (
//           // Show venue details for selected device
//           (() => {
//             const selectedDevice = freezerDevices.find(d => d._id === selectedFreezerDeviceId)
            
//             return (
//               <VenueDetailsPanel
//                 venueName="Karim Korangi Branch"
//                 freezerTemperature={selectedDevice?.AmbientData?.temperature || 0}
//                 ambientTemperature={selectedDevice?.FreezerData?.temperature|| 0}
//                 batteryLow={selectedDevice?.batteryLow || false}
//                 needMaintenance={selectedDevice?.batteryLow || false}
//                 apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
//                 chartData={chartData.map(item => ({ date: item.name, value: item.energy }))}
//                 organizationId = {selectedOrgId}
//               />
//             )
//           })()
//         ) : (
//           // Show default venue details if no device is selected
//           <VenueDetailsPanel
//             venueName="Karim Korangi Branch"
//             freezerTemperature={-4}
//             ambientTemperature={25}
//             batteryLow={true}
//             needMaintenance={true}
//             apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
//             chartData={chartData.map(item => ({ date: item.name, value: item.energy }))}
//             organizationId = {selectedOrgId}
//           />
//         )}
//       </div>
//     </div>
//   )
// }














// src/pages/Dashboard.jsx
"use client"
import React, { useState, useEffect, useMemo } from "react"
import FreezerDeviceCard from "./FreezerDeviceCard"
import VenueDetailsPanel from "./VenueDetailsPanel"
import OrganizationSelect from "./OrganizationSelect"
import VenueSelect from "./VenueSelect"
import AlertsPanel from "./AlertsPanel"
import "../../styles/pages/Dashboard/dashboard-styles.css"
import "../../styles/pages/Dashboard/freezer-cards-responsive.css"
import { useStore } from "../../contexts/storecontexts"
import { useLocation, useNavigate } from "react-router-dom"

const mockFreezerDevices = [
  /* keep if you want placeholder cards when empty; otherwise devices come from API */
]

const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050"

export default function Dashboard() {
  // -------------------------
  // top-level hooks (always called, stable order)
  // -------------------------
  const { user } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  // -------------------------
  // minimal state for UI
  // -------------------------
  const [organizations, setOrganizations] = useState([])
  const [freezerDevices, setFreezerDevices] = useState(mockFreezerDevices)
  const [selectedFreezerDeviceId, setSelectedFreezerDeviceId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedOrgId, setSelectedOrgId] = useState("")
  const [selectedVenueId, setSelectedVenueId] = useState("")
  const [showDetailPage, setShowDetailPage] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState(null)

  // -------------------------
  // helpers (pure utility, no hooks inside)
  // -------------------------
  const getAllDevicesInOrganization = (org) => {
    let devices = [...(org.devices || [])]
    if (org.subOrganizations) {
      org.subOrganizations.forEach((subOrg) => {
        devices = devices.concat(getAllDevicesInOrganization(subOrg))
      })
    }
    return devices
  }

  const findOrganizationById = (orgs, id) => {
    for (const org of orgs) {
      if (String(org.id) === String(id) || String(org._id) === String(id)) return org
      if (org.subOrganizations) {
        const found = findOrganizationById(org.subOrganizations, id)
        if (found) return found
      }
    }
    return null
  }

  // -------------------------
  // derived data (no useEffect)
  // -------------------------
  const selectedOrganizationData = useMemo(() => {
    if (!selectedOrgId || organizations.length === 0) return null
    const org = findOrganizationById(organizations, selectedOrgId)
    if (!org) return null
    const allDevices = getAllDevicesInOrganization(org)
    return {
      organizationName: org.name || org.organization_name || selectedOrgId,
      deviceCount: allDevices.length,
    }
  }, [selectedOrgId, organizations])

  // -------------------------
  // EFFECT #1: fetchOrganizations on mount (keeps your placeholder behavior)
  // -------------------------
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true)
        setError(null)
        // placeholder empty list for now (same behavior you had)
        // Replace with API call when backend ready:
        // const token = localStorage.getItem("token")
        // const res = await fetch(`${BASE}/organization/fetch/hierarchical`, { headers: { Authorization: `Bearer ${token}` }, credentials: "include" })
        // const data = await res.json()
        const mockOrgs = []
        setOrganizations(mockOrgs)
      } catch (err) {
        setError(err.message || "Failed to load organizations")
      } finally {
        setLoading(false)
      }
    }

    fetchOrganizations()
  }, [])

  // -------------------------
  // EFFECT #2: keep selectedVenueId synced with URL ?venue=
  // -------------------------
  useEffect(() => {
    const sp = new URLSearchParams(location.search)
    const venueFromUrl = sp.get("venue") || ""
    if (venueFromUrl !== selectedVenueId) {
      setSelectedVenueId(venueFromUrl)
    }
    // no dependencies other than location.search so this always runs when URL changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  // -------------------------
  // EFFECT #3: fetch devices when selectedVenueId changes
  // -------------------------
  useEffect(() => {
    if (!selectedVenueId) {
      setFreezerDevices([]) // clear when no venue
      return
    }

    let mounted = true
    const fetchDevices = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${BASE}/device/device-by-venue/${selectedVenueId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })
        const data = await res.json()
        if (!mounted) return
        if (res.ok) {
          setFreezerDevices(data.devices || [])
        } else {
          setFreezerDevices([])
          console.error("Device fetch error:", data?.message)
        }
      } catch (err) {
        if (!mounted) return
        console.error("Device fetch error:", err)
        setFreezerDevices([])
      }
    }

    fetchDevices()
    return () => {
      mounted = false
    }
  }, [selectedVenueId])

  // -------------------------
  // simple handlers (kept minimal)
  // -------------------------
  const handleFreezerDeviceSelect = (deviceId) => {
    setSelectedFreezerDeviceId(deviceId)
  }

  const handleBackToDashboard = () => {
    setShowDetailPage(false)
    setSelectedDevice(null)
  }

  // Admin: when org changes, reset venue selection (keeps URL clean)
  const onOrganizationChange = (id) => {
    setSelectedOrgId(id || user?.organization)
    setSelectedVenueId("")
    // remove ?venue from URL
    const sp = new URLSearchParams(location.search)
    if (sp.get("venue")) {
      sp.delete("venue")
      navigate(location.pathname + (sp.toString() ? `?${sp.toString()}` : ""), { replace: true })
    }
  }

  // Update URL when VenueSelect is used (or you can dispatch to redux)
  const onVenueChange = (id) => {
    setSelectedVenueId(id)
    const basePath = location.pathname.split("?")[0]
    if (id) navigate(`${basePath}?venue=${id}`, { replace: false })
    else navigate(basePath, { replace: false })
  }

  // -------------------------
  // render states for loading / error
  // -------------------------
  if (loading) {
    return (
      <div className="flex w-full flex-row h-full bg-gray-100 font-inter rounded-md overflow-hidden">
        <div className="flex justify-center items-center w-full h-64">
          <div className="text-lg text-gray-600">Loading organizations...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex w-full flex-col lg:flex-row h-full bg-gray-100  font-inter rounded-md overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full h-64 space-y-4">
          <div className="text-lg text-red-600">Error: {error}</div>
          <button onClick={() => { /* try refetch */ window.location.reload() }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2">Retry</button>
        </div>
      </div>
    )
  }

  // -------------------------
  // main JSX (kept same layout)
  // -------------------------
  return (
    <div className="flex w-full flex-row h-full font-inter rounded-md bg-[#F5F6FA]">
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 space-y-6 overflow-y-auto custom-scrollbar dashboard-main-content bg-white shadow-sm border border-[#E5E7EB]/30 p-4 lg:p-6">
        {!showDetailPage && (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-[#64748B] font-medium">Organization</p>
                {user?.role === "admin" && (
                  <OrganizationSelect
                    value={selectedOrgId}
                    onChange={onOrganizationChange}
                    className="mt-1"
                  />
                )}
                <h1 className="text-2xl text-[#1E293B] font-bold">
                  {(selectedOrganizationData?.organizationName || "Karim Containers LTD").replace("SSUET_MAIN", "Karim Containers LTD")}
                </h1>
              </div>

              <div className="flex items-center">
                <VenueSelect
                  organizationId={selectedOrgId || user?.organization}
                  value={selectedVenueId}
                  onChange={onVenueChange}
                  className="mt-1"
                  excludeFirstN={user?.role === "user" ? 4 : 0}
                />
              </div>
            </div>

            {/* Freezer Device Cards Grid */}
            <div className="flex-1 min-h-0">
              <div className="freezer-cards-container custom-scrollbar">
                {freezerDevices.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-[#64748B]">
                    <svg className="w-16 h-16 mb-4 text-[#E2E8F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-lg font-medium">No Freezer Devices Found</p>
                    <p className="text-sm">Add some freezer devices to get started</p>
                  </div>
                ) : (
                  <div className="freezer-cards-grid freezer-cards-container">
                    {freezerDevices.map((device) => (
                      <FreezerDeviceCard
                        key={device._id ?? device.id}
                        deviceId={device.deviceId}
                        ambientTemperature={device?.AmbientData?.temperature ?? device.ambientTemperature}
                        freezerTemperature={device?.FreezerData?.temperature ?? device.freezerTemperature}
                        batteryLow={device?.batteryAlert ?? device?.batteryLow ?? false}
                        refrigeratorAlert={device?.refrigeratorAlert ?? false}
                        onCardSelect={() => handleFreezerDeviceSelect(device._id ?? device.id)}
                        isSelected={(device._id ?? device.id) === selectedFreezerDeviceId}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <AlertsPanel organizationId={selectedOrgId} />
          </>
        )}

        {showDetailPage && (
          <div className="flex-grow overflow-y-auto">
            {/* simplified detail area: you can re-add OrganizationDetailContent when ready */}
            <div>Detail page</div>
            <button onClick={handleBackToDashboard}>Back</button>
          </div>
        )}
      </div>

      {/* Right Sidebar - Venue Details Panel */}
      <div className="dashboard-right-panel shadow-sm flex flex-col h-full overflow-y-auto custom-scrollbar p-4 lg:p-6 border-l border-[#E5E7EB]/40 bg-white flex-shrink-0">
        {selectedFreezerDeviceId ? (
          (() => {
            const selected = freezerDevices.find((d) => (d._id ?? d.id) === selectedFreezerDeviceId)
            return (
              <VenueDetailsPanel
                venueName={selected?.venue_name ?? "Venue"}
                freezerTemperature={selected?.AmbientData?.temperature ?? 0}
                ambientTemperature={selected?.FreezerData?.temperature ?? 0}
                batteryLow={selected?.batteryLow ?? selected?.batteryAlert ?? false}
                needMaintenance={selected?.batteryLow ?? false}
                apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
                chartData={[]}
                organizationId={selectedOrgId}
              />
            )
          })()
        ) : (
          <VenueDetailsPanel
            venueName="Karim Korangi Branch"
            freezerTemperature={-4}
            ambientTemperature={25}
            batteryLow={true}
            needMaintenance={true}
            apiKey="8dbf5d2a37c4178b4b03e6c49ae3f9e7"
            chartData={[]}
            organizationId={selectedOrgId}
          />
        )}
      </div>
    </div>
  )
}
