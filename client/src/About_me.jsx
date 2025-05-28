import React from "react";

export default function About_me() {
    return(
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
            <div className="p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold mb-4">About Me</h1>
                <p className="mb-6">Hello! I'm a passionate photographer with a love for capturing life's most beautiful moments. My journey in photography began at a young age, and it has since evolved into a lifelong passion.</p>
                <p className="mb-6">I specialize in various types of photography, including weddings, portraits, and landscapes. My goal is to create stunning images that tell a story and evoke emotions.</p>
                <p className="mb-6">When I'm not behind the camera, you can find me exploring new places, experimenting with different styles, or spending time with my family and friends.</p>
            </div>
        </div>
    );
}