import React from 'react';
import wedding from './assets/wedding.webp';
import wedding2 from './assets/wedding2.png';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
                <img src={wedding2} className="w-400 h-165"></img>
            <div class="column" className="flex flex-wrap justify-center gap-4 p-4">    

                <img src={wedding}></img> 
                <img src={wedding}></img>
                <img src={wedding}></img>
                <img src={wedding}></img>
                <img src={wedding}></img>
            </div>
            </div>
    );
}