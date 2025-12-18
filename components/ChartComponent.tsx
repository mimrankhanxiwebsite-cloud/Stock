
import React from 'react';

interface ChartProps {
  data: Array<{ time: string; price: number }>;
  color: string;
  height?: number;
  hideAxis?: boolean;
}

const ChartComponent: React.FC<ChartProps> = ({ data, color, height = 200, hideAxis = false }) => {
  if (!data || data.length === 0) return <div className="text-slate-500">No data</div>;

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const range = maxPrice - minPrice || 1;
  const padding = range * 0.1;
  
  const width = 600;
  const svgHeight = height;
  const step = width / (data.length - 1);

  const points = data.map((d, i) => {
    const x = i * step;
    const y = svgHeight - ((d.price - (minPrice - padding)) / (range + padding * 2)) * svgHeight;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${points} ${width},${svgHeight} 0,${svgHeight}`;

  return (
    <div className="w-full h-full">
      <svg 
        viewBox={`0 0 ${width} ${svgHeight}`} 
        preserveAspectRatio="none" 
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid Lines */}
        {!hideAxis && (
          <g className="stroke-slate-800/50 stroke-1">
            <line x1="0" y1={svgHeight * 0.25} x2={width} y2={svgHeight * 0.25} />
            <line x1="0" y1={svgHeight * 0.5} x2={width} y2={svgHeight * 0.5} />
            <line x1="0" y1={svgHeight * 0.75} x2={width} y2={svgHeight * 0.75} />
          </g>
        )}

        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className="transition-all duration-1000 ease-in-out"
        />
        <polygon
          fill={`url(#gradient-${color})`}
          points={areaPoints}
          className="transition-all duration-1000 ease-in-out"
        />
        
        {/* Interactive Point Marker (Last Price) */}
        {!hideAxis && (
           <circle 
            cx={width} 
            cy={svgHeight - ((data[data.length-1].price - (minPrice - padding)) / (range + padding * 2)) * svgHeight}
            r="4"
            fill={color}
            className="animate-pulse"
           />
        )}
      </svg>
    </div>
  );
};

export default ChartComponent;
