import React from 'react';

import { Link } from "react-router-dom";


export function HandleTheLogout({ isNav = false }) {
    const handleTheLogout = () => {
        console.log("Logout button clicked"); // Debugging log
        const token = localStorage.getItem("token");
        console.log("Current accessToken:", token); // Debugging log

        if (token) {
            localStorage.removeItem("token");
            console.log("Token removed from localStorage"); // Debugging log
        } else {
            console.log("No token found in localStorage"); // Debugging log
        }

        // Redirect to the sign-in page
        window.location.href = "/signIn";
    };

    return (
        <Link variant="primary" onClick={handleTheLogout} aria-label="Logout">
            Logout
        </Link>

    );
}

export default HandleTheLogout;

