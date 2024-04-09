import React, { useState } from "react";

const InsuranceForm = ({ addInsurance, handleClose}) => {
    const [formData, setFormData] = useState({
        issuer: "",
        policyNumber: "",
        startDate: "", // Ensure format matches what your backend expects (e.g., "YYYY-MM-DD")
        expiryDate: "",
        company: "",
    });

    // Handle input change to update form data state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Invoke the addInsurance function passed as a prop with the form data
        addInsurance(formData);
        // Optionally, reset the form or close the form modal/dialog
        handleClose();
    };

  return (
    <form onSubmit={handleSubmit} className='w-fit flex flex-col items-start mt-5 border bg-gray-50 shadow-sm px-4 py-2'>
            <h2 className="text-xl mb-4">Add Insurance</h2>

            {/* Input for Company */}
            <label htmlFor="company" className="mb-2">Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Insurance Company" className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            {/* Input for Issuer */}
            <label htmlFor="issuer" className="mb-2">Issuer</label>
            <input type="text" name="issuer" value={formData.issuer} onChange={handleInputChange} placeholder="Issuer" className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            {/* Input for Policy Number */}
            <label htmlFor="policyNumber" className="mb-2">Policy Number</label>
            <input type="text" name="policyNumber" value={formData.policyNumber} onChange={handleInputChange} placeholder="Policy Number" className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            {/* Input for Start Date */}
            <label htmlFor="startDate" className="mb-2">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            {/* Input for Expiry Date */}
            <label htmlFor="expiryDate" className="mb-2">Expiry Date</label>
            <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="block w-full px-4 py-2 mb-2 border border-gray-300 rounded" />

            <div className='flex gap-2'>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
                <button type="button" onClick={handleClose} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
        </form>
  );
};

export default InsuranceForm;
