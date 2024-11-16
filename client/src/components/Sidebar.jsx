// import React from "react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const Sidebar = () => {
  // Add state for dropdown
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  return (
    <div className="h-screen w-48 bg-blue-50 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <ul className="mt-14 p-5">
        <Link to="/admin">
          <li className="text-md text-bold px-4 py-2 hover:bg-blue-100 cursor-pointer">Dashboard</li>
        </Link>
          <li 
            className="text-md px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center justify-between"
            onClick={() => setIsUsersOpen(!isUsersOpen)}
          >
            <span>Users</span>
            <span className={`transform transition-transform ${isUsersOpen ? 'rotate-90' : ''}`}>
            <FaArrowRight />
            </span>
          </li>
         
          {isUsersOpen && (
            <div>
              <ul className="ml-4 mt-1">
              <Link to="/arbitrator">
                <li className="text-sm px-4 py-1 hover:bg-blue-100 cursor-pointer">Arbitrator</li>
              </Link>

              <Link to="/client">

                <li className="text-sm px-4 py-1 hover:bg-blue-100 cursor-pointer">Client</li>
              </Link>
              </ul>
            </div>
          )}
          <li className="text-sm px-4 py-2 hover:bg-blue-100 cursor-pointer">Cases</li>
          <li className="text-sm px-4 py-2 hover:bg-blue-100 cursor-pointer">Meetings</li>
          <li className="text-sm px-4 py-2 hover:bg-blue-100 cursor-pointer">Documents</li>
          <li className="text-sm px-4 py-2 hover:bg-blue-100 cursor-pointer">Tickets</li>
          <li className="text-sm px-4 py-2 hover:bg-blue-100 cursor-pointer">Consultation Requests</li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div>
        <ul>
          <li className="text-sm px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2">
            <span className="text-gray-500">⚙️</span> Settings
          </li>
          <li className="text-sm px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2">
            <span className="text-red-500">🚪</span> Log out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
