import React from 'react';

const Sidebar = ({ setActiveTab, activeTab }) => {
    const menuItems = [
        // { id: 1, title: 'My Profile' },
        { id: 2, title: 'Insurance' },
        { id: 3, title: 'Allergies' },
        { id: 4, title: 'Medical History' },
        { id: 5, title: 'Hospitalization History' },
        { id: 6, title: 'CheckUp History' },
        // { id: 7, title: 'Available Doctors' },
    ];

    return (
        <div className="bg-blue-100 h-[90vh] w-1/4 p-4 pr-0">
            <ul>
                <p className='uppercase text-blue-700 pt-5 pb-2 font-medium'>Dashboard</p>
                <li className={`cursor-pointer text-lg px-4 py-1.5 rounded-l-lg ${activeTab === 'My Profile' ? "bg-blue-700 text-white" : "text-blue-7-00 "}`} onClick={() => setActiveTab('My Profile')}>
                    User Profile
                </li>
                <p className='uppercase text-blue-700 pt-5 pb-2 font-medium'>Health Records</p>
                {menuItems.map(item => (
                    <li key={item.id} className={`cursor-pointer text-lg px-4 py-1.5 rounded-l-lg ${activeTab === item.title ? "bg-blue-700 text-white" : "text-blue-7-00 "}`} onClick={() => setActiveTab(item.title)}>
                        {item.title}
                    </li>
                ))}
                
            </ul>
        </div>
    );
};

export default Sidebar;
