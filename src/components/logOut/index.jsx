import React from 'react';
import { Button, Container } from "react-bootstrap";

export function HandleTheLogout() {
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
        <Container>
            <Button variant="primary" onClick={handleTheLogout} aria-label="Logout">
                Logout
            </Button>
        </Container>
    );
}

export default HandleTheLogout;

