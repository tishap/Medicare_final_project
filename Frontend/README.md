# MediCare Frontend Setup

The MediCare frontend is developed with Vite.js and React, featuring pages for home, patients, and doctors, each with various subsections. It incorporates login functionality enhanced by blockchain capabilities for security. The site is live at [https://mediblock.vercel.app/](https://mediblock.vercel.app/).

## Setup Instructions

1. **Navigate to the Frontend Directory**:
```
cd Frontend
```

2. **Install Required Modules**:
```
npm install
```

3. **Configure Environment Variables**:
 - Rename `.env.example` to `.env`.
 - Fill in the necessary details:
   ```
   VITE_SERVER_API=<Backend_Address>
   VITE_SEPOLIA_RPC=<Blockchain_Node_Connection>
   VITE_CONTRACT_ADDRESS=<Smart_Contract_Address>
   ```
 Replace `<Backend_Address>`, `<Blockchain_Node_Connection>`, and `<Smart_Contract_Address>` with your actual backend address, Sepolia RPC URL from Infura, and smart contract address, respectively.

## Running the Frontend

With the setup complete, start the frontend application:
```
npm run dev
```
This will fire up the frontend, now accessible for development testing and review.
