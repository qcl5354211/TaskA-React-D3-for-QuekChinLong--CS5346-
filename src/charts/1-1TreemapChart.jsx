import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

function TreemapChart({ width = 800, height = 600 }) {
  const [treemapData, setTreemapData] = useState([]);
  const maxValue = d3.max(treemapData, d => d.data.ValueOwned); // Get the maximum value    
  useEffect(() => {
    // Load CSV data
    d3.csv('HotStocks-Summary.csv')
      .then(rawData => {
        
        // Filter to top 30 stocks
        const filteredData = rawData.sort((a, b) => b.ValueOwned - a.ValueOwned).slice(0, 30);

        // Create hierarchical data structure
        const root = d3
          .hierarchy({ children: filteredData }) // Wrap data in a parent node
          .sum(d => d.ValueOwned)
          .sort((a, b) => b.value - a.value);

        //console.log(root); // Check the loaded data
        
        // Calculate treemap layout
        const treemap = d3.treemap()
          .size([width, height])
          .padding(2)
          .round(false)(root);

        setTreemapData(treemap.leaves());

      })
      .catch(error => console.error(error));
  }, []);

  return (

    <svg width={width} height={height}>

        {/* Define the linear gradient */}
        <defs>
            <linearGradient id="greenGradient" x1="20%" y1="20%" x2="20%" y2="100%">
              <stop offset="0%" stopColor="#00fa00" /> {/* Dark green */}
              <stop offset="100%" stopColor="#9ab59a" /> {/* Light green */}
            </linearGradient>
        </defs>
      
      {treemapData.map((d, i) => (
        

        <g key={i} transform={`translate(${d.x0}, ${d.y0})`}>
        
          <rect
            width={d.x1 - d.x0}
            height={d.y1 - d.y0}
            fill={`url(#greenGradient)`}    
            fill-opacity={(d.data.ValueOwned / (maxValue*3))} // Purposely bring up max value to have higher opacity constrast
            stroke="#000" // Black border
            strokeWidth="2"
          />
          
          <text
            x={(d.x1 - d.x0) / 2} // Center horizontally
            y={(d.y1 - d.y0) / 2.5} // Center vertically
            textAnchor="middle" // Center the text
            alignmentBaseline="middle" // Center the text
            //fontSize="16px"
            fontSize={`${Math.min((d.x1 - d.x0) / 3.5, (d.y1 - d.y0) / 3.5)}px`}
            fill="DarkBlue"
          >
            {d.data.Stock} {/* Display stock symbol */}
          </text>
        </g>
      ))}
    </svg>

  );
}

export default TreemapChart;
