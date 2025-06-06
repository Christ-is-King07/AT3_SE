import React from "react";
import Georgia from "../public/fonts/Georgia.ttf"; // Adjust the path as necessary

export default function Enquire() {
    const [formData, setFormData] = React.useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        event_type: "",
        event_date: "",
        proposed_payment: "",
        how_you_heard: "",
        additional_info: ""
    });

    // Handle form submission, send api data to localhost:3500/api/enquire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending enquiry data:", formData);
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
            setFormData({ first_name: "", last_name:"", email: "", phone_number:"", event_type: "", event_date:"", proposed_payment: "", how_you_heard: "", additional_info: "" });
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
        <div className="md:w-1/2" style={{ fontFamily: "'Georgia', cursive" }}>
            <h1 className="text-3xl font-bold mb-4">Enquire</h1>
            <p className="text-gray-700">
                <b>Ready to make a booking or have a question?</b>
                <br />
                We’re excited to help bring your vision to life! Whether you’re planning a special event, a personal session, or need more details about our packages, just fill out the form below. Please include as much information as possible—like dates, locations, and the type of service you’re after—so we can get back to you with the right details. We aim to respond promptly and make the booking process smooth and stress-free. Let’s make something amazing together!
                <br />
                <br />  
                <b>Phone Number:</b> 0480 237 035
                <br />
                <b>Email:</b> <a href="mailto:">vic-designer@hotmail.com</a>
            </p>
        </div>

        {/* Right side: Form */}
        <div className="md:w-1/2">
            <form className="space-y-4" onSubmit={handleSubmit}>
            <input
                type="text"
                name="first_name"
                placeholder="First Name*"
                className="w-60 mr-6 p-2 border border-gray-300 rounded"
                value={formData.first_name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="last_name"
                placeholder="Last Name*"
                className="w-60 p-2 border border-gray-300 rounded"
                value={formData.last_name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email*"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number*"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.phone_number}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                placeholder="Event Type*"
                name="event_type"
                className="w-60 h-10 mr-6 p-2 border border-gray-300 rounded"
                value={formData.event_type}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="event_date"
                className="w-60 h-10 border border-gray-300 rounded"
                value={formData.event_date}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="proposed_payment"
                placeholder="Proposed Payment Amount*"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.proposed_payment}
                onChange={handleChange}
                required
                pattern="^\d+(\.\d{1,2})?$"
                title="Please enter a valid number, optionally with up to 2 decimal places."
            />            
            <input
            type="text"
            name="how_you_heard"
            placeholder="How did you hear about us?*"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.how_you_heard}
            onChange={handleChange}
            required
            />
            <textarea
                name="additional_info"
                placeholder="Additional information*"
                className="w-full p-2 border border-gray-300 rounded h-32"
                value={formData.additional_info}
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