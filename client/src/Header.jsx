import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';
import logo from './assets/vic cam.png';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const onClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    logout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 text-black border-b bg-white">
      <Link to="/home" className="ml-6 block">
        <img src={logo} alt="Logo" className="h-20 w-35" />
      </Link>
      <h1 style={{ fontFamily: "'Snell Roundhand', cursive" }} className="text-4xl font-bold">
        Vic Photography
      </h1>

      {/* Make the nav itself flex so its children line up */}
      <nav className="flex items-center space-x-6 mr-5 text-2xl" style={{ fontFamily: "'Snell Roundhand', cursive" }}>
        
        {/* Dropdown wrapper */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(o => !o)}
            className="px-4 py-2 hover:underline flex items-center focus:outline-none -mr-8"
          >
            Menu
            <svg
              className={`ml-2 h-4 w-4 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <Link to="/home" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                Home
              </Link>
              <Link to="/about" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                About Me
              </Link>
              <Link to="/enquire" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                Enquire
              </Link>
              <Link to="/packages" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                Book Now
              </Link>
            </div>
          )}
        </div>

        {/* These now sit inline, to the right of the dropdown */}
        {user?.isAdmin && (
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        )}

        {user ? (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
