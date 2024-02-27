// VBarChart.js
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const VBarChart = ({dataFile}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(dataFile).then((csvData) => {
      // filter out the columns we don't need
    const data = csvData.map((d) => ({
            symbol: d.symbol,
            value: +d.value, // convert to number
          }));

      // sort the data by value in descending order
      data.sort((a, b) => d3.descending(a.value, b.value));

      // select only the top 8 stocks
      data.splice(8);

      // set the data state
      setData(data);
    });
  }, []);
 // define dimensions and margins of the chart
  const width = 500;
  const height = 440;
  const margin = { top: 70, right: 50, bottom: 110, left: 120 };
  
  const svgRef = useRef();

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.symbol)) // use symbol as domain
    .range([margin.left, width - margin.right])
    .padding(0.3);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)]) 
    .range([height - margin.bottom, margin.top]); // map to the vertical range (inverted)

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`) // position axis at the bottom
      .call(d3.axisBottom(xScale).tickSizeOuter(0)); // create  axis with x scale

  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left + 5},0)`) // position axis at the left
      .call(d3.axisLeft(yScale)) // create axis with the y scale
      .call((g) => g.select(".domain").remove()); // remove vertical line

  // create a color scale with 8 colors
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);


  useEffect(() => {

    const svg = d3.select(svgRef.current);

    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(yAxis);

    // create a frame around the bar chart
    const rectFrame = svg.append("g")
      .attr("class", "rect-box");
      
    // Append a rect element to the chart
    rectFrame.append("rect")
      .attr("x", margin.left / 3.5)
      .attr("y", (margin.top * 0.9) - 20)
      .attr("width", width - (margin.left/3) - (margin.right/2.2)) 
      .attr("height", height - (margin.top* 0.9) - (margin.bottom * 0.43) + 20)
      .attr("stroke", "black") 
      .attr("stroke-width", 2) // set the outline thickness
      .attr("fill", "none");

      
    // Chart title and x axis label
    svg.append("text")
      .attr("x", (width / 2)) // Position L/R 
      .attr("y", height - margin.bottom + 45) // Position U/D
      .attr("text-anchor", "middle") 
      .style("font-size", "14px") 
      .style("text-decoration", "underline") 
      .attr("fill", "#000000")
      .text("Top 8 positions, sorted by their value"); // Set the chart name
    
    
    // select  text elements and displays data
    svg.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "text") 
      .attr("x", function(d) { return xScale(d.symbol) + xScale.bandwidth() / 2; })
      .attr("y", function(d) { return yScale(d.value) - 10; }) 
      .attr("text-anchor", "middle")
      .attr("dy", ".35em") 
      .style("fill", "navy") 
      .style("font-size", "12px")
      .text((d) => `${(d.value / 1000000).toFixed(2)}B`);
       

    // create a group for the bars
    const bars = svg.select(".bars");

    // bind the data to the bars
    const bar = bars.selectAll("rect").data(data);

    // enter new bars
    bar
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.symbol))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth()) 
      .attr("height", (d) => yScale(0) - yScale(d.value)) 
      .attr("fill", (d) => colorScale(d.symbol)); 

    // update existing bars
    bar
      .attr("x", (d) => xScale(d.symbol))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d.value))
      .attr("fill", (d) => colorScale(d.symbol));

    // exit old bars
    bar.exit().remove();
  }, [data]);

  return (
    <div className="chart">
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="bars" />
      </svg>
    </div>
  );
};

export default VBarChart;