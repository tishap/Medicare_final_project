import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract, useDisconnect
} from "wagmi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import contract_ABI from "../../../contractABI.js";
import toast from "react-hot-toast";

const Register = () => {
  const [activeTab, setActiveTab] = useState("patient");
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();

  // Separate states for patient and doctor form data for clarity
  const [patientFormData, setPatientFormData] = useState({
    name: "",
    email: "",
    age: "",
    phoneNumber: "",
  });
  const [doctorFormData, setDoctorFormData] = useState({
    name: "",
    specialization: "",
    licenseNumber: "",
    email: "",
    contactNumber: "",
    contactAddress: "",
    yearsOfExperience: "",
  });
  const { address: walletAddress } = useAccount(); // Retrieve the connected wallet address
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const handlePatientChange = (e) => {
    setPatientFormData({ ...patientFormData, [e.target.name]: e.target.value });
  };

  const handleDoctorChange = (e) => {
    setDoctorFormData({ ...doctorFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload, apiUrl;

    if (activeTab === "patient") {
      // Smart contract related variables

      // Patient registration payload
      payload = { ...patientFormData, _id: walletAddress };
      apiUrl = `${import.meta.env.VITE_SERVER_API}/api/user`; // Adjust API endpoint as necessary

      // Connect to the Rinkeby testnet using Infura provider
      try {
        // Push patient data to the database
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
    
          throw new Error("Failed to push patient data to the database");
        }

        // Display toast notification for successful database write
        toast.success("Patient Data Saved in Database");

        await writeContractAsync({
          address: import.meta.env.VITE_CONTRACT_ADDRESS,
          abi: contract_ABI,
          chainId: 11155111,
          functionName: "registerPatient",
        });

        // Show toast notification for successful registration
        toast.success("Patient Registration Successful");
        toast.success('Registration successfull, Go to login page')
        disconnect();
        setPatientFormData({
          name: "",
          email: "",
          age: "",
          phoneNumber: "",
        })

      } catch (error) {
        // Show toast notification for error
        toast.error(error.message);
        console.error(error);
      }
    } 
      else {
        // Doctor registration payload
        payload = {
            ...doctorFormData,
            _id: walletAddress,
            contactDetails: {
                phone: doctorFormData.contactNumber,
                address: doctorFormData.contactAddress,
            },
        };
        apiUrl = `${import.meta.env.VITE_SERVER_API}/api/doctor`; // Adjust API endpoint as necessary

    try {
        // Push data to the database
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to push data to the database');
        }

        // Display toast notification for successful database write
        toast.success("Data Saved in Database");

        
        await writeContractAsync({
            address: import.meta.env.VITE_CONTRACT_ADDRESS,
            abi: contract_ABI,
            chainId: 11155111,
            functionName: "registerDoctor",
        });

        // Show toast notification for successful registration
        toast.success(`Doctor Registration Successful`);

        // Check if confirmed and navigate to profile
        toast.success('Registration successfull, Go to login page')
        disconnect();
        setDoctorFormData({
          name: "",
          specialization: "",
          licenseNumber: "",
          email: "",
          contactNumber: "",
          contactAddress: "",
          yearsOfExperience: "",
        })

    } catch (error) {
        // Show toast notification for error
        toast.error(error.message);
        console.error(error);
    }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Registration UI elements */}
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <header>
          <h2 className="text-xl font-semibold text-center text-gray-700">
            Register as
          </h2>
        </header>
        <div className="flex items-center justify-center space-x-2">
          <button
            className={`px-4 py-2 ${
              activeTab === "patient"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            } rounded`}
            onClick={() => setActiveTab("patient")}
          >
            Patient
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "doctor"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            } rounded`}
            onClick={() => setActiveTab("doctor")}
          >
            Doctor
          </button>
        </div>
        {activeTab === "patient" ? (
          // Patient Form
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Patient form inputs handling */}
            {/* Similar to the doctor form inputs but use handlePatientChange */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="text"
              name="name"
              value={patientFormData.name}
              onChange={handlePatientChange}
              placeholder="Full Name"
              required
            />
            {/* Email */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="email"
              name="email"
              value={patientFormData.email}
              onChange={handlePatientChange}
              placeholder="Email"
              required
            />

            {/* Age */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="number"
              name="age"
              value={patientFormData.age}
              onChange={handlePatientChange}
              placeholder="Age"
              required
            />

            {/* Phone Number */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="text"
              name="phoneNumber"
              value={patientFormData.phoneNumber}
              onChange={handlePatientChange}
              placeholder="Phone Number"
              required
            />

            {/* Connect Wallet Button */}
            <div className="flex justify-center items-center my-4">
              <ConnectButton />
            </div>

            {/* Submit Button */}
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              type="submit"
            >
              {isPending ? "Confirming..." : "Register"}
            </button>
          </form>
        ) : (
          // Doctor Form
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Doctor form inputs handling */}
            {/* Include inputs for doctor-specific fields using handleDoctorChange */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="text"
              name="name"
              value={doctorFormData.name}
              onChange={handleDoctorChange}
              placeholder="Full Name"
              required
            />
            {/* Specialization */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="text"
              name="specialization"
              value={doctorFormData.specialization}
              onChange={handleDoctorChange}
              placeholder="Specialization"
              required
            />

            {/* License Number */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="text"
              name="licenseNumber"
              value={doctorFormData.licenseNumber}
              onChange={handleDoctorChange}
              placeholder="License No."
              required
            />

            {/* Email */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="email"
              name="email"
              value={doctorFormData.email}
              onChange={handleDoctorChange}
              placeholder="Email"
              required
            />

            {/* Contact Number */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="text"
              name="contactNumber"
              value={doctorFormData.contactNumber}
              onChange={handleDoctorChange}
              placeholder="Contact Number"
              required
            />

            {/* Contact Address */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="text"
              name="contactAddress"
              value={doctorFormData.contactAddress}
              onChange={handleDoctorChange}
              placeholder="Contact Address"
            />

            {/* Years of Experience */}
            <input
              className="w-full px-4 py-2 border rounded"
              type="number"
              name="yearsOfExperience"
              value={doctorFormData.yearsOfExperience}
              onChange={handleDoctorChange}
              placeholder="Years of Experience"
              required
            />

            {/* Connect Wallet Button */}
            <div className="flex justify-center items-center my-4">
              <ConnectButton />
            </div>

            {/* Submit Button */}
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              type="submit"
            >
              Register
            </button>
          </form>
        )}
        <div className="w-full justify-center items-center flex">
          <a href="/login" className="text-blue-500 w-auto ">
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
