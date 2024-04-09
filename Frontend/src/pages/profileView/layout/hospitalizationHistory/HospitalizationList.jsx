import React, { useState } from 'react';
import toast from 'react-hot-toast';
import HospitalizationForm from './HospitalizationForm';

const HospitalizationList = ({ userFormData, setUserFormData, userId }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(userFormData.hospitalizationHistory || []);
    

    const handleOpen = () => setOpen(!open);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const addRecord = async (formData) => {
        if (!formData.admittedDate || !formData.dischargedDate || !formData.problem) {
            toast.error('Please fill mandatory fields!');
            return;
        }
        const updatedData = [...userFormData.hospitalizationHistory, { ...formData, id: Date.now() }]; // Simplified ID assignment
        await updateHospitalizationData(updatedData);
    };

    const updateHospitalizationData = async (updatedData) => {
        const updatedUserFormData = {
            ...userFormData,
            hospitalizationHistory: updatedData
        };
        setUserFormData(updatedUserFormData); // Update local state

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/user/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserFormData)
            });

            if (!response.ok) throw new Error('Failed to update user data');

            setOpen(false); // Close the form
            toast.success('Hospitalization history updated successfully!');
        } catch (error) {
            console.error("Error updating user data:", error);
            toast.error('Failed to update hospitalization history.');
        }
    };
    return (
        <>
            {!open && <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admitted Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discharge Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                             
                            
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.admittedDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.dischargedDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.problem}</td>
                                    
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Add button to add new medical history record */}
               
            </div>}
            {
                open && <HospitalizationForm addRecord={addRecord} handleClose={handleOpen} id={data.length + 1} />
            }
        </>
    );
};


export default HospitalizationList