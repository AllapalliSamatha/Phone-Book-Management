// const Contact = require('../Models/Contact'); // Import the Contact model

// //Create a new contact
// exports.createContact = async (req, res) => {
//     try {
//         const newContact = new Contact(req.body);
//         const { email } = newContact;

//         // Trim whitespace and convert to lowercase for case-insensitive check
//         const contactExist = await Contact.findOne({ email: email.trim().toLowerCase() });

//         if (contactExist) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const savedData = await newContact.save();
//         res.status(200).json(savedData);
//     } catch (error) {
//         res.status(500).json({ errorMessage: error.message });
//     }
// };


// // Create a new contact
// // exports.createContact = async (req, res) => {
// //     try {
// //         const newContact = new Contact(req.body);
// //         const { email } = newContact;

// //         // Trim whitespace and convert to lowercase for case-insensitive check
// //         const contactExist = await Contact.findOne({ email: email.trim().toLowerCase() });

// //         if (contactExist) {
// //             return res.status(400).json({ message: "User already exists" });
// //         }

// //         const savedData = await newContact.save();
// //         res.status(200).json(savedData);
// //     } catch (error) {
// //         res.status(500).json({ errorMessage: error.message });
// //     }
// // };


// // Get all contacts
// exports.getAllContacts = async (req, res) => {
//     try {
//         const contactData = await Contact.find();

//         if (!contactData || contactData.length === 0) {
//             return res.status(404).json({ message: "User data not found" });
//         }

//         res.status(200).json(contactData);
//     } catch (error) {
//         res.status(500).json({ errorMessage: error.message });
//     }
// };

// // Get a contact by ID
// exports.getContactById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const contactExist = await Contact.findById(id);

//         if (!contactExist) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Respond with the found contact
//         res.status(200).json(contactExist);
//     } catch (error) {
//         res.status(500).json({ errorMessage: error.message });
//     }
// };

// // // Update a contact by ID
// // exports.update = async (req, res) => {
// //     try {
// //         const id = req.params.id;
// //         const contactExist = await Contact.findById(id);

// //         if (!contactExist) {
// //             return res.status(404).json({ message: "User not found" });
// //         }

// //         // Update the contact
// //         const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
// //             new: true, // Return the updated document
// //             runValidators: true // Run validators on the update
// //         });

// //         res.status(200).json(message);
// //     } catch (error) {
// //         res.status(500).json({ errorMessage: error.message });
// //     }
// // };

// // Update a contact by ID
// exports.update = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const contactExist = await Contact.findById(id);

//         if (!contactExist) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Update the contact
//         const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
//             new: true, // Return the updated document
//             runValidators: true // Run validators on the update
//         });

//         res.status(200).json({ message: "Contact updated successfully", updatedContact });
//     } catch (error) {
//         res.status(500).json({ errorMessage: error.message });
//     }
// };



// exports.deleteContact=async(req,res)=>{
//     try{

//         const id = req.params.id;
//         const contactExist = await Contact.findById(id);

//         if (!contactExist) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         await Contact.findByIdAndDelete(id);
//         res.status(200).json({message:"user deleted successfully"});

//     }catch(error){
//         res.status(500).json({ errorMessage: error.message });
//     }
// };


const Contact = require('../Models/Contact'); // Import the Contact model

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const { email } = newContact;

        // Trim whitespace and convert to lowercase for case-insensitive check
        const contactExist = await Contact.findOne({ email: email.trim().toLowerCase() });

        if (contactExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const savedData = await newContact.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contactData = await Contact.find();

        if (!contactData || contactData.length === 0) {
            return res.status(404).json({ message: "User data not found" });
        }

        res.status(200).json(contactData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get a contact by ID
exports.getContactById = async (req, res) => {
    try {
        const id = req.params.id;
        const contactExist = await Contact.findById(id);

        if (!contactExist) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the found contact
        res.status(200).json(contactExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update a contact by ID
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const contactExist = await Contact.findById(id);

        if (!contactExist) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the contact
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Run validators on the update
        });

        res.status(200).json({ message: "Contact updated successfully", updatedContact });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete a contact by ID
exports.deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        const contactExist = await Contact.findById(id);

        if (!contactExist) {
            return res.status(404).json({ message: "User not found" });
        }
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
