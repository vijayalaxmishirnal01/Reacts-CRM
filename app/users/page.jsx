"use client";
import React from "react";
import { motion } from "framer-motion";
import StateCard from "@/Components/StateCard"; 
import UsersTable from "../../Components/UsersTable";
import { RotateCcw, UserPlus, UsersIcon } from "lucide-react";

const UsersPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StateCard name="Total Clients" icon={UsersIcon} value="7670" />
          <StateCard name="New Clients" icon={UserPlus} value="860" />
          <StateCard name="Action Users" icon={UserPlus} value="4080" />
          <StateCard name="Returning Clients" icon={RotateCcw} value="2730" />
        </motion.div>

        <UsersTable />
      </main>
    </div>
  );
};

export default UsersPage;
