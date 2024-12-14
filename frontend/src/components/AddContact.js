

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddContact.css";


const AddContact = () => {
  const initialContact = {
    name: "",
    email: "",
    phoneNumber: ""
  };

  const [contact, setContact] = useState(initialContact);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/contacts", contact);
      console.log("Created contact data:", response.data);
      toast.success("Contact created successfully!");

      // Wait for 2 seconds (2000 ms) before navigating to home
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) { // Adjust this code as needed
        toast.error("Contact already exists. Please use a different email or phone number.");
      } else {
        toast.error("Failed to create contact. Please try again.");
      }
      console.error("Error creating contact:", error);
    }
  };

  return (
    <div className="addContact">
      <Link to="/home" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New Contact</h3>
      <form className="addContactForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"
            value={contact.name}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={contact.email}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            onChange={inputHandler}
            name="phoneNumber"
            autoComplete="off"
            placeholder="Enter your Phone Number"
            value={contact.phoneNumber}
          />
        </div>

        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

      {/* ToastContainer displays toast notifications */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default AddContact;
