import React, { useState } from "react";

export default function Enquire() {
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
        setFormData({
        phone_number: "",
        how_you_heard: "",
        additional_info: ""
        });
    } catch (err) {
        console.error("Error submitting enquiry:", err);
    }
    };

    return (
    <div className="flex flex-col items-center justify-start bg-gray-100 min-h-screen pt-12">
        <div className="flex flex-col md:flex-row max-w-6xl w-full px-8 gap-20">
        {/* Left side */}
        <div className="md:w-1/2" style={{ fontFamily: "Georgia, serif" }}>
            <h1 className="text-3xl font-bold mb-4">Enquire</h1>
            <p className="text-gray-700">
            <b>Ready to make a booking or have a question?</b>
            <br />
            We’re excited to help… <br /><br />
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
                type="tel"
                name="phone_number"
                placeholder="Phone Number*"
                className="w-full p-2 border rounded"
                value={formData.phone_number}
                onChange={handleChange}
                required
            />

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
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Send
            </button>
            </form>
        </div>
        </div>
    </div>
    );
}
