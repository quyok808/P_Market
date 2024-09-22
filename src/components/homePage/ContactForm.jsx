import React, { useState } from "react";
import "../../../public/css/contact.css";
import Layout from "../../Layout";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function ContactForm() {
  const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });

    function notifyUser(textnotify) {
      Toastify({
        text: textnotify,
        duration: 3000,
        close: false,
        gravity: "top",
        position: "right",
        backgroundColor: "#D1E9F6",
        style: {
          color: "black", // Thay đổi màu chữ
        },
      }).showToast();
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:8080/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          notifyUser("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Reset form
        } else {
          notifyUser("Failed to send message !");
        }
      } catch (error) {
        console.error("Error:", error);
        notifyUser("An error occurred while sending the message !");
      }
    };

    return (
      <div className="contact-container">
        <form className="form-contact" onSubmit={handleSubmit}>
          <div>
            <label className="contact-label">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>
          <div>
            <label className="contact-label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>
          <div>
            <label className="contact-label">Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="message"
            />
          </div>
          <button className="btn-contact" type="submit">
            Send Message
          </button>
        </form>
      </div>
    );
  };
  return <Layout component={<ContactForm />} />;
}
