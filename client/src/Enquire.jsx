import React from "react";

export default function Enquire() {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: ""
    });

    // Handle form submission, send api data to localhost:3500/api/enquire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3500/api/enquire", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Enquiry submitted successfully:", data);
            // Reset form after successful submission
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error submitting enquiry:", error);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Render the form
return (
    <div className="flex flex-col items-center justify-start bg-gray-100 min-h-screen pt-12">
        <div className="flex flex-col md:flex-row max-w-6xl w-full px-8 gap-20">
        {/* Left side: Heading and description */}
        <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">Enquire</h1>
            <p className="text-gray-700">
            Please fill out the form below to get in touch with us.
            </p>
        </div>
    
        {/* Right side: Form */}
        <div className="md:w-1/2">
            <form className="space-y-4" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <textarea
                name="message"
                placeholder="Your Message"
                className="w-full p-2 border border-gray-300 rounded h-32"
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea>
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