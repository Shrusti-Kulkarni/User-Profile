import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ searchQuery, setSearchQuery, ageFilter, setAgeFilter }) => {
  return (
    <nav className="navbar">
      <h2>User Profiles</h2>
      <div className="navbar-controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="">Filter by Age</option>
          <option value="below30">Below 30</option>
          <option value="above30">30 and Above</option>
        </select>
        <Link to="/admin">
          <button>Admin Dashboard</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
