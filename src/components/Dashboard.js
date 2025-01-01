import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const [locations, setLocations] = useState([]);
  const { userId } = useParams(); 
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    if (userId) {
      fetchLocations(userId); 
    }
  }, [userId]);

  const fetchLocations = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/admin/users/${id}/locations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLocations(response.data);
    } catch (error) {
      alert("Failed to fetch locations!");
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Location Logs</h2>
      {locations.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium text-gray-600">Location Logs</h3>
          <ul className="space-y-2">
            {locations.map((loc) => (
              <li key={loc._id} className="p-3 border rounded-lg">
                Lat: {loc.latitude}, Long: {loc.longitude} at{" "}
                {new Date(loc.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No locations found for this user.</p>
      )}
    </div>
  );
};

export default Dashboard;
