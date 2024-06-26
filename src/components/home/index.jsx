import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export const API_BASE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function GetVenues() {
    const [venues, setVenues] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 100;

    const fetchVenues = useCallback(async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}?sort=${sortField}&sortOrder=${sortOrder}&_page=${currentPage}&_limit=${pageSize}`
            );
            const data = await response.json();
            setVenues(data);
        } catch (error) {
            console.error(error);
        }
    }, [sortField, sortOrder, currentPage]);

    useEffect(() => {
        fetchVenues();
    }, [fetchVenues]);

    const filteredVenues = venues.filter((venue) =>
        venue.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleSortChange = (e) => {
        const { value } = e.target;
        const [field, order] = value.split("-");
        setSortField(field);
        setSortOrder(order);
        setCurrentPage(1); // Reset currentPage when changing the sort field
    };

    const handlePageChange = (increment) => {
        setCurrentPage(currentPage + increment);
        if (currentPage === 1 && increment === -1) {
            setCurrentPage(1);
        }
    };

    // Fallback image URL
    const fallbackImage = "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg";

    return (
        <div>
            <div className="searchContainer">
                <input
                    className="searchInputStyle"
                    type="text"
                    placeholder="Search venues"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <select value={`${sortField}-${sortOrder}`} onChange={handleSortChange}>
                    <option value="name-desc">Sort by Name (Descending)</option>
                    <option value="name-asc">Sort by Name (Ascending)</option>
                </select>
            </div>
            <div className="venuesContainer">
                {filteredVenues.map((venue) => (
                    <Link key={venue.id} to={`/venue/${venue.id}`} className="venueLink">
                        <div className="venue">
                            <h2>{venue.name}</h2>
                            {/* Use onError to handle broken or missing images */}
                            <img
                                src={venue.media}
                                onError={(e) => { e.target.src = fallbackImage }}
                                alt={venue.name}
                                className="venueImage"
                            />
                            <p className="venueDescription">{venue.description}</p>
                            <p className="venueInfo">
                                Price: <span className="venuePrice">{venue.price}$</span>
                            </p>
                            <p className="venueInfo">
                                Rating: <span className="venueRating">{venue.rating}</span>
                            </p>
                            <p className="venueInfo">
                                Max Guests:{" "}
                                <span className="venueMaxGuests">{venue.maxGuests}</span>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            {/* Pagination */}
            <div className="pagination">
                <button
                    className="btn btn-primary mt-4"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(-1)}
                >
                    Previous Page
                </button>
                <button
                    className="btn btn-primary mt-4"
                    onClick={() => handlePageChange(1)}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default GetVenues;
