import React from "react";
import SideBarItems from "./SideBarItems";

const SideBar = () => {
    return (
      <>
        <div className="sidebar-container">
          <div className="sidebar-container__brand">Expense Tracker</div>
          <SideBarItems className="active"/>
        </div>
      </>
    );
  };
  
  export default SideBar;
  