"use client"

import { useState, useEffect } from "react"
// TODO: Backend developer will add WebSocket service
import Swal from "sweetalert2"
import "../../styles/pages/Dashboard/dashboard-styles.css"

// SvgCardBackground Component - Responsive
const SvgCardBackground = ({ children, className = "", cardWidth = 30, cardHeight = 200, ...props }) => {
  // Original SVG dimensions
  const originalSvgWidth = 711
  const originalSvgHeight = 444
  
  // Extract custom props to avoid passing them to DOM
  const { cardWidth: _, cardHeight: __, ...domProps } = props
  
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        maxWidth: '100%',
        // overflow: 'hidden', // Ensure content doesn't overflow the rounded corners
      }}
      {...domProps}
    >
      <svg
        width="100%" // Make SVG fill its parent div
        height="100%" // Make SVG fill its parent div
        viewBox={`0 0 ${originalSvgWidth} ${originalSvgHeight}`} // Maintain original viewBox
        preserveAspectRatio="xMidYMid meet" // Maintain aspect ratio to prevent distortion
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <g filter="url(#filter0_d_912_225)">
          <path
            d="M4 50C4 22.3858 26.3858 0 54 0H656.738C684.353 0 706.738 22.3858 706.738 50V180.704V267.69C706.738 295.304 684.353 317.69 656.738 317.69H554.081C523.421 317.69 501.589 347.471 510.814 376.71C520.039 405.949 498.207 435.73 467.547 435.73H314.079H54C26.3858 435.73 4 413.345 4 385.73V50Z"
            fill="white"
          />
          <path
            d="M54 0.5H656.738C684.076 0.5 706.238 22.6619 706.238 50V267.689C706.238 295.028 684.076 317.189 656.738 317.189H554.081C523.083 317.189 501.01 347.299 510.337 376.86C519.46 405.777 497.869 435.23 467.547 435.23H54C26.662 435.23 4.50007 413.068 4.5 385.73V50C4.5 22.8754 26.3171 0.846383 53.3604 0.503906L54 0.5Z"
            stroke="#717171"
            strokeOpacity="0.42"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_912_225"
            x="0"
            y="0"
            width="710.738"
            height="443.73"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_912_225" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_912_225" result="shape" />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  )
}

