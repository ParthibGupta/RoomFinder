import { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from '../components/Profile'
const Me = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/user/get', {
      headers: { Authorization: `Bearer YOUR_AUTH_TOKEN` }
    })
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user:', error));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <Profile/>
    </div>
  );
};

export default Me;
