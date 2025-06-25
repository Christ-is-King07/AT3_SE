import React, { useState, useEffect } from "react";


export default function Enquire() {
    const [status, setStatus] = useState(null);
    const [formData, setFormData] = useState({
    phone_number: "",
    how_you_heard: "",
    additional_info: ""
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
        console.log("Sending enquiry data:", formData);
        const res = await fetch("http://localhost:3500/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        console.log("Enquiry submitted:", data);
        setStatus('success');

        setFormData({
        phone_number: "",
        how_you_heard: "",
        additional_info: ""
        });
    } catch (err) {
        console.error("Error submitting enquiry:", err);
        setStatus('error');
    }
    };

    return (
    <div className="flex flex-col items-center justify-start bg-gray-100 pt-12">
        <div className="flex flex-col md:flex-row max-w-6xl w-full px-8 mb-25 mt-15 gap-20">
        {/* Left side */}
        <div className="md:w-1/2" style={{ fontFamily: "Georgia, serif" }}>
            <h1 className="text-3xl font-bold mb-4">Enquire</h1>
            <p className="text-gray-700 mr-10">
            <br /> Have a question, a creative idea, or simply want to learn more before booking a session? I’m always happy to chat and hear about your vision. Whether you're planning a shoot, need more details about packages, or just want to see if we’re the right fit, feel free to reach out. Fill out the enquiry form below, and I’ll get back to you as soon as possible. Let’s start the conversation and bring your ideas to life!
            <br />
            <br />
            <b>Phone:</b> 0480 237 035<br />
            <b>Email:</b>{" "}
            <a href="mailto:vic-designer@hotmail.com">
                vic-designer@hotmail.com
            </a>
            </p>
        </div>

        {/* Right side */}
        <div className="md:w-1/2">
            <form className="space-y-4" onSubmit={handleSubmit}>
            <input
                type="text"
                name="how_you_heard"
                placeholder="How did you hear about us?*"
                className="w-full p-2 border rounded"
                value={formData.how_you_heard}
                onChange={handleChange}
                required
            />

            <textarea
                name="additional_info"
                placeholder="Additional information*"
                className="w-full p-2 border rounded h-32"
                value={formData.additional_info}
                onChange={handleChange}
                required
            />

            <button
                type="submit"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
                Send
            </button>
            {status === 'loading' && <p className="mt-2 text-blue-600">Submitting…</p>}
            {status === 'success' && <p className="mt-2 text-green-600">Enquiry sent!</p>}
            {status === 'error' && <p className="mt-2 text-red-600">There was an error. Please try again.</p>}
            </form>
        </div>
        </div>
    </div>
    );
}
