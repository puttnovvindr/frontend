// SettingsPage.jsx
import React, { useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaComment,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Dashboard.css";
import { useLanguage } from "../context/LanguageContext";  // Pastikan untuk mengimport hook ini

const SettingsPage = () => {
  const navGroups = [
    [
      { name: "Dashboard", href: "#", icon: <FaHome /> },
      { name: "My City", href: "#", icon: <FaBuilding /> },
      { name: "Project & Task", href: "#", icon: <FaClipboardList /> },
      { name: "Socials", href: "#", icon: <FaComment /> },
    ],
    [
      { name: "Help", href: "#", icon: <FaQuestionCircle /> },
      { name: "Settings", href: "#", icon: <FaCog /> },
      { name: "Logout", href: "#", icon: <FaSignOutAlt /> },
    ],
  ];

  const { language, setLang, translations } = useLanguage();  // Ambil terjemahan dan setLang dari konteks
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [subscriptionStatus, setSubscriptionStatus] = useState("Active");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordReset = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }
    alert("Password reset successful!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleNotificationToggle = () => setNotifications((prev) => !prev);
  const handleLanguageChange = (e) => {
    setLang(e.target.value);
    setSelectedLanguage(e.target.value);
  };
  const handleSubscriptionChange = () => setSubscriptionStatus(subscriptionStatus === "Active" ? "Inactive" : "Active");

  return (
    <section className="min-h-screen flex flex-col bg-white text-gray-900">
      <div className="flex flex-1">
        <aside className="w-1/5 bg-gray-100 p-8">
          <div className="logo mb-8 flex items-center space-x-4">
            <img
              src="/t_logo.svg"
              alt="Taskspring Logo"
              className="w-10 h-10"
            />
            <h3 className="text-2xl font-semibold text-black">Taskspring</h3>
          </div>
          <nav>
            {navGroups.map((group, groupIndex) => (
              <div key={groupIndex} className={groupIndex > 0 ? "mt-40" : ""}>
                {group.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center py-2 px-4 rounded text-gray-800 hover:bg-gray-200 space-x-2"
                  >
                    {link.icon && <span>{link.icon}</span>}
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <div className="p-4 flex-1 bg-gray-50 text-gray-900">
          <h1 className="text-2xl font-bold mb-6">{translations.settings}</h1>

          {/* Layout with 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left Column - Reset Password */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">{translations.resetPassword}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2" htmlFor="oldPassword">
                    {translations.oldPassword}
                  </label>
                  <input
                    id="oldPassword"
                    type={isPasswordVisible ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" htmlFor="newPassword">
                    {translations.newPassword}
                  </label>
                  <input
                    id="newPassword"
                    type={isPasswordVisible ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" htmlFor="confirmPassword">
                    {translations.confirmPassword}
                  </label>
                  <input
                    id="confirmPassword"
                    type={isPasswordVisible ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-gray-900"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={handlePasswordReset}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    {translations.resetPassword}
                  </button>
                  <button
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    className="text-blue-500"
                  >
                    {isPasswordVisible ? translations.hidePassword : translations.showPassword}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Notifications, Language, Subscription */}
            <div className="space-y-6">
              {/* Notifications */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">{translations.notifications}</h2>
                <div className="flex items-center justify-between">
                  <span>{translations.enableNotifications}</span>
                  <button
                    onClick={handleNotificationToggle}
                    className={`px-4 py-2 rounded-lg ${notifications ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  >
                    {notifications ? "On" : "Off"}
                  </button>
                </div>
              </div>

              {/* Language Preferences */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">{translations.languagePreferences}</h2>
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-900"
                >
                  <option value="en">English</option>
                  <option value="id">Indonesian</option>
                </select>
              </div>

              {/* Billing / Subscription */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">{translations.billing}</h2>
                <div className="flex items-center justify-between">
                  <span>{translations.subscriptionStatus}: {subscriptionStatus}</span>
                  <button
                    onClick={handleSubscriptionChange}
                    className={`px-4 py-2 rounded-lg ${subscriptionStatus === "Active" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  >
                    {subscriptionStatus === "Active" ? translations.deactivate : translations.activate}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="mt-6">
            <button
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg"
              onClick={() => alert("Settings saved!")}
            >
              {translations.saveChanges}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
