import React, { useState } from 'react';

const CheckUpHistoryForm = ({ addRecord, handleClose}) => {

    const [formData, setFormData] = useState({
        Reason: '', date: '', outcome: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addRecord(formData);
        handleClose();
    };

    return (
        <form onSubmit={handleSubmit} className='w-fit flex flex-col items-start mt-5 border bg-gray-50 shadow-sm px-4 py-2'>
            <h2 className="text-xl mb-4">Add Allergy</h2>
            <label htmlFor="reason" className="mb-2">Reason</label>
            <input type="text" name="reason" value={formData.reason} onChange={handleInputChange} placeholder="Enter Reason" className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            <label htmlFor="date" className="mb-2">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} placeholder="Enter Date" className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            <label htmlFor="outcome" className="mb-2">Outcome</label>
            <input type="text" name="outcome" value={formData.outcome} onChange={handleInputChange} placeholder="Enter Outcome" className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            <div className='flex gap-2'>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
                <button type='button' onClick={handleClose} className="bg-green-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
        </form>
    );
};

export default CheckUpHistoryForm