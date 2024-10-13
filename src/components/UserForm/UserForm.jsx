import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { users as initialUsers}  from '../../data/users.js';

import './UserForm.css'

const UserForm = ({ onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    login: { uuid: '' },
    name: { title: '', first: '', last: '' },
    description: '',
    dob: { age: '' },
    location: { 
      street: { number: '', name: '' }, 
      city: '', 
      state: '', 
      country: '', 
      postcode: '', 
      coordinates: { latitude: '', longitude: '' } 
    },
    picture: { large: '' },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const user = initialUsers.find(u => u.login.uuid === id);
      if (user) {
        setUserData(user);
      }
    } else {
      const newUserId = 'sdsrdb-ejfbeukf-bfckaufb' + initialUsers.length;
      setUserData(prev => ({ ...prev, login: { uuid: newUserId } }));
    }
  }, [id]);

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "dob.age":
        const age = Number(value);
        if (age < 1 || age > 100) {
          newErrors.age = "Age must be between 1 and 100.";
        } else {
          delete newErrors.age;
        }
        break;

      case "location.street.number":
        if (!/^\d+$/.test(value)) {
          newErrors.streetNumber = "Street number must be numbers only.";
        } else {
          delete newErrors.streetNumber;
        }
        break;

      case "location.postcode":
        if (!/^\d+$/.test(value)) {
          newErrors.postcode = "Postcode must be numbers only.";
        } else {
          delete newErrors.postcode;
        }
        break;

      case "location.coordinates.latitude":
      case "location.coordinates.longitude":
        const floatValue = parseFloat(value);
        if (isNaN(floatValue) || floatValue < -180 || floatValue > 180) {
          newErrors[name] = "Coordinates must be a valid float between -180 and 180.";
        } else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const keys = name.split('.');
      setUserData(prevData => {
        const updatedData = { ...prevData };
        updatedData[keys[0]][keys[1]] = value;
        return updatedData;
      });
    } else {
      setUserData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      return; 
    }
    onSave(userData); 
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="name.title" 
          value={userData.name.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="first">First Name</label>
        <input
          type="text"
          className="form-control"
          id="first"
          name="name.first" 
          value={userData.name.first}
          onChange={handleChange}
          placeholder="First Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="last">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="last"
          name="name.last"
          value={userData.name.last}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={userData.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          className="form-control"
          id="age"
          name="dob.age" 
          value={userData.dob.age}
          onChange={handleChange}
          placeholder="Age"
        />
         {errors.age && <div style={{color:'red'}} className="error-message">{errors.age}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          className="form-control"
          id="imageUrl"
          name="picture.large"
          value={userData.picture.large}
          onChange={handleChange}
          placeholder="Enter Image URL"
        />
      </div>
      <div className="form-group">
        <label htmlFor="streetNumber">Street Number</label>
        <input
          type="text"
          className="form-control"
          id="streetNumber"
          name="location.street.number" 
          value={userData.location.street.number}
          onChange={handleChange}
          placeholder="Street Number"
        />
        {errors.streetNumber && <div style={{color:'red'}} className="error-message">{errors.streetNumber}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="streetName">Street Name</label>
        <input
          type="text"
          className="form-control"
          id="streetName"
          name="location.street.name" 
          value={userData.location.street.name}
          onChange={handleChange}
          placeholder="Street Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="location.city"
          value={userData.location.city}
          onChange={handleChange}
          placeholder="City"
        />
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input
          type="text"
          className="form-control"
          id="state"
          name="location.state"
          value={userData.location.state}
          onChange={handleChange}
          placeholder="State"
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="location.country"
          value={userData.location.country}
          onChange={handleChange}
          placeholder="Country"
        />
      </div>
      <div className="form-group">
        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          className="form-control"
          id="postcode"
          name="location.postcode" 
          value={userData.location.postcode}
          onChange={handleChange}
          placeholder="Postcode"
        />
        {errors.postcode && <div style={{color:'red'}} className="error-message">{errors.postcode}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          className="form-control"
          id="latitude"
          name="location.coordinates.latitude"
          value={userData.location.coordinates.latitude}
          onChange={handleChange}
          placeholder="Latitude"
        /> 
        {errors['location.coordinates.latitude'] && (
          <div style={{color:'red'}} className="error-message">{errors['location.coordinates.latitude']}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          className="form-control"
          id="longitude"
          name="location.coordinates.longitude"
          value={userData.location.coordinates.longitude}
          onChange={handleChange}
          placeholder="Longitude"
        /> 
        {errors['location.coordinates.longitude'] && (
          <div style={{color:'red'}} className="error-message">{errors['location.coordinates.longitude']}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default UserForm;
