import React from 'react';

const Content = ({ activeTab, children }) => {
    return (
        <div className="bg-white h-[90vh] w-3/4 p-4">
            <h1 className="text-2xl mb-4">{activeTab}</h1>
            {children}
        </div>
    );
};

export default Content;
