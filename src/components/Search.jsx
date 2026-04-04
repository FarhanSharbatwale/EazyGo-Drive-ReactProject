import React, { useState, useEffect } from 'react'
import '../css/Search.css'
import VehicleCard from './VehicleCard'

const Search = () => {

    const [vehicles, setVehicles] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [typeFilter, setTypeFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    // ✅ LOAD VEHICLES
    useEffect(() => {
        const updateVehicles = () => {
            const data = JSON.parse(localStorage.getItem("vehicles")) || [];
            setVehicles(data);
        };

        updateVehicles();

        window.addEventListener("storage", updateVehicles);
        return () => window.removeEventListener("storage", updateVehicles);
    }, []);

    // ✅ APPLY FILTERS (MAIN LOGIC)
    function applyFilters() {

        const results = vehicles.filter((v) => {

            const matchesSearch =
                search === "" || v.name.toLowerCase().includes(search.toLowerCase());

            const matchesType =
                typeFilter === "" || v.type === typeFilter;

            const matchesLocation =
                locationFilter === "" || v.location === locationFilter;

            return matchesSearch && matchesType && matchesLocation;
        });

        setFilteredVehicles(results);
    }

    // ✅ RUN FILTER WHENEVER ANYTHING CHANGES
    useEffect(() => {
        applyFilters();
    }, [vehicles, search, typeFilter, locationFilter]);

    return (
        <div>

            <h1 id='search-head'>Search Your Desired Vehicle</h1>

            {/* SEARCH BAR */}
            <div className='search-bar'>
                <form onSubmit={(e) => e.preventDefault()}>

                    <input
                        type="text"
                        className='search-vehicle'
                        placeholder='Search Vehicle'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button type='button'>
                        Search
                    </button>

                </form>
            </div>

            {/* FILTERS */}
            <div className="filters">

                <div className="filter-box">
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="">Type</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Bike">Bike</option>
                        <option value="Bus">Bus</option>
                    </select>
                </div>

                <div className="filter-box">
                    <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                        <option value="">Location</option>
                        <option value="Sangli">Sangli</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Satara">Satara</option>
                    </select>
                </div>

                {/* 🔥 CLEAR FILTER BUTTON */}
                <button
                id="searchClear"
                    className="clear-btn"
                    onClick={() => {
                        setSearch("");
                        setTypeFilter("");
                        setLocationFilter("");
                    }}
                >
                    Clear
                </button>

            </div>

            {/* RESULTS */}
            <div className="search-result">
                {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((v) => (
                        <VehicleCard key={v.id} data={v} />
                    ))
                ) : (
                    <p>No results matches!</p>
                )}
            </div>

        </div>
    )
}

export default Search