import React from 'react';

const EditDocProfile = ({ formData, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className='w-fit flex flex-col items-start mt-5 border bg-gray-50 shadow-sm px-4 py-2'>
            <h2 className="text-xl mb-4">Edit Profile</h2>
            <label htmlFor="name" className="mb-2">Name</label>
            <input type="text" name="name" className='p-2 border' value={formData.name} onChange={handleChange} placeholder="Name" />
            <label htmlFor="email" className="mb-2 mt-4">Email</label>
            <input type="email" name="email" className='p-2 border' value={formData.email} onChange={handleChange} placeholder="Email" />
            <label htmlFor="licenseNo" className="mb-2 mt-4">License No.</label>
            <input type="text" name="licenseNo" className='p-2 border' value={formData.licenseNo} onChange={handleChange} placeholder="License No" />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4 rounded">Save</button>
        </form>
    );
};

export default EditDocProfile;
