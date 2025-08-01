// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shortener from './components/Shortener';
import Statistics from './components/Statistics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shortener />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/:shortcode" element={<Shortener />} />
      </Routes>
    </Router>
  );
}

export default App;
