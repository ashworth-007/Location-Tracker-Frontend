import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserLocationPage = () => {
  const { id } = useParams(); 
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      const token = localStorage.getItem("token"); 
      try {
        const response = await axios.get(
          `http://localhost:5000/admin/users/${id}/locations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLocations(response.data);
      } catch (error) {
        setError("Failed to fetch locations");
      }
    };

    fetchLocations();
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Location Logs</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Location Logs for User {id}</h3>
        {locations.length > 0 ? (
          <ul>
            {locations.map((location) => (
              <li
                key={location._id}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <span>
                  {new Date(location.timestamp).toLocaleString()} - Latitude:{" "}
                  {location.latitude}, Longitude: {location.longitude}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No location logs found</p>
        )}
      </div>
    </div>
  );
};

export default UserLocationPage;
