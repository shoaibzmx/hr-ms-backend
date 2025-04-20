const mongoose = require("mongoose");

const uri = `mongodb+srv://abc:abc@cluster0.b2wbabl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" MongoDB connected successfully!");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;

