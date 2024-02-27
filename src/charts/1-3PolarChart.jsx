import React, { Component } from 'react';
import * as d3 from "d3";
import { csv } from 'd3-fetch';
import { scaleLog, scaleOrdinal } from 'd3-scale';
import { lineRadial, curveLinearClosed } from 'd3-shape';
import { format } from 'd3-format';

class PolarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sectors: [],
      colors: [
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
      ]
    };
  }

  componentDidMount() {
    // Load  csv file and group data by sector
    csv('HotStocks-Summary.csv').then(data => {
      const sectors = [...new Set(data.map(d => d.Sector))];
      const groupedData = sectors.map(sector => {
        return {
          sector: sector,
          value: d3.sum(data.filter(d => d.Sector === sector), d => +d.ValueOwned)
        };
      });
      this.setState({ data: groupedData, sectors: sectors });
    });
  }

   render() {
    const width = 800;
    const height = 500;
    const margin = 250;

    // Define the scales
    const r = scaleLog() // Use scaleLog here
      .domain([0.1, d3.max(this.state.data, d => d.value)]) // Use 0.1 as the lower bound here
      .range([0, width / 2 - margin]);

    const angle = scaleOrdinal()
      .domain(this.state.sectors)
      .range(d3.range(0, 2 * Math.PI, (2 * Math.PI) / this.state.sectors.length));

    // Define line generator
    const line = lineRadial()
      .radius(d => r(d.value))
      .angle(d => angle(d.sector))
      .curve(curveLinearClosed);

    // Define color scale
    const colorScale = scaleOrdinal().domain(this.state.sectors).range(this.state.colors);

    // Define value format
    const valueFormat = format('.2f');

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2.5})`}>
          {/* Draw axis lines (adjust as needed) */}
          <g>
            <circle cx={0} cy={0} r={r.range()[1]} fill="none" stroke="#ddd" />
            {r.ticks(4).map(tickValue => (
              <circle key={tickValue} cx={0} cy={0} r={r(tickValue)} fill="none" stroke="#ddd" />
            ))}
          </g>

          {/* Draw the polar line */}
          <path d={line(this.state.data)} fill='none' stroke='black' />

          {/* Draw data points and labels */}
          {this.state.data.map((d, i) => (
            <g key={i}>
              <circle
                cx={r(d.value) * Math.cos(angle(d.sector) - Math.PI / 2)}
                cy={r(d.value) * Math.sin(angle(d.sector) - Math.PI / 2)}
                r={8}
                fill={colorScale(d.sector)}
              />
              <text
                x={(r(d.value) + 10) * Math.cos(angle(d.sector) - Math.PI / 2)}
                y={(r(d.value) + 10) * Math.sin(angle(d.sector) - Math.PI / 2)}
                textAnchor='middle'
                fill='black'
                fontSize='12'
              >
                {valueFormat(d.value)}
              </text>
            </g>
          ))}
        </g>
        
        <g className="legend" 
        transform={`translate(${600}, ${50})`}> // Adjust the legend position here
        
          {/* Draw the legend border */}
          <rect
            x={-15} // Adjust the Xy position to fit the legend border
            y={-15} 
            width={180} // Adjust the width/height to fit the legend items
            height={this.state.sectors.length * 25 + 10}
            style={{opacity: 0.3}}
            fill='#fadb89' 
            stroke='black'
            strokeWidth='3px' // Set the border width
          />
          {/* Append legend items */}
          {this.state.sectors.map((sector, i) => (
            <g key={i} transform={`translate(0, ${i * 25})`}>
              <rect 
              width={10} 
              height={10} 
              fill={colorScale(sector)}
              />
              
              <text x={15} 
              y={10} 
              fill='black' 
              fontSize='12'>
              
                {sector}
              </text>
            </g>
          ))}
        </g>
      </svg>
    );
  }
}

export default PolarChart;
