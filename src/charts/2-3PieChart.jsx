// PieChart.js
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({dataFile}) => {
  const [data, setData] = useState([]);
  const [vtotal, setvTotal] = useState(0);
  const svgRef = useRef();

  useEffect(() => {

    d3.csv(dataFile).then((csvData) => {
      // filter columns we don't need
      const filteredData = csvData.map((d) => ({
        symbol: d.symbol,
        value: +d.value / 1000000, // convert value to billions
      }));

      // sort data by value in descending order
      filteredData.sort((a, b) => d3.descending(a.value, b.value));

      // slice data to get top 30 stocks
      const slicedData = filteredData.slice(0, 30);
      
      // calculate total value to get % breakdown
      const vtotal = d3.sum(filteredData, (d) => d.value);

      setData(slicedData);
      setvTotal(vtotal);
    });
  }, []);

  useEffect(() => {
    
    // calculate the total value to get the % breakdown
    const total = d3.sum(data, (d) => d.value);
    
    // add the percentage property to each data object
    data.forEach((d) => {
      d.percentage = (d.value / total) * 100;
    });
    
    //Displays only top 8 labels.
    const top8labels = data.slice(0, 8);
          
    const svg = d3.select(svgRef.current);

    // set the dimensions and margins of the chart
    const width = 400;
    const height = 400;
    const margin = 400;


    // set the radius of the pie chart
    //const radius = Math.min(width, height) / 1.5 - margin;
    const radius = 500 - margin;

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.symbol))
      .range(d3.schemeCategory10);

    // create a pie generator
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    // create the donut by having different radius, inner vs outer
    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.9);

    // create a label arc generator
    const labelArc = d3
      .arc()
      .innerRadius(radius * 1.3)
      .outerRadius(radius * 1.3);
      
    const pieGroup = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
      
    // create a border frame around the bar chart
    const rectFrame = svg.append("g")
      .attr("class", "rect-box");


    // Append a rect element to the chart
    rectFrame.append("rect")
      .attr("x", 5)
      .attr("y", 20)
      .attr("width", width - 10) 
      .attr("height", height - 50)
      .attr("stroke", "black") 
      .attr("stroke-width", 2)
      .attr("fill", "none");


    // Chart title and label
    svg.append("text")
      .attr("x", (width / 2)) // Position L/R 
      .attr("y", height - 47) // Position U/D
      .attr("text-anchor", "middle") 
      .style("font-size", "14px") 
      .style("text-decoration", "underline") 
      .attr("fill", "#000000")
      .text("Top 8 positions, breakdown by %"); // Set the chart name
      
      
    //Creaate a label AUM in the middle of the donut
    svg.append("text")
      .attr("x", width / 1.66) // Position L/R 
      .attr("y", height / 1.95) // Position U/D
      .attr("text-anchor", "end")
      .style("font-size", "24px")
      .attr("fill", "#FF6700")
      .style("text-decoration", "underline")
      .style("font-weight", "bold")
      .text(vtotal !== 0 ? `${vtotal.toFixed(2)}B` : ""); 

      
    // create and append pie slices
    const slices = pieGroup
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.symbol));

    // create and append labels
    const labels = pieGroup
      .selectAll("text")
      .data(pie(top8labels))
      .join("text")
      .attr("font-size", "12px")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", "navy")
      .text((d) => `${d.data.symbol}: ${d.data.percentage.toFixed(2)}%`);
  }, [data]);

  return (

      <svg ref={svgRef} width={400} height={400}></svg>

  );
};

export default PieChart;
