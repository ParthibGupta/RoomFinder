import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/post/${postId}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error('Error fetching post:', error));
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">{post.heading}</h2>
      <img src={post.photos[0]} alt={post.heading} className="w-full h-64 object-cover my-4" />
      <p>{post.description}</p>
      <p>Rent: ${post.rent[0]} - ${post.rent[1]}</p>
      <p>Location: {post.location[0]}, {post.location[1]}</p>
    </div>
  );
};

export default PostDetails;
