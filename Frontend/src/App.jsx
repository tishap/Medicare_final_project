// App.js
import React from "react";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/HomePage/Home";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider ,http} from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Profile from "./pages/profile/Profile";
import ProfileView from "./pages/profileView/Profile";
import { Toaster } from "react-hot-toast";
import DoctorProfile from "./pages/doctorProfile/DoctorProfile";


const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "f262254d5c6ec00a8abfcc2e6c98b52a",
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_SEPOLIA_RPC)
  },
});

const queryClient = new QueryClient();
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#2d86fa'
          })}>
          <Router>
            <div>
              <Header />
              <div className="min-h-[90vh]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* <Route path="/about" element={About} /> */}
                  {/* <Route path="/contact" element={Contact} /> */}
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/docProfile" element={<DoctorProfile/>} />
                  <Route path="/profileView/:userId" element={<ProfileView />}/>
                  <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
              </div>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
