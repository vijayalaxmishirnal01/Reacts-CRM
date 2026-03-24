import React from 'react';
import Image from 'next/image';
import india from "../public/images/india.png";
import { Bell } from "lucide-react";
import admin from "../public/images/admin.jpg";

const Header = () => {
  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-lg">
      <div className="max-w-7xl mx-auto py-4 sm:px-6 flex items-center justify-between">
        
        {/* Title on left */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          Dashboard
        </h1>

        {/* Right side: flag + bell + profile */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          
          {/* Flag */}
          <div className="p-2 rounded-full bg-[#2f2f2f] hover:bg-[#3a3a3a] transition-colors cursor-pointer shadow-md">
            <Image 
              src={india}
              alt="country flag"
              width={25}
              height={18}
              className="rounded-sm"
            />
          </div>

          {/* Bell */}
          <div className="relative p-2 rounded-full bg-[#2f2f2f] hover:bg-[#3a3a3a] transition-colors cursor-pointer shadow-md">
            <Bell className="w-5 sm:w-6 sm:h-6 text-gray-300 hover:text-white" />
            {/* Notification dot */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image 
              src={admin}
              alt="admin"
              width={35}
              height={35}
              className="rounded-full border border-gray-600 shadow-md"
            />
            <span className="hidden sm:block text-gray-100 font-medium">
              Jung Hoseok
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
