const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: {
      type: String,
      required: [true, "Doctor name is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    contactDetails: {
      phone: {
        type: String,
        required: [true, "Contact phone number is required"],
      },
      address: String, // Optional: Include if you want to store the doctor's practice address
    },
    yearsOfExperience: {
      type: Number,
      required: [true, "Years of experience is required"],
    },
  },
  { _id: false }
);

const Doctor = mongoose.models.Doctor ||mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
