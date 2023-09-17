const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shivamTiwari", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connection to MongoDB successful");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
