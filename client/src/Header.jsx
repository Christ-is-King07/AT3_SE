import React from 'react';
import logo from './assets/logo.png'; // Adjust the path as necessary

export default function Header() {
    return(
        <header className="flex justify-between items-center p-4 text-black border-b border-black-600 bg-white">    
        <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-23 w-40 mr-2 ml-6" />
        </div>
        <h1 className="text-xl font-bold">Vic Photography</h1>
        <nav className="mr-5 space-x-4">
            <route element="/" className="hover:underline">Home</route>
            <a element="/about" className="hover:underline">About Me</a>
            <a element="/enquire" className="hover:underline">Enquire</a>
        </nav>
    </header>
    );
}