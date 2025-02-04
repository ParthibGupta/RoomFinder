import { useEffect, useState } from 'react';
import RoomCard from '../components/RoomCard';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/post')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <RoomCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
