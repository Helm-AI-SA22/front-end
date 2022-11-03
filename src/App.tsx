import React from 'react';
import './App.css';

import HomePage  from './pages/HomePage/HomePage';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
