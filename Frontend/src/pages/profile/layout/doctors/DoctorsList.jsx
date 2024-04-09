import React, { useState ,useEffect} from 'react';
import toast from 'react-hot-toast';
import { useAccount, useReadContract ,useWriteContract} from "wagmi";
// import { useHistory } from 'react-router-dom';
import contract_ABI from "../../../../contractABI";

const DoctorsList = ({doctorData}) => {
    const [data, setData] = useState(doctorData || []);
    const { data: hash, isPending, writeContractAsync } = useWriteContract();
    const { address, isConnected } = useAccount();

    const whitelistCheck=((id)=>{
        
        const { data: isWhitelisted } = useReadContract({
            address: import.meta.env.VITE_CONTRACT_ADDRESS,
            abi: contract_ABI,
            chainId: 11155111,
            functionName: "isWhitelisted",
            args: [id,address],
          });
        return isWhitelisted
    })

    const accessRevert=(async(id,isWhitelist)=>{
        try {
            // const { data: isWhitelist } = useReadContract({
            //     address: "0xA367Ba9b5d17461B77176ffe14DA6e89fAA415b9",
            //     abi: contract_ABI,
            //     chainId: 11155111,
            //     functionName: "isWhitelisted",
            //     args: [id,address],
            //   });// Wait for the result of whitelistCheck
    
            if (isWhitelist) {
                await writeContractAsync({
                    address: import.meta.env.VITE_CONTRACT_ADDRESS,
                    abi: contract_ABI,
                    chainId: 11155111,
                    functionName: "revokeAccess",
                    args: [id, address],
                });
                toast.success("Access revoked");
            } else {
                await writeContractAsync({
                    address: import.meta.env.VITE_CONTRACT_ADDRESS,
                    abi: contract_ABI,
                    chainId: 11155111,
                    functionName: "whitelistUser",
                    args: [id, address],
                });
                toast.success("Access granted");
            }
        } catch (error) {
            console.error('Error:', error);
        }
        
    })
    const fetchDoctorsData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/doctor`);
            if (!response.ok) {
                throw new Error('Failed to fetch doctors data');
            }
            const { users } = await response.json();
            setData(users);
        } catch (error) {
            console.error('Error fetching doctors data:', error);
            toast.error('Failed to fetch doctors data');
        }
    };

    const handleAdd = id => {
        toast.success('Doctor Added Successfully' + id);
        // Add your logic to handle adding doctor here
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speciality</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Add Doctor</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, index) => {
                            const isWhitelisted = whitelistCheck(item._id);
                            return(
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.specialization}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => accessRevert(item._id,isWhitelisted)}>{isWhitelisted ? 'Revoke Access' : 'Add'}</button>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </>
    );
};



export default DoctorsList