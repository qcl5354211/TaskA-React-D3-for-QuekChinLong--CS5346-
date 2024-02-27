
import TreeMapChart from "./charts/1-1TreemapChart.jsx";
import BarChart from "./charts/1-2BarChart.jsx";
import PolarChart from "./charts/1-3PolarChart.jsx";

import DualAxischart from "./charts/2-1DualAxisChart.jsx"; 
import VBarChart from "./charts/2-2VBarChart.jsx";
import PieChart from "./charts/2-3PieChart.jsx";

import logo from './logo.svg';
//import './App.css';



const App = () => {
  return (
  
  <div id="parent">

    <div style={{id:"Page-title", textAlign: "center", color: "#000000", fontSize: "24px", fontFamily: "Rubik Doodle Shadow"}}>
      <u><h1>CS5346-Information Visualisation</h1></u>
    </div>


    <div style={{id:"Page-heading", textAlign: "center", fontSize: "20px", fontWeight: "bold",  fontFamily: "Roboto", paddingLeft: "0px" }}>
   
         Task A1(#1.Treemap, #2.HBar, #3.Polar) <br/>
          Task A2 (#4.Dual Axis, #5.VBar, #6.Piechart) <br/>
          by student: Quek Chin Long<br/>
        
    </div>        
        
        
    {/* Chart A1-1 */}    
    <div style={{id:"chartA1-1title", textAlign: "center", fontSize: "20px", fontWeight: "bold", textDecoration: "underline", fontFamily: "Roboto", paddingLeft: "0px" }}>    
        <br/>#1. Top 30 stocks owned by Hedge funds - Treemap:<br/>     
        <br/>
    </div>

    <div style={{id:"chartA1-1", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <TreeMapChart chartName="TreeMapChart" />
    </div>
    <br/>
    <br/>
    <br/>
    <br/>

    {/* Chart A1-2 */}
    <div style={{id:"chartA1-2title", textAlign: "center", fontSize: "20px", fontWeight: "bold", textDecoration: "underline", fontFamily: "Roboto", paddingLeft: "0px" }}>
        <br/>#2. 30 most sought after stocks (in billions) and sector type - H.Barchart: <br/>  
        <br/>         
    </div>

    <div style={{id:"chartA1-2", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <BarChart chartName="BarChart" />
    </div>
    
    <br/>
    <br/>
    <br/>
    
    {/* Chart A1-3 */}
    <div style={{id:"chartA1-3title", textAlign: "center", fontSize: "20px", fontWeight: "bold", textDecoration: "underline", fontFamily: "Roboto", paddingLeft: "0px" }}>
        <br/>#3. 11 sector types - PolarChart: <br/>  
        <br/>         
    </div>

    <div style={{id:"chartA1-3", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <PolarChart chartName="PolarChart" />
    </div>   
    

    <br/>    
    
    {/* Chart A2-1 */}
    <div style={{id:"chartA2-1title", textAlign: "center", fontSize: "20px", fontWeight: "bold", textDecoration: "underline", fontFamily: "Roboto", paddingLeft: "0px" }}>
        <br/>#4. AUM and no. of holdings comparison (10 most popular Hedge funds) - DualAxis Chart: <br/>  
        <br/>         
    </div>

    <div style={{id:"chartA2-1", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
           <DualAxischart chartName="DualAxischart" />
    </div>  
    <br/><br/>
        
    {/* Chart A2-2 and A2-3 */}
    <div style={{id:"chartA2-23title", textAlign: "center", fontSize: "20px", fontWeight: "bold", textDecoration: "underline", fontFamily: "Roboto", paddingLeft: "0px" }}>
        <br/>#5. and #6. Top 10 fund manager portfolio breakdown - V.bar + Donut chart
    </div>
    <div style={{id:"chartA2-23title", textAlign: "center", fontSize: "16px", fontFamily: "Roboto", paddingLeft: "0px" }}>

    <br/><br/><br/>
    </div>
    
    
    {/* 1 */}
    <div style={{id:"chartA2x1-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    1. Warren Buffet - Berkshire Hathaway (Portfolio: $348.32B)
    </div>
    
    <br/>
    
    <div style={{id:"chartchartA2x1-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/1.jpg"  style={{width: 150, height: 150}} />
    </div>   
    
    <div style={{id:"chartA2x1-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>

        <VBarChart dataFile="/data/1BerkshireHathaway.csv" chartName="VBarChart" />   
        <PieChart dataFile="/data/1BerkshireHathaway.csv" chartName="PieChart" />
        
    </div>



    {/* 2 */} 
    <div style={{id:"chartchartA2x2-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    2. Ken Fisher - Fisher Asset Management (Portfolio: $128.73B)
    </div>
        
    <br/>
    
    <div style={{id:"chartchartA2x2-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/2.jpg"  style={{width: 150, height: 150}} />
    </div>   
    
    <div style={{id:"chartchartA2x2-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>

        <VBarChart dataFile="/data/2FisherAssetManagement.csv" chartName="VBarChart" />
        <PieChart dataFile="/data/2FisherAssetManagement.csv" chartName="PieChart" />
        
    </div>


    {/* 3 */}
    <div style={{id:"chartA2x3-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    3. Israel Englander - Millennium Management (Portfolio: $32.72B)
    </div>
        
    <br/>
    
    <div style={{id:"chartA2x3-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/3.jpg"  style={{width: 150, height: 150}} />
    </div>   
    
    <div style={{id:"chartA2x3-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>

        <VBarChart dataFile="/data/3MillenniumManagement.csv" chartName="VBarChart" />
        <PieChart dataFile="/data/3MillenniumManagement.csv" chartName="PieChart" />
        
    </div>


    {/* 4 */}   
    <div style={{id:"chartA2x4-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    4. Ken Griffin - Citadel Advisors (Portfolio: $27.88B)
    </div>
        
    <br/>
    
    <div style={{id:"chartA2x4-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/4.jpg"  style={{width: 150, height: 150}} />
    </div>  
    
    <div style={{id:"chartA2x4-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>

        <VBarChart dataFile="/data/4CitadelAdvisors.csv" chartName="VBarChart" /> 
         <PieChart dataFile="/data/4CitadelAdvisors.csv" chartName="PieChart" />   
         
    </div>


    {/* 5 */}
    <div style={{id:"chartA2x5-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    5. Jim Simons - Millennium Management (Portfolio: $20.20B)
    </div>
        
    <br/>
    
    <div style={{id:"chartA2x5-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/5.jpg"  style={{width: 150, height: 150}} />
    </div>   
    
    <div style={{id:"chartA2x5-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
    
        <VBarChart dataFile="/data/5RenaissanceTechnologies.csv" chartName="VBarChart" />    
         <PieChart dataFile="/data/5RenaissanceTechnologies.csv" chartName="PieChart" />  
         
    </div>    
    
    
    {/* 6 */}
    <div style={{id:"chartA2x6-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    6. Steven Cohen - Point72 Asset Management (Portfolio: $10.11B)
    </div>
        
    <br/>
    
    <div style={{id:"chartA2x6-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/6.jpg"  style={{width: 150, height: 150}} />
    </div>   
    
    <div style={{id:"chartA2x6-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
    
        <VBarChart dataFile="/data/6Point72AssetManagement.csv" chartName="VBarChart" />  
        <PieChart dataFile="/data/6Point72AssetManagement.csv" chartName="PieChart" />      
        
    </div>       
    
    
    {/* 7 */}
    <div style={{id:"chartA2x7-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    7. Ray Dalio - Bridgewater Associates (Portfolio: $11.41B)
    </div>
        
    <br/>
    
    <div style={{id:"chartA2x7-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/7.jpg"  style={{width: 150, height: 150}} />
    </div>   
    
    <div style={{id:"chartA2x7-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
    
        <VBarChart dataFile="/data/7BridgewaterAssociates.csv" chartName="VBarChart" />       
        <PieChart dataFile="/data/7BridgewaterAssociates.csv" chartName="PieChart" />

        
    </div>     
    
    
    {/* 8 */}
    <div style={{id:"chartA2x8-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    8. Cathie Wood - ARK Investment Management (Portfolio: $15.22B)
    </div>
        
    <br/>
    
    <div style={{id:"chartA2x8-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/8.jpg"  style={{width: 150, height: 150}} />
    </div>   
    
    <div style={{id:"chartA2x8-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
    
        <VBarChart dataFile="/data/8ARKInvestmentManagement.csv" chartName="VBarChart" />    
        <PieChart dataFile="/data/8ARKInvestmentManagement.csv" chartName="PieChart" />
      
    </div>     


    {/* 9 */}
    <div style={{id:"chartA2x9-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    9. Carl Icahn - Icahn Enterprises (Portfolio: $10.35B)
    </div>
        
    <br/>
    
    <div style={{id:"chartA2x9-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/9.jpg"  style={{width: 150, height: 150}} />
    </div>  
    
    <div style={{id:"chartA2x9-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
    
        <VBarChart dataFile="/data/9IcahnEnterprises.csv" chartName="VBarChart" />
        <PieChart dataFile="/data/9IcahnEnterprises.csv" chartName="PieChart" />
   
    </div>  
    


    {/* 10 */}
    <div style={{id:"chartA2x10-title", textAlign: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "0px" }}>
    10. Donald Yacktman - Yacktman Asset Management (Portfolio: $10.65B)
    </div>
        
    <br/>
    
    <div style={{id:"chartA2x10-img", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
        <img src="/images/10.jpg"  style={{width: 150, height: 150}} />
    </div>
    
    <div style={{id:"chartA2x10-chart", display: "flex", margin: "0 auto", alignItems: "center", justifyContent: "center"}}>

        <VBarChart dataFile="/data/10YacktmanAssetManagement.csv" chartName="VBarChart" />
        <PieChart dataFile="/data/10YacktmanAssetManagement.csv" chartName="PieChart" />  
        
    </div>         
    
    
    
    
    <br/><br/><br/><br/><br/><br/><br/>

    
  </div>
  
  );
}
export default App;