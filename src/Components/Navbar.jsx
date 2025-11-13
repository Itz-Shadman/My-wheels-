import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Navbar.jsx


export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">

      <div className="text-2xl font-bold">
        <Link to="/">RentWheels</Link>
      </div>


      <ul className="flex space-x-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-car">Add Car</Link></li>
        <li><Link to="/my-listings">My Listings</Link></li>
        <li><Link to="/my-bookings">My Bookings</Link></li>
        <li><Link to="/browse-cars">Browse Cars</Link></li>
      </ul>

      <div className="flex items-center space-x-4 relative">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-gray-200"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="relative">
            <img
              src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                <p className="px-4 py-2 font-semibold border-b">{user.displayName || "User"}</p>
                <p className="px-4 py-2 text-sm border-b">{user.email}</p>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
