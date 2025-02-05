import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Posts from './pages/Posts';
import RoomDetails from './pages/RoomDetails';
import Me from './pages/Me';
import AuthenticatedRoute from './routes/AuthenticatedRoute'

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Rooms" element={<AuthenticatedRoute><Posts /></AuthenticatedRoute>} />
            <Route path="/RoomDetails/:postId" element={<RoomDetails />} />
            <Route path="/me" element={<AuthenticatedRoute><Me /></AuthenticatedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
