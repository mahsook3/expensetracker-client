import React,{ useState } from "react";
import SideBar from "./SideBar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(1000);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  const updateTitle = (event) => {
    setTitle(event.target.value);
  };
  const updateDescription = (event) => {
    setDescription(event.target.value);
  };
  const updateBudget = (event) => {
    setBudget(event.target.value);
  };
  const updateDate = (event) => {
    setDate(event.target.value);
  };
  const updateType = (event) => {
    setType(event.target.value);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (!title || !description || !budget || !date || !type) {
      toast.error('Please fill in all the fields');
      return;
    }
    const newExpense = {
      day: new Date(date).getDate().toString(),
      month: new Date(date).toLocaleString('default', { month: 'long' }),
      title,
      description,
      budget,
      type: type === '1' ? 'credit' : 'debit',
    };
  
    fetch('https://expensetracker-server-ekhi.onrender.com/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('Form submitted, data stored!');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred while submitting the form');
      });
  };
  return (
    <>
      <div className="layout-container">
        <div className="layout-container__wrapper">
          <div className="flexbox flexbox-justify-between flexbox-align-baseline">
            <form
              onSubmit={handleFormSubmission}
              onReset={() => console.log("Form Reset!!")}
            >
              <div className="form-wrap">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  className="form-input"
                  required
                  onChange={updateTitle}
                  value={title}
                />
              </div>
              <div className="form-wrap">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  placeholder="Enter Description"
                  rows="4"
                  onChange={updateDescription}
                  value={description}
                ></textarea>
              </div>
              <div className="form-wrap">
                <label htmlFor="budget">budget</label>
                <input
                  type="number"
                  placeholder="Enter budget"
                  name="budget"
                  className="form-input"
                  min="0"
                  required=""
                  onChange={updateBudget} // Corrected here
                  value={budget}
                />
              </div>
              <div className="flexbox">
                <div className="form-wrap flexbox-child__fb50 pr-5">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="form-input"
                    name="date"
                    placeholder="Enter date"
                    onChange={updateDate}
                    value={date}
                  />
                </div>
                <div className="form-wrap flexbox-child__fb50 pl-5">
                  <label htmlFor="type">Select Type</label>
                  <select
                    value={type}
                    onChange={updateType}
                    className="form-select"
                    name="type"
                    required=""
                  >
                    <option value="">Select type</option>
                    <option value="1">Credit</option>
                    <option value="2">Debit</option>
                  </select>
                </div>
              </div>
              <div className="flexbox flexbox-reverse">
                <button className="btn" type="submit">
                  <span>ADD Expense</span>
                </button>
                <button className="btn mr-5" type="reset">
                  <span>Clear</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />

      <SideBar />
    </>
  );
};

export default AddExpense;