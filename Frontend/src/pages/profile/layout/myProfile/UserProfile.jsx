import React, { useState, useEffect } from 'react';
import EditProfileForm from './EditProfileForm';
import { useParams } from 'react-router-dom'; // Import useParams

const UserProfile = ({userFormData,setUserFormData,userId}) => {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Construct the PUT request URL
        const apiUrl = `${import.meta.env.VITE_SERVER_API}/api/user/${userId}`; // Adjust as necessary
        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userFormData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedUser = await response.json();
            console.log('Profile updated successfully:', updatedUser);
            setOpen(false)
            // Additional logic to handle successful update (e.g., navigate back to the profile page)
        } catch (error) {
            console.error("Failed to update user data:", error);
        }
    };

    const handleInputChange = e => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    };

    return (
        <>
            {!open && (
                <div className='flex flex-col items-start w-full bg-blue-500 rounded-lg p-4'>
                    <p className='text-white font-medium text-lg'>Name: {userFormData.name}</p>
                    <p className='text-white font-medium text-lg'>Email: {userFormData.email}</p>
                    <p className='text-white font-medium text-lg'>Phone: {userFormData.phoneNumber}</p>
                    <p className='text-white font-medium text-lg'>Age: {userFormData.age}</p>
                    <button onClick={() => setOpen(!open) } className="font-medium self-end bg-white text-blue-500 px-4 py-2 mt-4 rounded">Edit Profile</button>
                </div>
            )}
            {open && (
                <EditProfileForm formData={userFormData} handleChange={handleInputChange} handleSubmit={handleSubmit} />
            )}
        </>
    );
};

export default UserProfile;
