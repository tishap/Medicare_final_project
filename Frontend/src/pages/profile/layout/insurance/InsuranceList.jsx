
import React, { useState } from "react";
import InsuranceForm from "./InsuranceForm";
import toast from "react-hot-toast";

// Assume insuranceData and a method to update it (updateInsuranceData) are passed from the parent component
const InsuranceList = ({ insuranceData ,userFormData,setUserFormData,userId}) => {
  const [open, setOpen] = useState(false);


  const handleAddInsurance = async (newInsuranceData) => {
    // Append the new insurance data to the existing insurance details
    const updatedInsuranceDetails = [...userFormData.insuranceDetails, newInsuranceData];

    // Update userFormData with the new insurance list
    const updatedUserFormData = {
      ...userFormData,
      insuranceDetails: updatedInsuranceDetails
    };
setUserFormData(updatedUserFormData)
    // Push the updated userFormData to the API
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/user/${userId}`, {
        method: 'PUT', // Assuming the endpoint supports PUT for updates
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUserFormData)
      });

      if (!response.ok) throw new Error('Failed to update user data');

      const updatedData = await response.json();
      
      // Update local state with the updated user data from the response
      

      setOpen(false); // Optionally, hide the form after successful update
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };


  return (
    <>
      {!open && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table headers */}
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Policy Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Expiry Date
                  </th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {insuranceData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.policyNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      }).format(new Date(item.expiryDate))}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Add New Insurance
          </button>
        </div>
      )}
      {open && (
        <InsuranceForm
          addInsurance={handleAddInsurance}
          handleClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default InsuranceList;
