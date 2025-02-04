import { useEffect, useState } from 'react';
import axios from 'axios';

const Me = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/get', {
      headers: { Authorization: `Bearer YOUR_AUTH_TOKEN` }
    })
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user:', error));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">Your Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Me;
