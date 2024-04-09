import React, { useState } from 'react';
import MedicalHistoryForm from './MedicalHistoryForm';
import toast from 'react-hot-toast';

const MedicalHistoryList = ({ userFormData, setUserFormData, userId }) => {
    const [open, setOpen] = useState(false);
    const [historyData, setHistoryData] = useState(userFormData.medicalHistory || [])
    // Handle the addition of a new medical history record
    const addRecord = async (newRecord) => {
        if (!newRecord.date || !newRecord.problem) {
            toast.error('Please fill all mandatory fields!');
            return;
        }
        // Assuming IDs are managed by the backend; if not, generate a temporary ID as shown
        const updatedMedicalHistory = [...userFormData.medicalHistory, { ...newRecord, id: Date.now() }];
        await updateUserData({ ...userFormData, medicalHistory: updatedMedicalHistory });
    };
    const handleOpen = () => setOpen(!open);

    // Update user data including medical history
    const updateUserData = async (updatedUserFormData) => {
        setUserFormData(updatedUserFormData); // Update the state with the new user data

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/user/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserFormData)
            });

            if (!response.ok) throw new Error('Failed to update user data');

            setOpen(false); // Close the form
            toast.success('Medical history updated successfully!');
        } catch (error) {
            console.error("Error updating user data:", error);
            toast.error('Failed to update medical history.');
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };
    return (
        <>
            {!open && <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                               
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {historyData.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.date)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.problem}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Add button to add new medical history record */}
            </div>}
            {
                open && <MedicalHistoryForm addRecord={addRecord} handleClose={handleOpen} id={historyData.length + 1} />
            }
        </>
    );
};

export default MedicalHistoryList;
