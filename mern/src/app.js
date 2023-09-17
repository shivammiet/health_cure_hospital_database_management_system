const express = require("express");
const mongoose = require("mongoose");
const Register = require("./models/register"); // Import the Register model
const moment = require('moment'); // Import the moment library

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/shivam", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection to MongoDB successful`);
}).catch((e) => {
    console.log(`Error connecting to MongoDB: ${e.message}`);
});

// Serve static files from the "public" directory
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/register.html");
});

app.get("/thank-you", (req, res) => {
    res.send("Thank you for your submission!");
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, phone, date } = req.body;

        // Check if all fields are provided
        if (!name || !email || !phone || !date) {
            return res.status(400).send("All fields are required.");
        }

        // Parse the date into the expected format (ISOString)
        const isoDate = moment(date, 'DD-MM-YYYY').toISOString();

        // Create a new instance of the Register model
        const newRegister = new Register({
            name,
            email,
            phone,
            date: isoDate, // Assign the parsed date
        });

        // Save the new user to the database
        await newRegister.save();

        res.redirect("/thank-you");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
