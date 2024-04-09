import React from 'react';

const Sidebar = ({ setActiveTab, activeTab }) => {

    return (
        <div className="bg-blue-100 h-[90vh] w-1/4 p-4 pr-0">
            <ul>
                <p className='uppercase text-blue-700 pt-5 pb-2 font-medium'>Dashboard</p>
                <li className={`cursor-pointer text-lg px-4 py-1.5 rounded-l-lg ${activeTab === 'My Profile Doc' ? "bg-blue-700 text-white" : "text-blue-7-00 "}`} onClick={() => setActiveTab('My Profile Doc')}>
                    My Profile Doc
                </li>
                <p className='uppercase text-blue-700 pt-5 pb-2 font-medium'>My Patients</p>
                <li className={`cursor-pointer text-lg px-4 py-1.5 rounded-l-lg ${activeTab === 'Patients' ? "bg-blue-700 text-white" : "text-blue-7-00 "}`} onClick={() => setActiveTab('Patients')}>
                    Patients
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
