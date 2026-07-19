import React from 'react';

const Logo = ({ className = "h-10 w-10" }) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="40" height="40" rx="8" fill="#0F766E" />
        <path d="M12 21.5C12 15.98 15.98 12 21.5 12H27" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M27 28H18.5C14.91 28 12 25.09 12 21.5" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M22 20H31" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />
        <circle cx="31" cy="20" r="3" fill="#A7F3D0" />
    </svg>
);

export default Logo;
