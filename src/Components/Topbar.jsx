import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <header className="topbar bg-gray-100 p-4 shadow-md flex items-center justify-between">
      {/* Navigasi atau Ikon di Topbar */}
      <div className="actions flex items-center space-x-6 w-full justify-between">
        {/* Judul atau Nama Halaman */}
        <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>

        {/* Notifikasi dan Profil Pengguna */}
        <div className="flex items-center space-x-6">
          {/* Notifikasi */}
          <button className="relative text-gray-600 hover:text-gray-800">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>

          {/* Profil Pengguna */}
          <div className="profile flex items-center space-x-2 cursor-pointer">
            <FaUserCircle className="text-2xl text-gray-600 hover:text-gray-800" />
            <span className="text-gray-800 font-medium">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
