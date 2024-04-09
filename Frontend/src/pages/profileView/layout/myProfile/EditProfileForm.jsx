import React from 'react';

const EditProfileForm = ({ formData, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className='w-fit flex flex-col items-start mt-5 border bg-gray-50 shadow-sm px-4 py-2'>
            <h2 className="text-xl mb-4">Edit Profile</h2>
            <label htmlFor="name" className="mb-2">Name</label>
            <input type="text" name="name" className='p-2 border' value={formData.name} onChange={handleChange} placeholder="Name" />
            <label htmlFor="email" className="mb-2 mt-4">Email</label>
            <input type="email" name="email" className='p-2 border' value={formData.email} onChange={handleChange} placeholder="Email" />
            <label htmlFor="age" className="mb-2 mt-4">Age</label>
            <input type="number" name="age" className='p-2 border' value={formData.age} onChange={handleChange} placeholder="Age" />
            <label htmlFor="phoneNumber" className="mb-2 mt-4">Phone Number</label>
            <input type="text" name="phoneNumber" className='p-2 border' value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4 rounded">Save</button>
        </form>
    );
};

export default EditProfileForm;
