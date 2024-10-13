import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { users } from '../../data/users';

const Address = () => {
  const { id } = useParams();
  const user = users.find(u => u.login.uuid === id);
  const [mapError, setMapError] = useState(null);

  if (!user) {
    return <div>User not found</div>;
  }

  const latitude = parseFloat(user.location.coordinates.latitude);
  const longitude = parseFloat(user.location.coordinates.longitude);

  // Validate coordinates
  if (isNaN(latitude) || isNaN(longitude)) {
    return <div>Invalid coordinates for the user location.</div>;
  }

  // Handle potential map loading errors
  const handleMapError = (error) => {
    console.error("Map loading error: ", error);
    setMapError("Failed to load map. Please try again later.");
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {mapError ? (
        <div>{mapError}</div>
      ) : (
        <MapContainer 
          center={[latitude, longitude]} 
          zoom={12} 
          style={{ width: '100%', height: '100%' }} 
          whenCreated={(map) => {
            map.on('error', handleMapError);
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]}>
            <Popup>{user.name.first} {user.name.last}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Address;
