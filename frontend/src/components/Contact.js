// src/components/Contact.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const Contact = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/contacts");
                setContacts(response.data);
            } catch (error) {
                console.log("Error while fetching the data", error);
            }
        };
        fetchData();
    }, []);

    const deleteContact = async (contactId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/contacts/${contactId}`);
            setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== contactId));
            toast.success(response.data.message, { position: "top-right" });
        } catch (error) {
            console.log("Error while deleting contact", error);
        }
    };

    return (
        <div className="contactTable">
            <Link to="/add" className="btn add-contact-btn">Add Contact <i className="fa-solid fa-user-plus"></i></Link>
            
            {contacts.length===0?(
                <div className="noData">
                
                <h3>No Contacts to Display</h3>
                <p>Add Contacts</p>
                </div>

            ):(
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={contact._id}>
                            <td>{index + 1}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phoneNumber}</td>
                            <td>
                                <Link to={`/update-contact/${contact._id}`} className="btn btn-info">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                            </td>
                            <td>
                                <button 
                                    onClick={() => deleteContact(contact._id)}
                                    type="button" className="btn btn-danger">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            )}
            
        </div>
    );
};

export default Contact;
