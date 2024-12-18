import React, { useState } from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { MdDriveFileRenameOutline, MdDeleteOutline } from "react-icons/md";
import { FaEllipsisV, FaPaperclip, FaImage } from 'react-icons/fa';
import { TiEye } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaComment,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Socials() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [message, setMessage] = useState('');
  const [groups, setGroups] = useState([]);
  const [chats, setChats] = useState({});
  const [newGroupName, setNewGroupName] = useState('');
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open
  const [file, setFile] = useState(null); // Store uploaded file (image or other)
  const [modal, setModal] = useState({ type: '', group: null, file: null });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const defaultGroupPhoto = 'https://via.placeholder.com/100';



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

  const userProfile = {
    name: 'John Doe',
    photo: 'https://via.placeholder.com/50',
  };

  const handleSendMessage = () => {
    if (message.trim() || file) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage = {
        text: message,
        time: timestamp,
        user: userProfile,
        file: file ? URL.createObjectURL(file) : null,
        fileName: file?.name || null,
      };

      setChats((prevChats) => ({
        ...prevChats,
        [selectedGroup]: [...(prevChats[selectedGroup] || []), newMessage],
      }));
      setMessage('');
      setFile(null); // Clear file after sending
    }
  };

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = { id: Date.now(), name: newGroupName, photo: defaultGroupPhoto };
      setGroups([...groups, newGroup]);
      setModal({ type: '', group: null }); // Close modal
      setNewGroupName('');
    }
  };

  const handleRenameGroup = () => {
    if (newGroupName.trim() && modal.group) {
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === modal.group.id ? { ...group, name: newGroupName } : group
        )
      );
      setModal({ type: '', group: null });
      setNewGroupName('');
    }
  };

  const handleDeleteGroup = () => {
    if (modal.group) {
      setGroups((prevGroups) => prevGroups.filter((group) => group.id !== modal.group.id));
      setChats((prevChats) => {
        const { [modal.group.id]: _, ...remainingChats } = prevChats;
        return remainingChats;
      });
      setSelectedGroup(null);
      setModal({ type: '', group: null });
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Simpan file untuk ditampilkan di input chat
    }
  };

  return (
    <section className="min-h-screen flex flex-col sm:flex-row bg-white text-gray-900">
      {/* Sidebar kiri */}
      <aside className="w-1/5 bg-white p-8">
          <div className="logo mb-8 flex items-center space-x-4">
            <img
              src="/taskspring.svg"
              alt="Taskspring Logo"
              className="w-10 h-10 shadow-md"
            />
            <h3 className="text-2xl font-semibold text-black">Taskspring</h3>
          </div>
          <nav>
            {navGroups.map((group, groupIndex) => (
              <div key={groupIndex} className={groupIndex > 0 ? "mt-60" : ""}>
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

      {/* List Grup */}
      <div className="w-full sm:w-1/4 bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Recent Messages</h3>
          <button
            className="text-2xl text-black"
            onClick={() => setModal({ type: 'add' })}
          >
            <BiSolidEdit />
          </button>
        </div>

        {/* Add this container to handle scroll */}
        <div className="overflow-y-auto max-h-[84vh]">
          <ul>
            {groups.length === 0 ? (
              <p className="text-gray-500">No groups available. Create one!</p>
            ) : (
              groups.map((group) => (
                <li
                  key={group.id}
                  className={`p-4 rounded flex justify-between items-center cursor-pointer ${
                    selectedGroup === group.id ? 'bg-blue-100' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <div className="flex items-center">
                    <img src={group.photo} alt="Group" className="w-10 h-10 rounded-full mr-4" />
                    <span>{group.name}</span>
                  </div>
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === group.id ? null : group.id);
                    }}
                  >
                    <FaEllipsisV />
                  </button>
                  {openMenu === group.id && (
                    <div className="absolute transform translate-x-40 translate-y-12 bg-white border shadow-md rounded">
                      <button
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 hover:rounded flex items-center gap-2"
                        onClick={() => setModal({ type: 'rename', group })}
                      >
                        <MdDriveFileRenameOutline className='text-lg'/> Rename
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-red-500  hover:bg-gray-100 hover:rounded flex items-center gap-2"
                        onClick={() => setModal({ type: 'delete', group })}
                      >
                        <MdDeleteOutline className='text-lg'/> Delete
                      </button>
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>

          {/* Rename Group Modal */}
          {modal.type === 'rename' && modal.group && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="relative bg-white p-4 rounded w-96">
                <h3 className="text-xl mb-4">Rename Group</h3>
                <input
                  type="text"
                  placeholder="Rename group"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setModal({ type: '', group: null })}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRenameGroup}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Group Modal */}
          {modal.type === 'delete' && modal.group && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="relative bg-white p-4 rounded">
                <h3 className="text-xl mb-4">Delete Group</h3>
                <p>Are you sure you want to delete the group "{modal.group.name}"?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleDeleteGroup}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setModal({ type: '', group: null })}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Group Modal */}
          {modal.type === 'add' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="relative bg-white p-4 rounded w-96">
                <h3 className="text-xl mb-4">Create New Group</h3>
                <input
                  type="text"
                  placeholder="Group name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setModal({ type: '', group: null })}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddGroup}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}



        </div>
      </div>

      {/* Chat Section */}
      <div className="w-full sm:w-3/4 bg-white p-8 flex flex-col">
        {selectedGroup ? (
          <>
            <h3 className="text-lg font-semibold mb-4">
              {groups.find((group) => group.id === selectedGroup)?.name}
            </h3>
            <div className="flex-1 overflow-y-auto max-h-[76vh]">
              {chats[selectedGroup]?.map((msg, idx) => (
                <div key={idx} className="mb-4 flex items-start">
                  <img
                    src={msg.user.photo || 'https://via.placeholder.com/50'}
                    alt={msg.user.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <div className="text-sm font-semibold">{msg.user.name}</div>
                    <div>
                      {msg.text && <p>{msg.text}</p>}
                      {msg.file && (
                        <div className="mt-2">
                          {msg.fileName.match(/\.(jpg|jpeg|png|gif|bmp)$/i) ? (
                            <img
                              src={msg.file}
                              alt="Uploaded"
                              className="w-60 h-auto rounded mt-2 cursor-pointer"
                              onClick={() => setModal({ type: 'preview', group: null, file: msg.file })}
                            />
                          ) : (
                            <div className="flex items-center p-3 border rounded bg-gray-100">
                              <FaPaperclip className="text-gray-500 text-xl mr-2" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{msg.fileName}</span>
                                <span className="text-xs text-gray-500">Sent at {msg.time}</span>
                              </div>
                              <a
                                href={msg.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-3 text-gray-400 text-lg mb-4"
                              >
                                <TiEye />
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>


            {/* Input Section */}
            <div className="mt-4 flex flex-col items-start border rounded-lg px-4 py-2 w-full">
              {file && (
                <div className="flex items-center p-2 border rounded bg-gray-100 mb-2">
                  <div className="flex items-center">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded cursor-pointer"
                      />
                    ) : (
                      <>
                        <FaPaperclip className="text-gray-500 text-xl mr-2" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    className="ml-2 bg-red-500 text-white rounded-full"
                    onClick={() => setFile(null)}
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              )}

              <div className="flex items-center w-full">
                <div className="relative">
                  <button
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    <FiPlus className='rounded-full w-5 h-5 bg-gray-300 text-white'/>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute bg-white border shadow-lg rounded mt-2 bottom-8 z-10 w-40">
                      <label
                        htmlFor="file-upload"
                        className="block px-4 py-4 text-sm cursor-pointer hover:bg-gray-100 flex gap-1 items-center"
                      >
                        <FaPaperclip className="inline mr-1" /> Upload File
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          handleFileSelect(e);
                          setDropdownOpen(false);
                        }}
                      />

                      <label
                        htmlFor="image-upload"
                        className="block px-4 py-4 text-sm cursor-pointer hover:bg-gray-100 flex gap-1 items-center"
                      >
                        <FaImage className="inline mr-1" /> Upload Image
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          handleFileSelect(e);
                          setDropdownOpen(false);
                        }}
                      />
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 outline-none h-10 w-full px-4"
                />
                <button
                  onClick={handleSendMessage}
                  className=" text-gray-300 text-xl"
                >
                  <IoMdSend />
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Select a group to start chatting.</p>
        )}
      </div>

      {/* Preview Modal */}
      {modal.type === 'preview' && modal.file && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-4 rounded">
            <img src={modal.file} alt="Preview" className="max-w-full max-h-[80vh] rounded" />
            <button
              onClick={() => setModal({ type: '', group: null, file: null })}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Socials;
