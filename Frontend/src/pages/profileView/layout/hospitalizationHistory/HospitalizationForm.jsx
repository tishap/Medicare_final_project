import React, { useState } from 'react';

const HospitalizationForm = ({ addRecord, handleClose }) => {
    const [formData, setFormData] = useState({
        admittedDate: '', dischargedDate: '', problem: ''
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
            <h2 className="text-xl mb-4">Add Hospitalization History</h2>
            <label htmlFor="admittedDate" className="mb-2">Admitted Date</label>
            <input type="date" name='admittedDate' value={formData.admittedDate} onChange={handleInputChange} className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            <label htmlFor="dischargeDate" className="mb-2">Discharge Date</label>
            <input type="date" name='dischargedDate' value={formData.dischargedDate} onChange={handleInputChange} className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            <label htmlFor="problem" className="mb-2">Problem</label>
            <input type="text" name='problem' value={formData.problem} onChange={handleInputChange} className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            <div className='flex gap-2'>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
                <button type='button' onClick={handleClose} className="bg-green-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
        </form>
    );
};


export default HospitalizationForm