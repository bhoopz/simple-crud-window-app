import './App.css';
import React from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

function App() {

  return (
    <div className="App">
   <Router>
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
    </Routes>
   </Router>
  </div>
  );
}

export default App;