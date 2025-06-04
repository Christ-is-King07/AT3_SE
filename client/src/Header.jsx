import React from 'react';
import {Link} from 'react-router-dom';
import logo from './assets/vic cam.png'; // Adjust the path as necessary

export default function Header() {
    return(
        <header className="flex justify-between items-center p-4 text-black border-b border-black-600 bg-white">    
        <div className="">
            <img src={logo} alt="Logo" className="h-20 w-35 mr-2 ml-6" />
        </div>
        <h1 style={{ fontFamily: "'Snell Roundhand', cursive" }} className="text-4xl font-bold ml-40">Vic Photography</h1>
        <nav style={{ fontFamily: "'Snell Roundhand', cursive" }} className="mr-5 space-x-4 text-2xl">
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline ml-5">About Me</Link>
            <Link to="/enquire" className="hover:underline ml-5">Enquire</Link>
        </nav>
    </header>
    );
}