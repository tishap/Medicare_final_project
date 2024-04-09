import React, { useState } from 'react';



const PatientList = ({patientList,patient}) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(patientList || []);
    const handleOpen = () => {
        setOpen(!open)
    }
   const navigateProfileView=(id)=>{
     window.location.href=`profileView/${id}`
    
   }
    return (
        <>
            {!open && <div className="overflow-x-auto">
                
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treated ?</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigateProfileView(item._id)}>View</button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">Yes | No</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

        </>
    );
};

export default PatientList;
