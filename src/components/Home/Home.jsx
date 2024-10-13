import React, { useState } from 'react';
import './Home.css';
import UserCard from '../UserCard/UserCard';
import Navbar from '../Navbar/Navbar';

const Home = ({ users, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  const filteredUsers = users.filter(user => {
    const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`.toLowerCase();
    const location = `${user.location.city}, ${user.location.country}`.toLowerCase();
    const description = user.description.toLowerCase();

    const matchesQuery = fullName.includes(searchQuery.toLowerCase()) ||
                         location.includes(searchQuery.toLowerCase()) ||
                         description.includes(searchQuery.toLowerCase());

    let matchesAge = true;

    if (ageFilter === 'below30') {
      matchesAge = user.dob.age < 30;
    } else if (ageFilter === 'above30') {
      matchesAge = user.dob.age >= 30;
    }

    return matchesQuery && matchesAge;
  });

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
      />
      
      <div className='user-list'>
        {filteredUsers.map((user) => (
          <UserCard key={user.login.uuid} user={user} onDelete={onDelete} />
        ))} 
      </div>
    </div>
  );
};

export default Home;
