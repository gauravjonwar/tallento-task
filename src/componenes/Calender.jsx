import React, { useState, useEffect } from "react";

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState(() => {
    // Initialize from session storage or empty object
    const savedBookings = sessionStorage.getItem("bookedSlots");
    return savedBookings ? JSON.parse(savedBookings) : {};
  });
  const [showSlots, setShowSlots] = useState(false);

  // Save bookedSlots to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("bookedSlots", JSON.stringify(bookedSlots));
  }, [bookedSlots]);

  // Generate time slots with 30 min interval
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  // Convert 24-hour format to 12-hour format with AM/PM
  const formatTimeToHuman = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour12 =
      parseInt(hours) === 0
        ? 12
        : parseInt(hours) > 12
        ? parseInt(hours) - 12
        : parseInt(hours);
    const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  const timeSlots = generateTimeSlots();

  // Get booking count for a specific date and time
  const getBookingCount = (date, time) => {
    const key = `${date}-${time}`;
    return bookedSlots[key] || 0;
  };

  // Check if slot is available (less than 5 bookings)
  const isSlotAvailable = (date, time) => {
    return getBookingCount(date, time) < 5;
  };

  // Handle date selection
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedSlot("");
    setShowSlots(true);
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    if (isSlotAvailable(selectedDate, slot)) {
      setSelectedSlot(slot);
    }
  };

  // Handle booking
  const handleBookNow = () => {
    if (selectedDate && selectedSlot) {
      const key = `${selectedDate}-${selectedSlot}`;
      setBookedSlots((prev) => ({
        ...prev,
        [key]: (prev[key] || 0) + 1,
      }));

      // Format date and time for human-readable display
      const formattedDate = new Date(
        selectedDate + "T00:00:00"
      ).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Convert 24-hour format to 12-hour format with AM/PM
      const [hours, minutes] = selectedSlot.split(":");
      const hour12 =
        parseInt(hours) === 0
          ? 12
          : parseInt(hours) > 12
          ? parseInt(hours) - 12
          : parseInt(hours);
      const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
      const formattedTime = `${hour12}:${minutes} ${ampm}`;

      // Show success message with human-readable format
      alert(
        `Slot booked successfully!\n\nDate: ${formattedDate}\nTime: ${formattedTime}`
      );

      // Reset all UI state to fresh start
      setSelectedDate("");
      setSelectedSlot("");
      setShowSlots(false);
    }
  };

  // Function to clear all bookings (useful for testing)
  const clearAllBookings = () => {
    setBookedSlots({});
    sessionStorage.removeItem("bookedSlots");
  };

  // Get today's date for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        minHeight: "100vh",
        padding: "2rem 1rem",
        color: "white",
      }}
    >
      <div
        className="main-container"
        style={{
          maxWidth: "60%",
          minHeight: "calc(100vh - 4rem)",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "1rem",
          padding: "2rem",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h1
          className="main-title"
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "0.5rem",
            background: "linear-gradient(45deg, #ec4899, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Book Your Slot
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginBottom: "3rem",
          }}
        >
          Select a date and choose your preferred time slot
        </p>

        {/* Debug info - shows total bookings (you can remove this in production) */}
        {Object.keys(bookedSlots).length > 0 && (
          <div
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              padding: "0.5rem 1rem",
              background: "rgba(236, 72, 153, 0.1)",
              borderRadius: "0.5rem",
              border: "1px solid rgba(236, 72, 153, 0.2)",
            }}
          >
            <span style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>
              Total Bookings:{" "}
              {Object.values(bookedSlots).reduce(
                (sum, count) => sum + count,
                0
              )}
            </span>
            <button
              onClick={clearAllBookings}
              style={{
                marginLeft: "1rem",
                padding: "0.25rem 0.75rem",
                fontSize: "0.8rem",
                background: "rgba(236, 72, 153, 0.2)",
                border: "1px solid rgba(236, 72, 153, 0.4)",
                borderRadius: "0.25rem",
                color: "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(236, 72, 153, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(236, 72, 153, 0.2)";
              }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div
          className="main-content"
          style={{
            display: "flex",
            gap: "3rem",
            alignItems: "flex-start",
            flexDirection: !selectedDate ? "column" : "row",
            transition: "all 0.5s ease",
          }}
        >
          {/* Date Picker Section */}
          <div
            className="date-picker-section"
            style={{
              flex: !selectedDate ? "1" : "0 0 400px",
              width: !selectedDate ? "100%" : "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: !selectedDate ? "center" : "flex-start",
              transition: "all 0.5s ease",
              transform: !selectedDate ? "scale(1.2)" : "scale(1)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
                width: "100%",
              }}
            >
              <label
                className="date-picker-label"
                style={{
                  fontSize: !selectedDate ? "1.8rem" : "1.3rem",
                  fontWeight: "600",
                  color: "#f1f5f9",
                  textAlign: "center",
                  background: "linear-gradient(45deg, #ec4899, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  transition: "all 0.5s ease",
                }}
              >
                📅 Select Your Preferred Date
              </label>

              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))",
                    padding: !selectedDate ? "2rem" : "1.5rem",
                    borderRadius: "1rem",
                    border: "2px solid rgba(236, 72, 153, 0.3)",
                    backdropFilter: "blur(15px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    transition: "all 0.5s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 12px 40px rgba(236, 72, 153, 0.2)";
                    e.target.style.borderColor = "#ec4899";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
                    e.target.style.borderColor = "rgba(236, 72, 153, 0.3)";
                  }}
                >
                  {/* Decorative background elements */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-50%",
                      left: "-50%",
                      width: "200%",
                      height: "200%",
                      background:
                        "radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)",
                      animation: "pulse 3s ease-in-out infinite",
                    }}
                  />

                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={today}
                    style={{
                      width: !selectedDate ? "350px" : "280px",
                      padding: !selectedDate ? "1.5rem 2rem" : "1rem 1.5rem",
                      fontSize: !selectedDate ? "1.3rem" : "1.1rem",
                      fontWeight: "500",
                      border: "none",
                      borderRadius: "0.75rem",
                      background: "rgba(255, 255, 255, 0.15)",
                      color: "white",
                      outline: "none",
                      transition: "all 0.5s ease",
                      backdropFilter: "blur(10px)",
                      textAlign: "center",
                      letterSpacing: "0.5px",
                      position: "relative",
                      zIndex: 1,
                    }}
                    onFocus={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.25)";
                      e.target.style.transform = "scale(1.02)";
                      e.target.style.boxShadow =
                        "inset 0 0 20px rgba(236, 72, 153, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.15)";
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />

                  {/* Date icon overlay */}
                  <div
                    style={{
                      position: "absolute",
                      right: "2rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: !selectedDate ? "1.5rem" : "1.2rem",
                      color: "#ec4899",
                      pointerEvents: "none",
                      zIndex: 2,
                      transition: "all 0.5s ease",
                    }}
                  >
                    📆
                  </div>
                </div>

                {/* Selected date display */}
                {selectedDate && (
                  <div
                    style={{
                      marginTop: "1rem",
                      padding: "0.75rem 1.5rem",
                      background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                      borderRadius: "50px",
                      color: "white",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      textAlign: "center",
                      boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
                      animation: "slideIn 0.3s ease",
                    }}
                  >
                    Selected:{" "}
                    {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          {showSlots && selectedDate && (
            <div
              className="slots-section"
              style={{
                flex: "1",
                opacity: showSlots ? 1 : 0,
                transform: showSlots ? "translateX(0)" : "translateX(20px)",
                transition: "all 0.5s ease",
                animation: "slideInRight 0.5s ease",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "1.5rem",
                  color: "#f1f5f9",
                  textAlign: "center",
                }}
              >
                Available Time Slots
              </h3>

              <div
                className="slots-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  maxHeight: "500px",
                  overflowY: "auto",
                  padding: "1rem",
                  background: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {timeSlots.map((slot) => {
                  const isAvailable = isSlotAvailable(selectedDate, slot);
                  const bookingCount = getBookingCount(selectedDate, slot);
                  const isSelected = selectedSlot === slot;

                  return (
                    <div key={slot} style={{ position: "relative" }}>
                      <button
                        className="slot-button"
                        onClick={() => handleSlotSelect(slot)}
                        disabled={!isAvailable}
                        style={{
                          width: "100%",
                          padding: "1rem 1.5rem",
                          borderRadius: "0.75rem",
                          border: isSelected
                            ? "2px solid #ec4899"
                            : "1px solid rgba(255, 255, 255, 0.2)",
                          background: isSelected
                            ? "linear-gradient(135deg, #ec4899, #8b5cf6)"
                            : isAvailable
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(100, 100, 100, 0.3)",
                          color: isAvailable ? "white" : "#64748b",
                          cursor: isAvailable ? "pointer" : "not-allowed",
                          fontSize: "1rem",
                          fontWeight: isSelected ? "600" : "400",
                          transition: "all 0.3s ease",
                          transform: isSelected ? "scale(1.02)" : "scale(1)",
                          boxShadow: isSelected
                            ? "0 5px 20px rgba(236, 72, 153, 0.4)"
                            : "none",
                          opacity: isAvailable ? 1 : 0.5,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onMouseEnter={(e) => {
                          if (isAvailable && !isSelected) {
                            e.target.style.background =
                              "rgba(255, 255, 255, 0.2)";
                            e.target.style.transform = "scale(1.01)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isAvailable && !isSelected) {
                            e.target.style.background =
                              "rgba(255, 255, 255, 0.1)";
                            e.target.style.transform = "scale(1)";
                          }
                        }}
                      >
                        <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                          {formatTimeToHuman(slot)}
                        </span>
                        <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                          {isAvailable
                            ? `${5 - bookingCount} slots left`
                            : "Fully booked"}
                        </span>
                      </button>

                      {/* Book Button - appears below selected slot */}
                      {isSelected && (
                        <div
                          style={{
                            marginTop: "0.5rem",
                            animation: "fadeIn 0.3s ease",
                          }}
                        >
                          <button
                            className="book-button"
                            onClick={handleBookNow}
                            style={{
                              width: "100%",
                              padding: "0.75rem 2rem",
                              fontSize: "1rem",
                              fontWeight: "600",
                              border: "none",
                              borderRadius: "50px",
                              background:
                                "linear-gradient(135deg, #ec4899, #8b5cf6)",
                              color: "white",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              boxShadow: "0 8px 25px rgba(236, 72, 153, 0.4)",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = "scale(1.05)";
                              e.target.style.boxShadow =
                                "0 12px 35px rgba(236, 72, 153, 0.6)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "scale(1)";
                              e.target.style.boxShadow =
                                "0 8px 25px rgba(236, 72, 153, 0.4)";
                            }}
                          >
                            Book
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Selected Info - only shown at bottom when no slot is selected */}
        {selectedDate && !selectedSlot && showSlots && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              background: "rgba(236, 72, 153, 0.1)",
              border: "1px solid rgba(236, 72, 153, 0.3)",
              borderRadius: "0.5rem",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <p style={{ margin: 0, color: "#f1f5f9" }}>
              <strong>Date Selected:</strong>{" "}
              {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
              <br />
              <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Please select a time slot from the right panel
              </span>
            </p>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.1; }
          }
          
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
            opacity: 0;
            position: absolute;
            right: 0;
            width: 100%;
            height: 100%;
          }
          
          input[type="date"]::-webkit-inner-spin-button,
          input[type="date"]::-webkit-clear-button {
            display: none;
          }
          
          input[type="date"]::-webkit-datetime-edit-text,
          input[type="date"]::-webkit-datetime-edit-month-field,
          input[type="date"]::-webkit-datetime-edit-day-field,
          input[type="date"]::-webkit-datetime-edit-year-field {
            color: white;
          }
          
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(236, 72, 153, 0.5);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(236, 72, 153, 0.7);
          }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .main-content {
              flex-direction: column !important;
              align-items: center !important;
            }
            
            .date-picker-section {
              width: 100% !important;
              flex: none !important;
              transform: scale(1) !important;
            }
            
            .date-picker-section input[type="date"] {
              width: 300px !important;
            }
            
            .slots-section {
              width: 100% !important;
              margin-top: 2rem;
            }
          }

          @media (max-width: 768px) {
            .main-container {
              padding: 1rem !important;
              margin: 1rem !important;
            }
            
            .main-title {
              fontSize: 2rem !important;
            }
            
            .date-picker-section input[type="date"] {
              width: 280px !important;
              padding: 1rem !important;
              fontSize: 1rem !important;
            }
            
            .date-picker-label {
              fontSize: 1.2rem !important;
            }
            
            .slots-container {
              maxHeight: 400px !important;
            }
          }

          @media (max-width: 480px) {
            .main-container {
              padding: 1rem 0.5rem !important;
            }
            
            .date-picker-section input[type="date"] {
              width: 250px !important;
              padding: 0.8rem !important;
            }
            
            .slot-button {
              padding: 0.8rem 1rem !important;
              fontSize: 0.9rem !important;
            }
            
            .book-button {
              padding: 0.6rem 1.5rem !important;
              fontSize: 0.9rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Calender;
