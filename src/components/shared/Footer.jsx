import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-bold">Job Portal</h2>
                    <p className="text-sm">Connecting you to your dream job.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <a href="/about" className="hover:underline">About Us</a>
                    <a href="/services" className="hover:underline">Services</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-4 pt-4 text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
