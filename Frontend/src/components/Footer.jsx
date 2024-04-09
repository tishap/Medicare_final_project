// Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} MediCare. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
