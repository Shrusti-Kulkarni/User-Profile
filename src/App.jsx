import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { users as initialUsers } from './data/users';
import Home from './components/Home/Home';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Address from './components/Address/Address';
import UserForm from './components/UserForm/UserForm';
import UserInfo from './components/UserInfo/UserInfo';

function App() {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.login.uuid !== id));
  };

  const handleSave = (user) => {
    if (users.some(u => u.login.uuid === user.login.uuid)) { 
      setUsers(prevUsers => prevUsers.map(u => (u.login.uuid === user.login.uuid ? user : u)));
    } else { 
      setUsers(prevUsers => [...prevUsers, user]);
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home users={users} />} />
          <Route path="/admin" element={<AdminDashboard users={users} onDelete={handleDelete} />} />
          <Route path="/address/:id" element={<Address />} /> 
          <Route path="/form" element={<UserForm onSave={handleSave} />} />
          <Route path="/form/:id" element={<UserForm onSave={handleSave} />} />
          <Route path="/info/:id" element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
