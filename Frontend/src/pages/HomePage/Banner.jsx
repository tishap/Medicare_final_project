import React from 'react';
import banImg from '../../assets/homeBan1.png';

const Banner = () => {
    
    return (
        <div className="flex justify-between items-center bg-gray-50 px-20 py-10">
            <div className='w-1/2'>
                <h1 className="text-4xl font-bold text-blue-900">Medicare a Health Record System</h1>
                <p className="text-lg text-blue-900 font-medium mt-2 ">
                    Medicare is a secure blockchain based platform for storage of highly sensitive and critical data related to patients that is shared among multiple facilities and agencies for affective diagnosis and Treatment</p>
                <button onClick={() => {
                  window.location.href = "/register";
                }} className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4">Sign Up</button>
            </div>
            <div className='w-1/2'>
                <img src={banImg} alt="Medicare" className="mx-auto w-3/5" />
            </div>
        </div>
    );
};

export default Banner;
