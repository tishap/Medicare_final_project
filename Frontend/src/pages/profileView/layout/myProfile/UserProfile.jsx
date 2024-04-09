import React, { useState, useEffect } from 'react';
import EditProfileForm from './EditProfileForm';
import { useParams } from 'react-router-dom'; // Import useParams

const UserProfile = ({userFormData,setUserFormData,userId}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {!open && (
                <div className='flex flex-col items-start w-full bg-blue-500 rounded-lg p-4'>
                    <p className='text-white font-medium text-lg'>Name: {userFormData.name}</p>
                    <p className='text-white font-medium text-lg'>Email: {userFormData.email}</p>
                    <p className='text-white font-medium text-lg'>Phone: {userFormData.phoneNumber}</p>
                    <p className='text-white font-medium text-lg'>Age: {userFormData.age}</p>
                    
                </div>
            )}
            
        </>
    );
};

export default UserProfile;
