import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Usercard.css';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/info/${user.login.uuid}`);
  };

  const handleSummaryClick = (e) => {
    e.stopPropagation(); 
    navigate(`/address/${user.login.uuid}`);
  };

  return (
    <div className="user-card" onClick={handleClick}>
      <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
      <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
      <p>{user.description}</p>
      <p>Location: {user.location.city}, {user.location.country}</p>
      <p>Age: {user.dob.age}</p>
      <button style={{backgroundColor: '#8D493A'}} onClick={handleSummaryClick}>Summary</button>
    </div>
  );
};

export default UserCard;
