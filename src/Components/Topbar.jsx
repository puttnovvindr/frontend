import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { MdModeEdit, MdClose } from "react-icons/md";

function Topbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for notification dropdown
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "yourname@gmail.com",
    phone: "08211723729",
    location: "Indonesia",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imageInputKey, setImageInputKey] = useState(Date.now());

  // Example notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You have a new message!", time: "5 minutes ago" },
    { id: 2, message: "Your profile was updated successfully.", time: "1 hour ago" },
    { id: 3, message: "New friend request received.", time: "2 hours ago" },
    { id: 4, message: "You have a meeting scheduled.", time: "3 hours ago" },
    { id: 5, message: "System update completed.", time: "5 hours ago" },
  ]);

  const [showAllNotifications, setShowAllNotifications] = useState(false); // State for Mark All Read
  const handleMarkAllRead = () => setShowAllNotifications(true);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const dropdownRef = useRef(null);

  // Reset to default view when dropdown closes
  useEffect(() => {
    if (!isDropdownOpen) {
      setShowAllNotifications(false); // Reset to only show limited notifications
    }
  }, [isDropdownOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

  // Toggle dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSaveChanges = () => {
    setIsModalOpen(false);
    setIsNotificationOpen(true);
  };

  return (
    <header className="bg-gray-100 px-8 py-4 flex items-center justify-between w-full border-b">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

        <div className="flex items-center space-x-6 relative">
          {/* Notifications */}
          <button
            className="relative text-gray-600 hover:text-gray-800"
            onClick={toggleDropdown}
          >
            <FaBell className="text-3xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {notifications.length}
            </span>
          </button>

          {/* Dropdown for Notifications */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-36 top-10 bg-white shadow-lg rounded-lg w-64 z-10"
            >
              <div className="p-4 border-b font-bold text-gray-800">
                Notifications
              </div>
              <ul
                className={`${
                  showAllNotifications ? "max-h-80" : "max-h-36"
                } overflow-y-auto`}
              >
                {(showAllNotifications ? notifications : notifications.slice(0, 3)).map(
                  (notification) => (
                    <li
                      key={notification.id}
                      className="p-3 hover:bg-gray-100 border-b last:border-none"
                    >
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </li>
                  )
                )}
              </ul>
              {!showAllNotifications && (
                <div className="p-4 text-center border-t">
                  <button
                    onClick={handleMarkAllRead}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Mark All Read
                  </button>
                </div>
              )}
            </div>
          )}
        
        
          {/* User Profile */}
          <div
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-800"
            onClick={toggleModal}
          >
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-gray-400"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-600" />
              )}
            </div>
            <span className="text-gray-800 font-medium">{formData.name}</span>
          </div>
        </div>
      </div>

      {/* Modal for Profile Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={toggleModal}
              className="absolute top-5 right-5 text-gray-600 hover:text-gray-800"
            >
              <MdClose className="text-xl" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 mb-4">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-4 border-gray-400"
                  />
                ) : (
                  <FaUserCircle className="w-16 h-16 text-gray-600" />
                )}
                <div className="text-left">
                  <h3 className="text-xl font-semibold">{formData.name}</h3>
                  <p className="text-gray-600">{formData.email}</p>
                </div>
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                >
                  <MdModeEdit className="transform -translate-x-52 translate-y-5 bg-blue-500 text-gray-100 rounded-full text-xl p-1 hover:text-white" />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  key={imageInputKey}
                  onChange={handleImageChange}
                />
              </div>
              <div className="space-y-6 w-full">
                <div className="flex items-center space-x-4 border-b pb-4">
                  <label className="text-gray-700 w-32">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  />
                </div>
                <div className="flex items-center space-x-4 border-b pb-4">
                  <label className="text-gray-700 w-32">Email Account</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  />
                </div>
                <div className="flex items-center space-x-4 border-b pb-4">
                  <label className="text-gray-700 w-32">Mobile Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  />
                </div>
                <div className="flex items-center space-x-4 border-b pb-4">
                  <label className="text-gray-700 w-32">Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  >
                    <option value="Indonesia">Indonesia</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {isNotificationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg w-72">
            <h3 className="text-xl font-semibold">Profile Updated</h3>
            <p>Your profile has been successfully updated!</p>
            <button
              onClick={toggleNotification}
              className="mt-4 bg-white text-green-500 p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Topbar;
