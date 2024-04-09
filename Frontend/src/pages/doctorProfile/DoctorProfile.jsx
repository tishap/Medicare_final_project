import React, { useState, useEffect } from "react";
import Sidebar from "./layout/SideBar";
import Content from "./layout/Content";
import DocProfile from "./layout/docProfile/DocProfile";
import PatientList from "./layout/patients/PatientList";
import { useAccount, useDisconnect, useReadContract } from "wagmi";
import contract_ABI from "../../contractABI";

const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState("My Profile Doc");
  const { address, isConnected } = useAccount();
  const [doctorFormData, setDoctorFormData] = useState({});
  const [patients, setPatients] = useState([]);
  const [patientList, setPatientList] = useState([]);

  const { data: patient } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: contract_ABI,
    chainId: 11155111,
    functionName: "getUsersWhitelistedForDoctor",
    args: [address],
  });
  
  const fetchDataForItem = async (itemId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/user/${itemId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      return userData.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchPatientData = async () => {
    const updatedPatients = [];
    for (const itemId of patient) {
      const userData = await fetchDataForItem(itemId);
      if (userData) {
        updatedPatients.push(userData);
      }
    }
    setPatientList(updatedPatients);
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      // Construct the URL with the user ID
      const apiUrl = `${import.meta.env.VITE_SERVER_API}/api/doctor/${address}`; // Adjust as necessary
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data", data.doctor);
        setDoctorFormData(data.doctor); // Assuming the API returns the user object directly
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    const fetchPatients=async()=>{
        if (patient) {
            console.log(patients);
            setPatients(patients)
          }
        
        await fetchPatientData()
    }
    fetchPatients()
    fetchUserData();
  }, [patient]);

  return (
    <div className="flex">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <Content activeTab={activeTab}>
        {activeTab == "My Profile Doc" && (
          <DocProfile
            doctorFormData={doctorFormData}
            setDoctorFormData={setDoctorFormData}
          />
        )}
        {activeTab == "Patients" && <PatientList patients={patients} patientList={patientList} />}
      </Content>
    </div>
  );
};

export default DoctorProfile;
