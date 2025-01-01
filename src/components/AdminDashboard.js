import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/admin/users/${userId}/locations`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4">
        Admin Dashboard
      </h1>
      <h2 className="text-xl mb-4">List of Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">
          No users found. Please log in as admin. Email-{" "}
          <span className="text-green-500">admin@gmail.com</span> & password -{" "}
          <span className="text-green-500">123456789</span>
        </p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user._id} className="flex mx-1 items-center">
              <span>
                {user.name} ({user.email})
              </span>
              <button
                onClick={() => handleUserClick(user._id)} // Call function to redirect
                className="text-blue-500 mx-3 hover:underline"
              >
                View Locations
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
