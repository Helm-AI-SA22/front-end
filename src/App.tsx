import React from 'react';
import './App.css';

import HomePage  from './pages/HomePage/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom';
import AboutPage from './pages/About/About';
import TopicModelingChart from './pages/TopicModelingChart/TopicModelingChart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/search"/>}></Route>
        <Route path="/search" element={<HomePage/>}></Route>
        <Route path="/fast/:querytext" element={<Dashboard/>}></Route>
        <Route path="/slow/:querytext" element={<Dashboard/>}></Route>
        <Route path="/chart/lda/vis" element={<TopicModelingChart/>}></Route>
        <Route path="/chart/bert/cluster" element={<TopicModelingChart/>}></Route>
        <Route path="/chart/bert/hierachical" element={<TopicModelingChart/>}></Route>
        <Route path="/chart/chart/bert/words" element={<TopicModelingChart/>}></Route>
        <Route path="/chart/bert/similarity" element={<TopicModelingChart/>}></Route>
        <Route path="/chart/bert/documents" element={<TopicModelingChart/>}></Route>
        <Route path="*" element={<Navigate to="/search"/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
