"use client";

import StateCard from "@/Components/StateCard";
import SalesOverviewChart from "@/Components/SalesOverviewChart";
import CategoryDistributionChart from "@/Components/CategoryDistributionChart";
import ProductPerformanceChart from "@/Components/ProductPerformanceChart";
import OrderDistributionChart from "@/Components/OrderDistributionChart";
import { IndianRupee, ShoppingBag, SquareActivity, Users } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const Overviewpage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        
        {/* Animated KPI cards */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StateCard name="Total Sales" icon={IndianRupee} value="₹182,450" />
          <StateCard name="Total Clients" icon={Users} value="1,437" />
          <StateCard name="Total Products" icon={ShoppingBag} value="674" />
          <StateCard name="Stock" icon={SquareActivity} value="12,845" />
        </motion.div>

        {/* Charts side by side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <OrderDistributionChart />
          <ProductPerformanceChart/>
        </div>
      </main>
    </div>
  );
};

export default Overviewpage;
