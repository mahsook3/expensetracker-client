import React, { useState, useEffect } from "react";
import Items from "./ExpenseItems";
import SideBar from "./SideBar";
import expensesData from './expenses.json'; 

const Expenses = () => {
  const [details, setDetails] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://expensetracker-server-ekhi.onrender.com/expenses');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleExpenseChange = async () => {
    // Trigger a re-fetch of data after deletion or update
    fetchData();
  };

  const totalExpense = details.reduce((total, item) => total + parseInt(item.budget), 0);

  return (
    <>
      <div className="layout-container">
        <div className="layout-container__wrapper">
          <div className="flexbox flexbox-justify-between flexbox-align-baseline">
            <h3>Expenses</h3>
            <span className="pill info">{`INR ${totalExpense}`}</span>
          </div>
          <hr />
          {/* EXPENSE LIST ITEMS */}
          {details.map((detail) => (
  <Items 
    day={detail.day} 
    month={detail.month} 
    title={detail.title} 
    type={detail.type} 
    budget={detail.budget} 
    id={detail._id}
    key={detail._id}
    onItemDeleted={fetchData}prop
  />
))}
        </div>
      </div>
      <SideBar />
    </>
  );
};

export default Expenses;