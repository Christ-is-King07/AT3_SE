import React from 'react';
import {Link} from 'react-router-dom';
import logo from './assets/logo.png'; // Adjust the path as necessary

export default function Header() {
    return(
        <header className="flex justify-between items-center p-4 text-black border-b border-black-600 bg-white">    
        <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-23 w-40 mr-2 ml-6" />
        </div>
        <h1 className="text-xl font-bold">Vic Photography</h1>
        <nav className="mr-5 space-x-4">
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About Me</Link>
            <Link to="/enquire" className="hover:underline">Enquire</Link>
        </nav>
    </header>
    );
}