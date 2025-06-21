import React from 'react';
import wedding from './assets/wedding.webp';
import wedding2 from './assets/wedding2.png';
import catholicmarriage from './assets/marriage in front of communion.webp';
import baptism from './assets/baptism.webp';
import HarbourBridge from './assets/harbour_bridge.png';
import {Link} from 'react-router-dom';
import 'swiper/css';
  
  export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100"  style={{ fontFamily: "'Georgia', cursive" }}>
            <img src={HarbourBridge} className="w-400 h-190" />
            
            <div className="flex flex-row items-center justify-between bg-gray-50 p-4 rounded drop-shadow-lg mt-4 w-325">
                <div className="flex flex-col mt-25">
                    <h1 className="text-2xl font-bold text-center -mt-30 mb-10 ml-11 mr-20">Welcome to My Website</h1>
                    <p className="text-gray-700 text-center ml-10 mr-20">I'm a creative individual with a passion for capturing moments through the lens. I enjoy exploring different styles and perspectives to tell visual stories that resonate. Always inspired by the world around me, I aim to create images that are both meaningful and memorable.</p>
                    <div className="flex justify-center mt-10">
                        <Link to="/about" className="bg-gray-500 text-white px-4 py-2 mr-20 rounded hover:bg-gray-600 transition duration-300 ml-11">About Me</Link>
                    </div>
                </div>
                <img src={baptism} className="w-150 h-100" alt="Catholic Marriage" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4 mb-4">
                <img src={wedding2} /> 
            </div>
            <div className="flex flex-row items-center justify-between bg-gray-50 p-4 rounded drop-shadow-lg mb-4 w-325">
                <img src={catholicmarriage} className="w-150 h-100" alt="Catholic Marriage" />
                <div className="flex flex-col mt-25">
                    <h1 className="text-2xl font-bold text-center -mt-30 mb-10 mr-11 ml-20">Create Memories</h1>
                    <p className="text-gray-700 text-center mr-10 ml-20">Ready to capture your special moments? Whether it’s a personal shoot, event, or creative project, I’d love to bring your vision to life. Click below to book your session and let’s create something amazing together.</p>
                    <div className="flex justify-center mt-10">
                        <Link to="/packages" className="bg-gray-500 text-white px-4 py-2 ml-20 rounded hover:bg-black transition duration-300 mr-11">Book Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}