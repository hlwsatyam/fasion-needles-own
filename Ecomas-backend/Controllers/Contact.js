const Contact = require("../Models/Contact");

// Handle form submission
exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate request body
        if (!name || !email || !subject) {
            return res.status(400).json({
                success: false,
                message: "Name, Email, and Subject are required fields",
            });
        }

        // Save the contact form data to the database
        const newContact = new Contact({
            name,
            email,
            subject,
            message,
        });

        await newContact.save();

        res.status(200).json({
            success: true,
            message: "Your message has been submitted successfully",
        });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while submitting the form",
        });
    }
};
