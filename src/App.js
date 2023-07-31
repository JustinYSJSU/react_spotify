import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { TrackSummary } from './pages/track_summary';
import { ArtistSummary } from './pages/artist_summary';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path = "/" element = {<Login />} />
          <Route path = "/home" element = {<Home />} />
          <Route path = "/viewSummary/:uri/:displayName/:top/tracks/:past/:date" element = {<TrackSummary />} />
          <Route path = "/viewSummary/:uri/:displayName/:top/artists/:past/:date" element = {<ArtistSummary />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
