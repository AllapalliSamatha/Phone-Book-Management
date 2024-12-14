const express = require("express"); // Use require instead of import
const { createContact, getAllContacts, getContactById, update,deleteContact } = require("../Controllers/contactController"); // Import the necessary functions

const route = express.Router();

// Route to create a new contact
route.post("/contacts", createContact); 

// Route to get all contacts
route.get("/contacts", getAllContacts); 

// Route to get a contact by ID
route.get("/contacts/:id", getContactById); 

// Route to update a contact by ID
route.put("/contacts/:id", update); 

//Route to delete a contact by ID
route.delete("/contacts/:id",deleteContact);

module.exports = route; // Export the route using module.exports
