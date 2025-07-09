import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUser(data[0]));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="card">
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
};

export default Profile;
