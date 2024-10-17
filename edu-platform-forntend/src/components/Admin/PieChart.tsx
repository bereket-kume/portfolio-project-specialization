import React, { useMemo } from "react";
import { PieChart, Pie, Label, Tooltip, Cell } from "recharts";
import './styles/DonutChart.css'
const chartData = [
  { name: "Chrome", value: 275, color: "#4285F4" },
  { name: "Safari", value: 200, color: "#FF9F1A" },
  { name: "Firefox", value: 287, color: "#FF7139" },
  { name: "Edge", value: 173, color: "#00A4EF" },
  { name: "Other", value: 190, color: "#999999" },
];

const DonutChart = () => {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <div className="donut-chart-container">
      <h2>Chart</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={5}
          stroke="none"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label
            position="center"
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan x={viewBox.cx} y={viewBox.cy} className="chart-text">
                      {totalVisitors}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="chart-label"
                    >
                      Visitors
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
        <Tooltip />
      </PieChart>
      <p className="footer-text">Total visitors in the last 6 months</p>
    </div>
  );
};

export default DonutChart;
