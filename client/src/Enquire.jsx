import React from "react";

export default function Enquire() {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
            <div className="p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold mb-4">Enquire</h1>
                <p className="mb-6">Please fill out the form below to get in touch with us.</p>
                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-2 border border-gray-300 rounded" required />
                    <input type="email" placeholder="Your Email" className="w-full p-2 border border-gray-300 rounded" required />
                    <textarea placeholder="Your Message" className="w-full p-2 border border-gray-300 rounded h-32" required></textarea>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Send</button>
                </form>
            </div>
        </div>
    );
}