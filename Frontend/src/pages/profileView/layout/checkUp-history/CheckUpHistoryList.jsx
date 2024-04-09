import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CheckUpHistoryForm from './CheckUpHistoryForm';

const CheckUpHistoryList = ({ userFormData, setUserFormData, userId }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(userFormData.checkupHistory || []);
    

    const handleOpen = () => setOpen(!open);

   

    const addRecord = async (formData) => {
        if (!formData.reason || !formData.date || !formData.outcome) {
            toast.error('Please fill mandatory fields!');
            return;
        }
        const updatedData = [...userFormData.checkupHistory, { ...formData, id: Date.now() }]; // Simplified ID assignment
        await updateCheckupData(updatedData);
    };

    const updateCheckupData = async (updatedData) => {
        const updatedUserFormData = {
            ...userFormData,
            checkupHistory: updatedData
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/user/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserFormData)
            });

            if (!response.ok) throw new Error('Failed to update user data');

            setUserFormData(updatedUserFormData); // Update local state
            setOpen(false); // Close the form
            toast.success('Checkup history updated successfully!');
        } catch (error) {
            console.error("Error updating user data:", error);
            toast.error('Failed to update checkup history.');
        }
    };

    // Formatting dates for display
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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                                
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.date)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.outcome}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Add button to add new allergy */}
                
            </div >}
            {open && <CheckUpHistoryForm addRecord={addRecord} handleClose={handleOpen} id={data.length + 1} />}
        </>
    );
};



export default CheckUpHistoryList