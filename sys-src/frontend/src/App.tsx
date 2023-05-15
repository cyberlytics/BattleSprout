import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import HomeScreen from './HomeScreen';
import Dashboard from './Dashboard';
import NoPage from './NoPage';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomeScreen/>}/>
          <Route path="Dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
