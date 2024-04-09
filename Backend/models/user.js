import mongoose, { Schema } from "mongoose";


// Allergy Subdocument Schema
const allergySchema = new Schema({
  name: String,
  type: String,
  description: String
}, { _id: false });

// Insurance Subdocument Schema
const insuranceSchema = new Schema({
  issuer: String,
  policyNumber: String,
  startDate: Date,
  expiryDate: Date,
  company: String
}, { _id: false });

// Medical History Subdocument Schema
const medicalHistorySchema = new Schema({
  date: Date,
  problem: String
}, { _id: false });

// Hospitalization History Subdocument Schema
const hospitalizationHistorySchema = new Schema({
  problem: String,
  admittedDate: Date,
  dischargedDate: Date
}, { _id: false });

// Checkup History Subdocument Schema
const checkupHistorySchema = new Schema({
  date: Date,
  reason: String,
  outcome: String
}, { _id: false });

// Emergency Contact Schema
const emergencyContactSchema = new Schema({
  name: String,
  relation: String,
  phone: String
}, { _id: false });


// User Schema
const userSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  age: Number,
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  allergies: [allergySchema],
  insuranceDetails: [insuranceSchema],
  medicalHistory: [medicalHistorySchema],
  hospitalizationHistory: [hospitalizationHistorySchema],
  checkupHistory: [checkupHistorySchema],
  emergencyContact: emergencyContactSchema,
  // Additional fields
  address: String,
}, { _id: false });




const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;