import React from 'react';
import wedding from './assets/wedding.webp';
import wedding2 from './assets/wedding2.png';
import catholicmarriage from './assets/marriage in front of communion.webp';
import baptism from './assets/baptism.webp';
import HarbourBridge from './assets/harbour_bridge.png';
import {Link} from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
                <img src={HarbourBridge} className="w-400 h-190"></img>
                <div className="flex flex-row items-center justify-between bg-gray-50 p-4 rounded drop-shadow-lg mt-4 w-325">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-center -mt-30 mb-10">Welcome to My Website</h1>
                        <p className="text-gray-700 text-center">Here you can find all the information you need to plan your perfect weddinga anfuhaeuhafhasoh.</p>
                        <div className="flex justify-center mt-10">
                        <Link to="/about" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-black transition duration-300">About Me</Link>

                        </div>
                    </div>
                    <img src={catholicmarriage} className="w-150 h-100" alt="Catholic Marriage"></img>
                </div>
                
            <div className="flex flex-wrap justify-center gap-4 p-4">    
                <img src={baptism}className="w-150 h-100"></img>
                <img src={wedding2}></img>
                <img src={wedding}></img>
                <img src={wedding}></img>
            </div>
            </div>
    );
}