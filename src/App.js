import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Mahasiswa from './pages/Mahasiswa';
import Dosen from './pages/Dosen';
import MataKuliah from './pages/MataKuliah';
import KRS from './pages/KRS';
import Nilai from './pages/Nilai';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '24px', background: '#f4f6fa' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mahasiswa" element={<Mahasiswa />} />
            <Route path="/dosen" element={<Dosen />} />
            <Route path="/matakuliah" element={<MataKuliah />} />
            <Route path="/krs" element={<KRS />} />
            <Route path="/nilai" element={<Nilai />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
