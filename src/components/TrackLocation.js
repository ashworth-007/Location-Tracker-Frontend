import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrackLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const navigate = useNavigate();

  // Track user's location
  useEffect(() => {
    let watchId;

    const trackUserLocation = () => {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
      }
    };

    trackUserLocation();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId); 
      }
    };
  }, []);

  
  useEffect(() => {
    const sendLocation = async () => {
      const token = localStorage.getItem("token");
      const { latitude, longitude } = location;

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      if (latitude == null || longitude == null) {
        console.warn("Location unavailable: waiting for GPS signal or permission.");
        return;
      }

      try {
        await axios.post(
          "https://location-tracker-backend-fy95.onrender.com/location",
          { latitude, longitude },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(`Location sent: ${latitude}, ${longitude}`);
      } catch (error) {
        console.error("Error sending location:", error);
      }
    };

    const interval = setInterval(sendLocation, 4000);

    return () => clearInterval(interval); 
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Tracking Your Location</h2>
        <p>
          Current Location:{" "}
          {location.latitude && location.longitude
            ? `${location.latitude}, ${location.longitude}`
            : "Fetching location..."}
        </p>
        <p className="mt-4">
          Your location is being tracked. To view it, return to the home page and
          log in with admin@gmail.com & password-"123456789". After logging in,
          go to the admin panel.
        </p>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TrackLocation;
