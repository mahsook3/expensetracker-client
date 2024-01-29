import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Counter from "./components/Counter.js";
import Expenses from './components/Expenses.js';
import AddExpense from './components/AddExpense.js';
import Analytics from './components/Analytics.js';
import SideBar from './components/SideBar.js';
function App() {
  return (
    <Router>
      <div className="flexbox">
        <SideBar />
        <Routes>
          <Route path="/" element={<Expenses/>} />
          <Route path="/add-expense" element={<AddExpense/>} />
          <Route path="/analytics" element={<Analytics/>} />
          <Route path="/" element={<Expenses/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
