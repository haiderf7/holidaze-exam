import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DeleteVenue from "../delete";
import UpdateVenue from "../update";
import CalenderBooking from "../calenderBooking";

const API_SPECIFIC_URL = "https://api.noroff.dev/api/v1/holidaze/venues";
const fallbackImage = "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg";

function GetVenueSpecific() {
    const { id } = useParams();
    const [venue, setVenue] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const url = API_SPECIFIC_URL;

    useEffect(() => {
        async function getData() {
            try {
                setIsError(false);
                setIsLoading(true);
                const response = await fetch(`${url}/${id}`);
                const json = await response.json();
                setVenue(json);
                setIsLoading(false);
                console.log("Venue data loaded:", json);
            } catch (error) {
                setIsLoading(false);
                setIsError(true);
                console.error("Error loading venue data:", error);
            }
        }

        getData();
    }, [id, url]);

    if (isLoading) {
        return <div>Loading venue details...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="specificContainer">
            <h2>{venue.name}</h2>
            {/* Use onError to handle broken or missing images */}
            <img
                src={venue.media}
                onError={(e) => { e.target.src = fallbackImage }}
                alt={venue.name || 'Venue image'}
                className="specificVenueImage"
            />
            <p className="venueDescription">{venue.description}</p>
            <p className="venueInfo">
                Price: <span className="venuePrice">{venue.price}$</span>
            </p>
            <p className="venueInfo">
                Rating: <span className="venueRating">{venue.rating}</span>
            </p>
            <p className="venueInfo">
                Max Guests: <span className="venueMaxGuests">{venue.maxGuests}</span>
            </p>
            <DeleteVenue id={venue.id} />
            <UpdateVenue />
            <CalenderBooking venueId={venue.id} />
        </div>
    );
}

export default GetVenueSpecific;
