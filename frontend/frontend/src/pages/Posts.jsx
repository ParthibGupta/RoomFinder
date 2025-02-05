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
  useToast
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
  const toast = useToast();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/post")
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data)
          setPosts(response.data);

        } else {
          toast({
            title: "No rooms available.",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        toast({
          title: "Error fetching posts.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  const handleSubmit = async () => {
    console.log("Here in Posts.jsx code");
    onClose();
  };

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Available Rooms
      </Heading>
      <Button onClick={onOpen} mb={4}>
        Got a room to rent out? Make your Listing
      </Button>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <RoomCard key={post.id} room={post} />
          ))
        ) : (
          <p>No rooms available</p>
        )}
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
