import React from 'react';
import './App.css';

import Layout  from './components/Layout/Layout';
import AppBar from './components/AppBar/AppBar';


function App() {
  return (
    <div className="App">
        <AppBar></AppBar>
        <Layout></Layout>
    </div>
  );
}

export default App;
