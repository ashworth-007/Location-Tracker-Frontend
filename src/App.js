import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import TrackLocation from './components/TrackLocation';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import LocationLogs from './components/LocationLogs';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/track-location" element={<TrackLocation />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users/:id/locations" element={<LocationLogs />} />
      </Routes>
    </Router>
  );
};

export default App;
