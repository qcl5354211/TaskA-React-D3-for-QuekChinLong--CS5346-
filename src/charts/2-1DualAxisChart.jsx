// DualAxischart.js
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const DualAxischart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv("Top10byAum_csv.csv").then((csvData) => {
      // Parse data and convert strings to numbers
      csvData.forEach((d) => {
        d.AUM = +d.AUM;
        d.No_of_holdings = +d.No_of_holdings;
      });

      setData(csvData);
    });
  }, []);

  // Define dimensions and margins of the chart
  const margin = { top: 70, right: 80, bottom: 130, left: 100 };
  const width = 700 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // Define scales for the x, y1 and y2 axes
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.Fund))
    .range([0, width])
    .padding(0.4);

  const y1Scale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.AUM)])
    .nice(5)
    .range([height, 0]);

  const y2Scale = d3
    .scaleLinear()
    .domain([-500, d3.max(data, (d) => d.No_of_holdings)])
    .range([height, 0]);


  // Define axes and their formats
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const y1Axis = d3.axisLeft(y1Scale).tickFormat((d) => `$${d}B`);
  //const y2Axis = d3.axisRight(y2Scale).tickFormat(d3.format(","));
  
  
  const y2Axis = d3
    .axisRight(y2Scale)
    .tickValues(d3.ticks(500, d3.max(data, (d) => d.No_of_holdings),6))
    .tickFormat(d3.format(","))

    //.tickValues(d3.ticks(500, d3.max(data, (d) => d.No_of_holdings),5))
    //.tickValues([1000,2000,3000,4000, 6000, d3.max(data, (d) => d.No_of_holdings)])
    //.tickValues(d3.ticks(1000, 8000,4))

 
  // Define colors for the bars and the line
  const barColor = "#69b3a2";
  const lineColor = "#ffab00";

  // Define line generator function
  const line = d3
    .line()
    .x((d) => xScale(d.Fund) + xScale.bandwidth() / 2)
    .y((d) => y2Scale(d.No_of_holdings));
    
  const svgRef = useRef();

  useEffect(() => {
    // Select the svg element and set its attributes
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

      //.attr("width", width + margin.left + margin.right)
      //.attr("height", height + margin.top + margin.bottom);

    // Append a group element and translate it to the margin position
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Append the x axis to the group element
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-30)")
      .style("text-anchor", "end");
      
    // Adjust font size of y2 axis ticks
    g.select(".x-axis")
      .selectAll("text")
      .attr("fill", "#FF6700")
      .style("font-size", "14px");
    
    // Append the y1 axis to the group element
    g.append("g")
      .attr("class", "y1-axis")
      .call(y1Axis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -height / 2)      
      .attr("dy", "1em")
      .style("font-size", "18px");
      
    // Adjust font size of y1 axis ticks
    g.select(".y1-axis")
      .selectAll("text")
      .style("font-size", "13px");

    // Append the y2 axis to the group element
    g.append("g")
      .attr("class", "y2-axis")
      .attr("transform", `translate(${width},0)`)
      .call(y2Axis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.right - 10)
      .attr("x", -height / 2);

    // Adjust font size of y2 axis ticks
    g.select(".y2-axis")
      .selectAll("text")
      .style("font-size", "13px");
      
    // Label value on the linechart
    svg.append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(d.Fund) + xScale.bandwidth() + 85 ) // Position text at center bar
      .attr("y", (d) => y2Scale(d.No_of_holdings) + 60 ) // Position text slightly above the line
      .attr("text-anchor", "middle") 
      .attr("fill", "#00008B")
      .style("font-size", "14px") 
      .text((d) => d.No_of_holdings);
      

    // Label for x axis
    svg.append("text")
      .attr("x", (width + margin.left + margin.right) /2) // Position L/R 
      .attr("y", 20) // Position U/D
      .attr("text-anchor", "middle") 
      .style("font-size", "24px") 
      //.style("font-weight", "bold")
      .style("text-decoration", "underline") 
      .attr("fill", "#FF6700")
      .text("10 most popular Hedge Funds"); // Set the chart name

    // Label for y1 axis
    svg.append("text")
      .attr("x", -height / 2 - margin.top) // Position L/R 
      .attr("y", margin.left - 60) // Position U/D
      .attr("transform", "rotate(-90)") // Rotate the text by -90 degrees
      .attr("text-anchor", "middle") 
      .style("font-size", "18px") 
      .attr("fill", "#000000")
      .text("AUM (Billion USD)"); 
      
    // Label for y2 axis
    svg.append("text")
      .attr("x", 200) // Position L/R 
      .attr("y", -680) // Position U/D
      .attr("transform", "rotate(90)") 
      .attr("text-anchor", "middle") 
      .style("font-size", "16px") 
      .attr("fill", "#00008B")
      .text("No of stock positions held"); 

    // Append bars to the group element
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.Fund))
      .attr("y", (d) => y1Scale(d.AUM))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - y1Scale(d.AUM))
      .attr("fill", barColor);

    // Append line to the group element
    g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 2);

    // Append dots to the group element
    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.Fund) + xScale.bandwidth() / 2)
      .attr("cy", (d) => y2Scale(d.No_of_holdings))
      .attr("r", 3)
      .attr("fill", lineColor);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default DualAxischart;
