"use client";
import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const SettingsPage = () => {
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleProfileSave = () => {
    setProfileUpdated(true);
    setTimeout(() => setProfileUpdated(false), 3000);
  };

  return (
    <div className={`flex-1 overflow-auto relative z-10 ${darkMode ? "bg-black" : "bg-[#2f2f2f]"}`}>
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <h2 className="text-xl font-bold mb-6 text-gray-100">Settings</h2>

        {/* Toast */}
        {profileUpdated && (
          <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded mb-4">
            <CheckCircle size={18}/> Profile updated successfully!
          </div>
        )}

        {/* Profile */}
        <section className="p-6 rounded-lg shadow mb-6 bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Profile</h3>
          <input type="text" placeholder="Name" className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-2"/>
          <input type="email" placeholder="Email" className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-2"/>
          <input type="password" placeholder="Password" className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-2"/>
          <button onClick={handleProfileSave} className="bg-indigo-600 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </section>

        {/* Preferences */}
        <section className="p-6 rounded-lg shadow mb-6 bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Preferences</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Dark Mode</span>
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Language</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-700 text-white px-2 py-1 rounded">
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Notifications</span>
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
          </div>
        </section>

        {/* Security */}
        <section className="p-6 rounded-lg shadow bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Security</h3>
          <button onClick={() => setShowPasswordModal(true)} className="bg-red-600 text-white px-4 py-2 rounded mr-2">
            Change Password
          </button>
          <button onClick={() => alert("2FA Enabled")} className="bg-green-600 text-white px-4 py-2 rounded">
            Enable 2FA
          </button>
        </section>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Change Password</h3>
              <input type="password" placeholder="New Password" className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-4"/>
              <button onClick={() => { setShowPasswordModal(false); alert("Password changed successfully!"); }} className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setShowPasswordModal(false)} className="bg-gray-600 text-white px-4 py-2 rounded ml-2">
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SettingsPage;
