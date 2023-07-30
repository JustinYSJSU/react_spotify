import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { TopArtistsSongs } from './pages/top_artists_songs';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path = "/" element = {<Login />} />
          <Route path = "/home" element = {<Home />} />
          <Route path = "/viewSummary/:uri/:top/:type/:past" element = {<TopArtistsSongs />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
