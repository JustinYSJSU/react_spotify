import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { Home } from './pages/home';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path = "/" element = {<Login />} />
          <Route path = "/home" element = {<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
