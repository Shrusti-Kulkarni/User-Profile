import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = ({ users, onDelete }) => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/form');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="admin-actions">
        <button onClick={handleGoBack}>Home</button>
        <h2 className='admin-heading'>Admin Dashboard</h2>
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.login.uuid}>
              <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
              <td>{user.dob.age}</td>
              <td>{user.description}</td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => navigate(`/form/${user.login.uuid}`)}>Edit</button>
                  <button onClick={() => onDelete(user.login.uuid)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
