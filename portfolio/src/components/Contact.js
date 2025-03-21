import React, { useState } from "react";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setError("All fields are required!");
        } else {
            alert("Message Sent!");
            setForm({ name: "", email: "", message: "" });
            setError("");
        }
    };

    return (
        <div className="container" id="contact">
            <h2>Contact Me</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required /><br/>
                <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required /><br/>
                <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required></textarea><br/>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Contact;
