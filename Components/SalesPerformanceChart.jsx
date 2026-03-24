"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const SalesPerformanceChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setSalesData(data.sales || []);
        setCategories(data.categories || []);
      })
      .catch((error) => console.error("Error fetching sales data", error));
  }, []);

  const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart with its own border */}
      <div className="bg-[#2f2f2f] p-6 rounded-lg shadow border border-gray-600">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">Sales Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#4ade80" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart with its own border */}
      <div className="bg-[#2f2f2f] p-6 rounded-lg shadow border border-gray-600">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">Category Distribution</h2>
        {Array.isArray(categories) && categories.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SalesPerformanceChart;
