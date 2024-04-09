import React, { useState } from 'react';
import AllergyForm from './AllergyForm';
import toast from 'react-hot-toast';

const AllergiesList = ({userFormData,setUserFormData,userId}) => {
    const [open, setOpen] = useState(false)
    const [allergiesData, setAllergiesData] = useState(userFormData.allergies || []);

    // useEffect(() => {
    //     setAllergiesData(userFormData.allergies || []);
    // }, [userFormData.allergies]);

    const handleOpen = () => setOpen(!open);

    const addAllergy = async (newAllergyData) => {
        if (!newAllergyData.name || !newAllergyData.type || !newAllergyData.description) {
            toast.error('Please fill all the fields');
            return;
        }
        const updatedAllergies = [...allergiesData, { ...newAllergyData, id: Date.now() }]; // Example ID generation
        await updateUserFormData(updatedAllergies);
    };

    const updateUserFormData = async (updatedAllergies) => {
        const updatedUserFormData = { ...userFormData, allergies: updatedAllergies };
        // Update the backend
        setUserFormData(updatedUserFormData);
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/user/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserFormData),
            });
            if (!response.ok) throw new Error('Failed to update user data');
            setUserFormData(updatedUserFormData);
            toast.success('Allergy data updated successfully');
        } catch (error) {
            console.error("Error updating user data:", error);
            toast.error('Failed to update allergy data');
        }
    };
    return (
        <>
            {!open && <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allergiesData.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Add button to add new allergy */}
                <button onClick={handleOpen} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Add New Allergy</button>
            </div>}
            {open && <AllergyForm addAllergy={addAllergy} handleClose={handleOpen} id={allergiesData.length + 1} />}
        </>
    );
};

export default AllergiesList;
