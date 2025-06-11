import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';
import logo from './assets/vic cam.png';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 text-black border-b bg-white">
      <div>
        <img src={logo} alt="Logo" className="h-20 w-35 ml-6" />
      </div>
      <h1 style={{ fontFamily: "'Snell Roundhand', cursive" }} className="text-4xl font-bold">
        Vic Photography
      </h1>
      <nav style={{ fontFamily: "'Snell Roundhand', cursive" }} className="mr-5 space-x-4 text-2xl">
        <Link to="/home" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About Me</Link>
        <Link to="/enquire" className="hover:underline">Enquire</Link>

        {/* only for admins */}
        {user?.isAdmin && (
          <Link to="/admin" className="hover:underline">Admin</Link>
        )}

        {/* if logged in, show Logout; otherwise Login & Register */}
        {user ? (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
