import './App.css';
import { Navbar } from './components'
import { Home } from './pages'
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from "react-router";

function useLocationEffect(callback) {
  const location = useLocation();

  useEffect(() => {
    callback(location);
  }, [location, callback]);
}

function ScrollToTop() {
  useLocationEffect(() => {
    window.scrollTo(0, 0);
  });

  return (null);
}


function App() {

  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
