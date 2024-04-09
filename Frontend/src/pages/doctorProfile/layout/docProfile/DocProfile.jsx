import React, { useState } from 'react';
import EditDocProfile from './EditDocProfile';
import { useAccount, useDisconnect } from "wagmi";


const DocProfile = ({doctorFormData,setDoctorFormData}) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {!open && <div className='flex flex-col items-start w-full bg-blue-500 rounded-lg p-4'>
                <p className='text-white font-medium text-lg'>Name: {doctorFormData.name}</p>
                <p className='text-white font-medium text-lg'>Email: {doctorFormData.email}</p>
                <p className='text-white font-medium text-lg'>License No: {doctorFormData.licenseNumber}</p>
                <p className='text-white font-medium text-lg'>Email: {doctorFormData.email}</p>
                <p className='text-white font-medium text-lg'>Experience: {doctorFormData.yearsOfExperience} years</p>
                {/* <button onClick={() => { setOpen(!open) }} className="font-medium self-end bg-white text-blue-500 px-4 py-2 mt-4 rounded">Edit Profile</button> */}
            </div>}
            
        </>
    );
};

export default DocProfile;
