import React, { useState,useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import Content from './layout/Content';
import UserProfile from './layout/myProfile/UserProfile';
import InsuranceList from './layout/insurance/InsuranceList';
import AllergiesList from './layout/allergy/AllergiesList';
import MedicalHistoryList from './layout/medical-history/MedicalHistoryList';
import HospitalizationList from './layout/hospitalizationHistory/HospitalizationList';
import CheckUpHistoryList from './layout/checkUp-history/CheckUpHistoryList';
import DoctorsList from './layout/doctors/DoctorsList';
import { useParams } from "react-router-dom";

const Profile = () => {
    const [activeTab, setActiveTab] = useState('My Profile');
    let { userId } = useParams();
    const [userFormData, setUserFormData] = useState({});
    const [doctorData, setDoctordata]=useState({})
    useEffect(() => {
        const fetchUserData = async () => {
            // Construct the URL with the user ID
            const apiUrl = `${import.meta.env.VITE_SERVER_API}/api/user/${userId}`; // Adjust as necessary
            const apiDocUrl = `${import.meta.env.VITE_SERVER_API}/api/doctor`;
            try {
                const response = await fetch(apiUrl);
                const docResponse = await fetch(apiDocUrl)
                const docData = await docResponse.json()
                const data =  await response.json();
               console.log("data",data.user.hospitalizationHistory)
               setDoctordata(docData.users)
               setUserFormData(data.user); // Assuming the API returns the user object directly
               
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    },[userId]);
    return (
        <div className="flex">
            <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
            <Content activeTab={activeTab}>
                {activeTab == 'My Profile' && (<UserProfile userFormData={userFormData} setUserFormData={setUserFormData} userId={userId} />)}
                {activeTab == 'Insurance' && (<InsuranceList insuranceData={userFormData.insuranceDetails} userFormData={userFormData} setUserFormData={setUserFormData} userId={userId}/>)}
                {activeTab == 'Allergies' && (<AllergiesList userFormData={userFormData} setUserFormData={setUserFormData} userId={userId}/>)}
                {activeTab == 'Medical History' && (<MedicalHistoryList userFormData={userFormData} setUserFormData={setUserFormData} userId={userId}/>)}
                {activeTab == 'Hospitalization History' && (<HospitalizationList userFormData={userFormData} setUserFormData={setUserFormData} userId={userId} />)}
                {activeTab == 'CheckUp History' && (<CheckUpHistoryList userFormData={userFormData} setUserFormData={setUserFormData} userId={userId}/>)}
                {activeTab == 'Doctors' && (<DoctorsList doctorData={doctorData} />)}
            </Content>
        </div>
    );
};

export default Profile;
