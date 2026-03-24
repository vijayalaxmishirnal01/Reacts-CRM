"use client";
import React from "react";
import { motion } from "framer-motion";
import StateCard from "@/Components/StateCard"; 
import { ShoppingBag, CheckCircle, Clock, BanIcon } from "lucide-react"; 
import OrdersTable from "../../Components/OrdersTable";

const OrdersPage = () => {
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
          <StateCard name="Total Orders" icon={ShoppingBag} value="15,240" />
          <StateCard name="Completed Orders" icon={CheckCircle} value="13,500" />
          <StateCard name="Pending Orders" icon={Clock} value="1,120" />
          <StateCard name="Canceled Orders" icon={BanIcon} value="620" />
        </motion.div>

        <OrdersTable />
      </main>
    </div>
  );
};

export default OrdersPage;
