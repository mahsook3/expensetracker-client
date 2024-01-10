import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import CanvasJSReact from '@canvasjs/react-charts';
import expensesData from './expenses.json'; // import the JSON data

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
 
const Analytics = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/expenses')
      .then(response => response.json())
      .then(data => setDetails(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const dataPoints = details.map(detail => ({
    y: parseInt(detail.budget),
    label: detail.title
  }));

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", 
    title:{
      text: "Simple overview of your expenses",
      fontColor: "black" 
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}",
      indexLabelFontColor: "black",
      startAngle: -90,
      dataPoints: dataPoints
    }]
  };

  const dataPoints1 = details.map((detail, index) => ({
    x: index + 1,
    y: parseInt(detail.budget),
    label: detail.title
  }));
  
  const options1 = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title:{
      text: "Simple Column Chart of your expenses"
    },
    axisY: {
      includeZero: true
    },
    data: [{
      type: "column",
      indexLabelFontColor: "#5A5757",
      indexLabelPlacement: "outside",
      dataPoints: dataPoints1
    }]
  };


  return (
    <>
      <div className="layout-container">
        <div className="layout-container__wrapper">
          <div className="flexbox flexbox-justify-between flexbox-align-baseline">
        <CanvasJSChart options = {options} />
        <CanvasJSChart options = {options1} 
				/* onRef={ref => this.chart = ref} */
				/* containerProps={{ width: '100%', height: '300px' }} */
			/>
      </div>
    </div>
    </div>
      <SideBar />
    </>
  );
};

export default Analytics;