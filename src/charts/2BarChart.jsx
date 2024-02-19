// BarChart.js
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from the CSV file
    d3.csv('HotStocks-Summary.csv').then((csvData) => {
 
      // Sort data by ValueOwned in descending order
      const sortedData = csvData.sort((a, b) => b.ValueOwned - a.ValueOwned);

      // Take the top 20 stocks
      const top20Data = sortedData.slice(0, 30);
      
      //console.log(top20Data); // Check the loaded data
      setData(top20Data);
    });
  }, []);

  const margin = { top: 20, right: 30, bottom: 52, left: 100 };
  const width = 1080 - margin.left - margin.right;
  const height = 1260 - margin.top - margin.bottom;
  const maxValue = d3.max(data, d => Number(d.ValueOwned));
  
  //console.log(maxValue); 
  
  const yScale = d3.scaleBand() // Use scaleBand for discrete values like stock symbols
    .domain(data.map(d => d.Stock))
    .range([0, data.length * 40])
    .padding(0.05);

  const xScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, maxValue]);

  // Create a color scale based on sectors
  const sectors = [
    "Technology",
    "Consumer Discretionary",
    "Finance",
    "Health Care",
    "Energy",
    "Other",
    "Consumer Staples",
    "Telecommunications",
    "Industrials",
    "ETF",
    "Real Estate",
  ];
  
  const colorScale = d3.scaleOrdinal()
    .domain(sectors)
    .range([
      "#2CA02C", // Technology
      "#FF7F0E", // Consumer Discretionary
      "#1F77B4", // Finance
      "#D62728", // Health Care
      "#9467BD", // Energy
      "#8c66c2", // Other
      "#e377c2", // Consumer Staples
      "#bcbd22", // Telecommunications
      "#17becf", // Industrials
      "#9edae5", // ETF
      "#c7c7c7", // Real Estate
    ]);
  
    d3.select('.x-axis')
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat('').ticks(5)) // Update axis if needed
      //.selectAll('.tick text')
      .style('font-size', '14px'); // Change valueowned font size 

    d3.select('.y-axis')
      .call(d3.axisLeft(yScale))
      //.selectAll('.tick text')
      .style('font-size', '16px'); // Change stock symbol font size
    

    // Draw Legend here  
    var legend = d3.select(".legend");    
    legend.append('rect')
      .attr('x', -15) // Adjust the Xy position to fit the legend border
      .attr('y', -15) 
      .attr('width', 240) // Adjust the width/height to fit the legend items
      .attr('height', 300)
      .style('opacity', 0.15) // Use opacity so that fill and legend items can be seen
      .style('fill', '#fadb89') // Set the fill color
      .style('stroke', 'black')
      .style('stroke-width', '4px') // Set the border width
      ; 
      
    // Select the legend group and append legend items
    d3.select('.legend')
      .selectAll('.legend-item')
      .data(colorScale.domain()) // Use the color scale domain as data
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', function(d, i) {
        return `translate(0, ${i * 25})`; 
      }); 

    // Append a rectangle for each legend item and fill it with the corresponding color
    d3.selectAll('.legend-item')
      .append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', (d) => colorScale(d)); // Use the color scale to fill the rectangles

    // Append a text for each legend item and show the sector name
    d3.selectAll('.legend-item')
      .append('text')
      .attr('x', 20)
      .attr('y', 12)
      .text((d) => d); // Use the data as text

     
  return (
    <svg width={
        width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        
    // Add a legend group first
    <g className="legend" 
    transform={`translate(${width - 400}, ${height - 800})`}
    />
    
      <g transform={`translate(${margin.left},${margin.top})`}>
      
        {/* Y-axis ticks */}
        {yScale.domain().map(d => (
          <text 
          key={d} 
          x={-10} 
          y={yScale(d)} dy="0.95em" textAnchor="end">
          </text>
        ))}
        {/* X-axis label */}
        <text 
        x={xScale(xScale.domain()[1]) / 1.6} 
        y={height + 42} dy="0.1em" textAnchor="end">
          Value of each stock owned (billions)
        </text>
      
        {/* Bars */}
          {data.map((d, i) => (
            <g key={d.Stock}>
            <rect
                key={d.Stock}
                x={0}
                y={yScale(d.Stock)}
                width={xScale(d.ValueOwned)}
                height={28}
                fill={colorScale(d.Sector)} // Color of bar based on sectors.

            />
            
            <text
                key={d.Stock}
                x={xScale(d.ValueOwned - 35)} // dynamic position based on width of bars
                y={yScale(d.Stock) + yScale.bandwidth() / 2.5} // Center text vertically
                dy=".35em"
                textAnchor="middle"
                fontSize="14px"
                fill="DarkBlue"
                >
                ${(d.ValueOwned)}bn
            </text>
            
            </g>
        ))}

        <g className="x-axis" transform={`translate(0,${height})`} ref={(node) => d3.select(node).call(d3.axisBottom(xScale))} />
        <g className="y-axis" ref={(node) => d3.select(node).call(d3.axisLeft(yScale))} />

      </g>

    </svg>
  );
};

export default BarChart;