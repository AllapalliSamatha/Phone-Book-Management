// backend/src/models/Contact.js

const mongoose = require('mongoose');

// Define the schema for contacts
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Name is required
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true // Ensure email is unique
    },
    phoneNumber: {
        type: String,
        required: true // Phone number is required
    }
    
});

// Export the model and specify the collection name as 'contacts'
module.exports = mongoose.model('Contact', contactSchema, 'contacts');
