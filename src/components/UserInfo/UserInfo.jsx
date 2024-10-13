// UserInfo.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { users as initialUsers } from '../../data/users'; // Adjust the import based on your data structure
import './UserInfo.css';

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchedUser = initialUsers.find(u => u.login.uuid === id);
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-info">
      <div className="user-info-picture">
        <img 
          src={user.picture.large || 'fallback-image-url.jpg'} 
          alt={`${user.name.first} ${user.name.last}`} 
        />
      </div>
      <div className="user-info-details">
        <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Address:</strong> {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}</p>
        <p><strong>Description:</strong> {user.description || 'No description available.'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Date of Birth:</strong> {new Date(user.dob.date).toLocaleDateString()}</p>
        <p><strong>Cell:</strong> {user.cell}</p>
      </div>
    </div>
  );
};

export default UserInfo;
