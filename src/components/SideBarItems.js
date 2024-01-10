import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

export default function SideBarItems() {

  const details = [
    {
      id: 1,
      title: 'Expenses',
      icon: 'insights',
      path: '/'
    },
    {
      id: 2,
      title: 'Add Expense',
      icon: 'note_add',
      path: '/add-expense'
    },
    {
      id: 3,
      title: 'Analytics',
      icon: 'analytics',
      path: '/analytics'
    }
  ]

  const [activeItem, setActiveItem] = useState(details[0].id);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeDetail = details.find(detail => detail.path === currentPath);
    if (activeDetail) {
      setActiveItem(activeDetail.id);
    }
  }, [location, details]);

  return (
    <>
      <div className="sidebar-container__list">
        <ul>
          {details.map((item) => { 
            return (
              <li key={item.id}>
                <Link className={item.id === activeItem ? "active" : ""} to={item.path}>
                  <span className="material-icons">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </li>
            )
           }
          )}
        </ul>
      </div>
    </>
  );
}