//   EventsSchedule Component with props from Dashboard
const EventsSchedule = ({
  selectedOrganizationId,
  selectedOrganizationName,
  organizations = [],
  getAllDevicesInOrganization,
  isModalOpen, //   Received modal state as prop
  onModalOpenChange, //   Received modal setter as prop
}) => {
  //   Real state management (from SchedulerTest.jsx)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  // const [isModalOpen, setIsModalOpen] = useState(false); // ❌ Removed local state, now controlled by prop
  // TODO: Backend developer will add WebSocket connection

  //   Form state (from SchedulerTest.jsx)
  const [newEvent, setNewEvent] = useState({
    days: [], // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    startTime: "",
    endTime: "",
    isEnabled: true,
  })

  //   Days mapping for backend (from SchedulerTest.jsx)
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const dayKeyMap = {
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
    Sat: "sat",
    Sun: "sun",
  }

  //   UPDATED: Fetch events filtered by selected organization
  const fetchEvents = async () => {
    try {
      setLoading(true)
      console.log(`🔄 Fetching events for organization: ${selectedOrganizationName || "ALL"}`)

      // Check if API URL is available
      if(!import.meta.env.VITE_BACKEND_API) {
        console.warn('VITE_BACKEND_API environment variable is not set');
        setEvents([])
        setLoading(false)
        return
      }

      const token = localStorage.getItem('token');
      if(!token) {
        console.warn('No authentication token found');
        setEvents([])
        setLoading(false)
        return
      }

      // TODO: Backend developer will implement event fetching
      // Build API URL with optional organization filter
      // let apiUrl = `${YOUR_API_URL}/scheduler/events`
      // if (selectedOrganizationName) {
      //   apiUrl += `?organization=${encodeURIComponent(selectedOrganizationName)}`
      // }
      // const response = await fetch(apiUrl, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      // const data = await response.json();
      // setEvents(Array.isArray(data) ? data : (data.events || []));
      
      // Static placeholder
      setEvents([]);
    } catch (error) {
      console.error("Failed to fetch events:", error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  //   UPDATED: Re-fetch events when selected organization changes
  useEffect(() => {
    fetchEvents()

    // TODO: Backend developer will implement WebSocket listeners
    // const websocket = useWebSocket()
    // websocket.on("scheduled-event-executed", handleEventExecuted)
    // websocket.on("scheduled-event-failed", handleEventFailed)
    // return () => {
    //   websocket.off("scheduled-event-executed", handleEventExecuted)
    //   websocket.off("scheduled-event-failed", handleEventFailed)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationName])

  //   Real-time event execution handlers (from SchedulerTest.jsx)
  // TODO: Backend developer will implement these handlers when WebSocket is connected
  // const handleEventExecuted = (data) => {
  //   console.log("🎉 Event executed successfully:", data)
  //   Swal.fire({
  //     title: "Event Executed!",
  //     html: `
  //       <div style="text-align: left;">
  //         <p><strong>Event ID:</strong> ${data.eventId}</p>
  //         <p><strong>Action:</strong> ${data.action.toUpperCase()}</p>
  //         <p><strong>Devices:</strong> ${data.deviceCount}</p>
  //         <p><strong>Organization:</strong> ${data.organizationName}</p>
  //         <p><strong>Executed At:</strong> ${new Date(data.executedAt).toLocaleString()}</p>
  //       </div>
  //     `,
  //     icon: "success",
  //     timer: 5000,
  //     showConfirmButton: true,
  //     position: "top-end",
  //     toast: true,
  //   })
  //   setEvents((prev) =>
  //     prev.map((event) =>
  //       event.id === data.eventId ? { ...event, lastExecuted: data.executedAt, status: "success" } : event,
  //     ),
  //   )
  // }

  // const handleEventFailed = (data) => {
  //   console.log("❌ Event failed:", data)
  //   Swal.fire({
  //     title: "Event Failed!",
  //     html: `
  //       <div style="text-align: left;">
  //         <p><strong>Event ID:</strong> ${data.eventId}</p>
  //         <p><strong>Action:</strong> ${data.action.toUpperCase()}</p>
  //         <p><strong>Error:</strong> ${data.error}</p>
  //         <p><strong>Organization:</strong> ${data.organizationName}</p>
  //         <p><strong>Failed At:</strong> ${new Date(data.failedAt).toLocaleString()}</p>
  //       </div>
  //     `,
  //     icon: "error",
  //     position: "top-end",
  //     toast: true,
  //   })
  //   setEvents((prev) =>
  //     prev.map((event) =>
  //       event.id === data.eventId
  //         ? { ...event, lastExecuted: data.failedAt, status: "failed", error: data.error }
  //         : event,
  //     ),
  //   )
  // }

  //   Toggle event status
  const toggleEventEnabled = (eventId) => {
    // Backend developer will implement logic here
  }

  //   Helper functions (from SchedulerTest.jsx)
  const findOrganizationById = (orgs, id) => {
    for (const org of orgs) {
      if (org.id === id) return org
      if (org.subOrganizations) {
        const found = findOrganizationById(org.subOrganizations, id)
        if (found) return found
      }
    }
    return null
  }

  const generateCronPattern = (selectedDays, startTime) => {
    const [hour, minute] = startTime.split(":").map(Number)
    const dayMap = {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    }

    if (selectedDays.length === 7) {
      return `${minute} ${hour} * * *` // Daily
    }

    const cronDays = selectedDays.map((day) => dayMap[day]).join(",")
    return `${minute} ${hour} * * ${cronDays}`
  }

  //   Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDayChange = (day) => {
    setNewEvent((prev) => {
      const updatedDays = prev.days.includes(day) ? prev.days.filter((d) => d !== day) : [...prev.days, day]
      return { ...prev, days: updatedDays }
    })
  }

  //   Create event using selected organization from Dashboard
  const handleAddEvent = (e) => {
    e.preventDefault()
    // Backend developer will implement logic here
  }

  //   LOADING STATE (keep same design)
  if (loading) {
    return (
      <div className="bg-white p-4 flex flex-col items-center font-sans">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg text-gray-600">Loading events...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="EventsScheduleCards bg-white sm:bg-white lg:bg-white p-2 sm:p-3 flex flex-col items-center font-sans z-10 rounded-lg shadow-sm">
      {/* Responsive Header */}
      <header className="w-full flex justify-between items-center mb-3 px-2 sm:px-0">
        <h1 className="text-sm sm:text-base lg:text-lg font-bold text-[#1E293B]">EVENTS</h1>
        <button
          onClick={() => onModalOpenChange(true)}
          className="bg-[#2563EB] text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center text-sm sm:text-base font-bold hover:bg-[#3B82F6] transition-colors duration-200 shadow-sm"
          aria-label="Add new event"
        >  
          +
        </button>
      </header>

      {/* Responsive Events Container */}
      <div className="EventsContainer w-full overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-3 lg:space-x-4 pb-2 px-2 sm:px-0">
          {events.length === 0 ? (
            <p className="text-[#1E293B] text-xs sm:text-sm mx-auto">
              {selectedOrganizationName
                ? `No events for ${selectedOrganizationName}. Click '+' to add!`
                : "No events yet. Click '+' to add!"}
            </p>
          ) : (
            events.map((event) => (
              <SvgCardBackground key={event.id} cardWidth={180} cardHeight={110} className="flex-shrink-0">
                {/* Responsive card layout */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-2 text-[#1E293B] ">
                  <div className="text-center flex flex-col gap-1 ">
                    <p className="text-xs sm:text-sm font-bold text-[#2563EB]">
                      {event.startTime} - {event.endTime}
                    </p>
                    <div className="flex flex-col gap-0">
                      <p className="text-xs text-[#64748B]">Time Range</p>
                      <p className="text-xs font-medium text-[#10B981]">
                        {event.command ? event.command.toUpperCase() : "POWER_ON"}
                      </p>
                    </div>
                  </div>

                  {/* Day display - Responsive */}
                  <div className="text-center">
                    <p className="text-xs text-[#1E293B] font-medium">
                      {(() => {
                        const eventDays = event.eventName
                          ? event.eventName.split(" - ")[1]?.split(" Schedule")[0] || "Daily"
                          : "Daily"
                        return eventDays
                      })()}
                    </p>
                  </div>
                </div>
                {/* Responsive Enable/Disable Button */}
                <button
                  onClick={() => toggleEventEnabled(event.id)}
                  className={`absolute px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 shadow-sm
                    ${event.isActive ? "bg-[#10B981] text-white hover:bg-[#059669]" : "bg-[#E5E7EB]/40 text-[#64748B] hover:bg-[#D1D5DB]"}`}
                  style={{
                    right: "4px",
                    bottom: "4px",
                  }}
                >
                  {event.isActive ? "ON" : "OFF"}
                </button>
              </SvgCardBackground>
            ))
          )}
        </div>
      </div>

      {/* Modal - Keep exactly the same */}
      {isModalOpen && ( //   Use prop to conditionally render modal
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-100">
          <div className="bg-white p-8 shadow-sm w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Event</h2>

            <form onSubmit={handleAddEvent}>
              {/* Day Selection - Keep same design */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Days:</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {daysOfWeek.map((day) => (
                    <label key={day} className="flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 rounded"
                        checked={newEvent.days.includes(day)}
                        onChange={() => handleDayChange(day)}
                      />
                      <span className="ml-2">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Start Time - Keep same design */}
              <div className="mb-4">
                <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">
                  Start Time:
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={newEvent.startTime}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* End Time - Keep same design */}
              <div className="mb-6">
                <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">
                  End Time:
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={newEvent.endTime}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* Enable/Disable Toggle - Keep same design */}
              <div className="mb-6 flex items-center justify-between">
                <label htmlFor="isEnabled" className="text-gray-700 text-sm font-bold">
                  Enable Event:
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="isEnabled"
                    name="isEnabled"
                    checked={newEvent.isEnabled}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {newEvent.isEnabled ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>

              {/* Form Actions - Keep same design */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => onModalOpenChange(false)} //   Use prop to close modal
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  )
}

export default EventsSchedule
