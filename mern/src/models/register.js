const mongoose = require("mongoose");

// Define your schema and model below this line

const registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: {
        type: String,
        unique: false, // Allow duplicate phone numbers
    },
    date: Date,
});

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
