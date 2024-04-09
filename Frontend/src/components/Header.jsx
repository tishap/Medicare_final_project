// Header.js
import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaRegUserCircle } from "react-icons/fa";
import { useAccount, useDisconnect ,useReadContract} from "wagmi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import contract_ABI from "../contractABI";


function Header() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { exist, setExists } = useState();
  const { disconnect } = useDisconnect();
  const { data: ispatientregistered } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: contract_ABI,
    chainId: 11155111,
    functionName: "registeredPatients",
    args: [address],
  });
  // useEffect(() => {
  //   const checkUserExists = async () => {
  //     if (isConnected && address) {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:3000/api/user/${address}`
  //         );
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();

  //         if (data != null) {
  //           navigate(`/profile/${address}`);
  //         } else {
  //           console.log("User does not exist, consider registration.");
  //         }
  //       } catch (error) {
  //         console.error("Error checking user existence:", error);
  //       }
  //     } else if (!isConnected && location.pathname.startsWith("/profile")) {
  //       // If the wallet is disconnected, navigate to the home page.
  //       navigate("/");
  //     }
  //   };
  //   checkUserExists();
  // }, [isConnected, address, navigate]);

  const formatAddress = (address) =>
    address ? `${address.slice(0, 4)}...${address.slice(-3)}` : "";
  const logout = () => {
    disconnect();
    setDropdownOpen(false); // Close dropdown on logout
    window.location.href = "/";
  };
  // Function to handle profile navigation
  const handleProfileClick = () => {
    setDropdownOpen(false); // Close the dropdown
    if(ispatientregistered){
      window.location.href = `/profile/${address}`; // Navigate to profile page
    }
    else{
      window.location.href = `/docProfile`; // Navigate to profile page
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <header className="bg-blue-900 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold hover:cursor-pointer	" onClick={()=>{window.location.href="/"}}>MediCare</h1>
        <nav>
          <ul className="flex space-x-6">
            
          </ul>
        </nav>
        <ul className="flex space-x-4">
          
          
          {!isConnected ? (
            <>
              <button
                onClick={() => {
                  window.location.href = "/register";
                }}
                className="bg-blue-500 rounded-lg py-1.5 px-3 font-medium text-lg text-white"
              >
                Register
              </button>
              <button
                onClick={() => {
                  window.location.href = "/Login";
                }}
                className="bg-blue-500 rounded-lg py-1.5 px-3 font-medium text-lg text-white"
              >
                Login
              </button>
            </>
          ) : (
            <div className="relative inline-block">
              <button
                onClick={toggleDropdown}
                className="py-2 px-4 bg-blue-500 text-white rounded transition duration-300 hover:scale-105 flex items-center w-full"
              >
                {formatAddress(address)} <span className="ml-2">▼</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 bg-white rounded shadow-xl z-10 w-full">
                  <a
                    onClick={handleProfileClick}
                    className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Profile
                  </a>
                  <a
                    onClick={logout}
                    className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Log Out
                  </a>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
