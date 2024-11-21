import React from "react";
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

const HelpPage = () => {
  const navGroups = [
    [
      { name: "Dashboard", href: "Dashboard", icon: <FaHome /> },
      { name: "My City", href: "My City", icon: <FaBuilding /> },
      { name: "Project & Task", href: "Project&Task", icon: <FaClipboardList /> },
      { name: "Socials", href: "Socials", icon: <FaComment /> },
    ],
    [
      { name: "Help", href: "Help", icon: <FaQuestionCircle /> },
      { name: "Settings", href: "Settings Page", icon: <FaCog /> },
      { name: "Logout", href: "Logout", icon: <FaSignOutAlt /> },
    ],
  ];

  return (
    <section className="min-h-screen flex flex-col bg-white text-gray-900">
      <div className="flex flex-1">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="p-4 flex-1 bg-gray-50 text-gray-900">
          <h1 className="text-2xl font-bold mb-6">Help Center</h1>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>
            <div className="bg-gray-100 p-4 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold">How to use this application?</h3>
                <p className="text-gray-700">
                  You can navigate through the sidebar to access different features like Dashboard, My City, and more.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">How to reset my password?</h3>
                <p className="text-gray-700">
                  Go to the Settings page and select the "Reset Password" option to follow the reset instructions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">How to contact support?</h3>
                <p className="text-gray-700">
                  You can reach us via the "Contact Us" section or email info@taskspring.net
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                For further assistance, contact us at:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Email: info@taskspring.net</li>
                <li>Phone: +62 8211 7150 423</li>
                <li>Office Hours: Mon-Fri, 9 AM - 5 PM</li>
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Documentation</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">
                Visit our <a href="https://s.id/taskspring_documentation" className="text-blue-500 underline">documentation page</a> to learn more about advanced features and usage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpPage;
