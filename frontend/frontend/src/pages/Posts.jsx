import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import RoomCard from "../components/RoomCard";
import RoomForm from "../components/RoomForm";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    photos: [],
    rent: 0,
    address: "",
    latitude: -33.8688, // Default latitude (Sydney)
    longitude: 151.2093, // Default longitude (Sydney)
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/post")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleSubmit = async () => {
    try {
      const postPayload = {
        heading: formData.heading,
        description: formData.description,
        photos: formData.photos,
        rent: [formData.rent],
        location: [parseFloat(formData.latitude), parseFloat(formData.longitude)],
        address: formData.address,
      };

      await axios.post("http://localhost:3000/api/post", postPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data } = await axios.get("http://localhost:3000/api/post");
      setPosts(data);

      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Available Rooms
      </Heading>
      <Button onClick={onOpen} mb={4}>
        Got a room to rent out? Make your Listing
      </Button>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {posts.map((post) => (
          <RoomCard key={post.id} post={post} />
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RoomForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Posts;
