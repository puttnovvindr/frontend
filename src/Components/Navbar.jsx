import React from "react";
import { FaHome, FaBuilding, FaClipboardList, FaComment, FaQuestionCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "./ThemeContext"; 

function Navbar() {
  const { isDarkMode } = useTheme(); 

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

  return (
    <div className={`navbar flex flex-col ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <div className="topbar flex justify-between items-center p-4">
        <div className="logo flex items-center space-x-4">
          <img
            src="/taskspring.svg"
            alt="Taskspring Logo"
            className="w-10 h-10 shadow-md"
          />
          <h3 className="text-2xl font-semibold">{`Taskspring`}</h3>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col">
        {navGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={groupIndex > 0 ? "mt-[460px]" : ""}>
            {group.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`flex items-center py-2 px-4 rounded space-x-2 ${isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-800 hover:bg-gray-200"}`}
              >
                {link.icon && <span>{link.icon}</span>}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
