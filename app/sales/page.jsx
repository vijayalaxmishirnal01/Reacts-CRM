"use client";
import React from "react";
import { motion } from "framer-motion";
import StateCard from "@/Components/StateCard"; 
import SalesPerformanceChart from "@/Components/SalesPerformanceChart";
import { IndianRupee, ShoppingBasket, ShoppingCart, TrendingUp } from "lucide-react";

const SalesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* KPI Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StateCard name="Total Revenue" icon={IndianRupee} value="₹42,300" />
          <StateCard name="Avg. Order Value" icon={ShoppingCart} value="78.50" />
          <StateCard name="Total Sales" icon={ShoppingBasket} value="128,500" />
          <StateCard name="Sales Growth" icon={TrendingUp} value="36.2%" />
        </motion.div>

        {/* Sales Performance Chart */}
        <SalesPerformanceChart />
      </main>
    </div>
  );
};

export default SalesPage;
