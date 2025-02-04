import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import Me from './pages/Me';
import AuthenticatedRoute from './routes/AuthenticatedRoute'

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<PostDetails />} />
            <Route path="/me" element={<AuthenticatedRoute><Me /></AuthenticatedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
