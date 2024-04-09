import React, { useState } from 'react';

    const AllergyForm = ({ addAllergy, handleClose }) => {
        const [formData, setFormData] = useState({
            name: '',
            type: '',
            description: '', // Changed from 'medication' to 'description' to match schema
        });
    
        const handleInputChange = e => {
            const { name, value } = e.target;
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        };
    
        const handleSubmit = e => {
            e.preventDefault();
            addAllergy(formData);
            handleClose();
        };

    return (
        <form onSubmit={handleSubmit} className='w-fit flex flex-col items-start mt-5 border bg-gray-50 shadow-sm px-4 py-2'>
            <h2 className="text-xl mb-4">Add Allergy</h2>
            <label htmlFor="allergy" className="mb-2">Allergy</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter Allergy Name" className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />
            <label htmlFor="type" className="mb-2">Type</label>
            <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="Enter Allergy Name" className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />
            <label htmlFor="description" className="mb-2">Description</label>
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter Allergy Name" className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />
            <div className='flex gap-2'>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
                <button type='button' onClick={handleClose} className="bg-green-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
        </form>
    );
};

export default AllergyForm;
