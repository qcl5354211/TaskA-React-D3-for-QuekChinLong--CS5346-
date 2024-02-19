//import LineChart from "./charts/1LineChart.js";
//import PieChart from "./charts/3PieChart.js";
import TreeMapChart from "./charts/1TreemapChart.jsx";
import BarChart from "./charts/2BarChart.jsx";

import logo from './logo.svg';
import './App.css';



const App = () => {
  return (
  
  <div id="parent">

    <div style={{id:"Page-title", textAlign: "center", color: "#000000", fontSize: "2vw", fontFamily: "Rubik Doodle Shadow"}}>
      <u><h1>CS5346-Information Visualisation</h1></u>
    </div>


    <div style={{id:"Page-heading", textAlign: "center", fontSize: "2vw", fontWeight: "bold", textDecoration: "underline", fontFamily: "Roboto", paddingLeft: "0px" }}>
         <h2>Submission for Quek Chin Long</h2> 
        
    </div>        
        
        
       
    <div style={{id:"chart2title", textAlign: "center", fontSize: "2vw", fontWeight: "bold", textDecoration: "underline", fontFamily: "Roboto", paddingLeft: "0px" }}>    
        <br/>1. Top 30 stocks owned by Hedge funds in TreeMap view (as of end Sept 23) <br/>     
        <br/>
    </div>

    <div style={{id:"chart1", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <TreeMapChart chartName="TreeMapChart" />
    </div>
    <br/>
    <br/>




    <div style={{id:"chart2title", textAlign: "center", fontSize: "2vw", fontWeight: "bold", textDecoration: "underline", fontFamily: "Roboto", paddingLeft: "0px" }}>
        <br/>2. Bar Chart showing the stocks, total value ($ bn) and sector type: <br/>  
        <br/>         
    </div>

    <div style={{id:"chart2", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <BarChart chartName="BarChart" />
    </div>

    <br/><br/><br/><br/><br/><br/><br/>
    
    
  </div>
  
  );
}
export default App;