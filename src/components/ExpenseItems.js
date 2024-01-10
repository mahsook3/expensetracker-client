import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseItems = ({ id, day, month, title, type, budget, onItemDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDay, setCurrentDay] = useState(day);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentType, setCurrentType] = useState(type);
  const [currentBudget, setCurrentBudget] = useState(budget);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(`http://localhost:8000/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: currentTitle,
          day: currentDay,
          month: currentMonth,
          type: currentType,
          budget: currentBudget,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      toast.success('Expense updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating the expense');
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/expenses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`HTTP error! status: ${response.status}`, errorData);
        toast.error('An error occurred while deleting the expense');
      } else {
        const data = await response.json();
        console.log(data);
        onItemDeleted();
        toast.success('Expense deleted successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while deleting the expense');
    }
  };
  

  const handleChange = (event, field) => {
    switch (field) {
      case 'title':
        setCurrentTitle(event.target.value);
        break;
      case 'day':
        setCurrentDay(event.target.value);
        break;
      case 'month':
        setCurrentMonth(event.target.value);
        break;
      case 'type':
        setCurrentType(event.target.value);
        break;
      case 'budget':
        setCurrentBudget(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="layout-container__expenses">
        <ul>
          <li className="flexbox flexbox-justify-between">
            <div className="flexbox">
              <div className="flexbox flexbox-column flexbox-align-center date">
                <div className="month" id={`month-${id}`}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentMonth}
                      onChange={(e) => handleChange(e, 'month')}
                    />
                  ) : (
                    currentMonth
                  )}
                </div>
                <div className="day" id={`day-${id}`}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentDay}
                      onChange={(e) => handleChange(e, 'day')}
                    />
                  ) : (
                    currentDay
                  )}
                </div>
              </div>
              <div className="flexbox flexbox-align-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={currentTitle}
                    onChange={(e) => handleChange(e, 'title')}
                  />
                ) : (
                  <h3 className="title" id={`title-${id}`}>
                    {currentTitle}
                  </h3>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={currentType}
                    onChange={(e) => handleChange(e, 'type')}
                  />
                ) : (
                  <span className="type-pill" id={`type-${id}`}>
                    {currentType}
                  </span>
                )}
              </div>
            </div>
            <div className="flexbox flexbox-align-center">
              {isEditing ? (
                <input
                  type="text"
                  value={currentBudget}
                  onChange={(e) => handleChange(e, 'budget')}
                />
              ) : (
                <div className="pill" id={`budget-${id}`}>
                  {currentBudget}
                </div>
              )}
              <button className="actions" onClick={isEditing ? handleSave : handleEdit}>
                <span className="material-icons edit">{isEditing ? 'save' : 'edit'}</span>
              </button>
              <button className="actions" onClick={handleDelete}>
                <span className="material-icons delete">delete</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <ToastContainer />
    </>
  );
};

export default ExpenseItems;
