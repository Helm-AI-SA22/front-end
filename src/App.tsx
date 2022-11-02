import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import Layout  from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout></Layout>
      <SearchBar></SearchBar>
    </div>
  );
}

export default App;
