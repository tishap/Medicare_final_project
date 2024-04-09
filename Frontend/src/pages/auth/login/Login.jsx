import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract } from "wagmi";
// import { useHistory } from 'react-router-dom';
import contract_ABI from "../../../contractABI";
import toast from "react-hot-toast";


const Login = () => {
  const [activeTab, setActiveTab] = useState("patient");

  const { address, isConnected } = useAccount();
  
  const { data: ispatientregistered } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: contract_ABI,
    chainId: 11155111,
    functionName: "registeredPatients",
    args: [address],
  });
  const { data: isdoctorregistered } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: contract_ABI,
    chainId: 11155111,
    functionName: "registeredDoctors",
    args: [address],
  });
  const checkLogin=(async()=>{
    
      if(activeTab=="patient"){
        if (ispatientregistered){
            window.location.href = `/profile/${address}`;
        }
        else{
            toast.error("Patient not registered")
        }
      }
      else if(activeTab=="doctor"){
        if (isdoctorregistered){
            window.location.href = `/docProfile`;
        }
        else{
            toast.error("Patient not registered")
        }
      }
  })
//   // const history = useHistory();
//   useEffect(() => {
    
//       console.log(ispatientregistered)
//     if (isConnected) {
      
//     }
//   }, [isConnected]);

  const handleLogin = (role) => {
    // Handle login logic here
    // console.log(`Logged in as ${role}`);
    // history.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in as
          </h2>
          <div className="mt-2 flex justify-center">
            <button
              className={`px-4 py-2 ${
                activeTab === "patient"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } border border-blue-500 rounded`}
              onClick={() => setActiveTab("patient")}
            >
              Patient
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "doctor"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } border border-blue-500 rounded ml-2`}
              onClick={() => setActiveTab("doctor")}
            >
              Doctor
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection:"column"
          }}
        >
          <ConnectButton />
          <button
              className={`px-4 py-2 bg-blue-500 text-white border border-blue-500 rounded mt-3.5	`}
              onClick={checkLogin}
            >
              Log In
            </button>

        </div>
        
          
        <div className="w-full justify-center items-center flex">
          <a href="/register" className="text-blue-500 w-auto ">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
