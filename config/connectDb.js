const mongoose = require("mongoose");

const { db_url } = require("./env");

const connectDB = async () => {
    try {
        await mongoose.connect(db_url ,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to Database!!!");

    } catch (err) {
        console.error(err.message);
        process.exit(1) ; // exit process with failure

    }
}

module.exports = connectDB;
