import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Image,
  Text,
  Stack,
  Button,
  IconButton,
  Flex,
  Spinner,
  HStack
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MdLocationOn } from 'react-icons/md';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const RoomDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_ROOT_API_URL}/api/post/${postId}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error('Error fetching post:', error));
  }, [postId]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? post.photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === post.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!post) return <Spinner size="xl" />;

  return (
    <Box maxW="7xl" mx="auto" py={{ base: '4', md: '8' }} px={{ base: '4', sm: '6' }}>
      <Button 
        leftIcon={<ChevronLeftIcon />} 
        variant="outline" 
        mb="6" 
        onClick={handleGoBack}
      >
        Back
      </Button>

      <Flex direction={{ base: 'column', md: 'row' }} gap="6">
        {/* Slideshow */}
        <Box width={{ base: '100%', md: '60%' }} position="relative">
          <Image
            src={post.photos[currentImageIndex]}
            alt={post.heading}
            objectFit="cover"
            width="100%"
            height={{ base: '250px', md: '400px' }}
            borderRadius="md"
            boxShadow="xl"
            mb="4"
          />
          
          {post.photos.length > 1 && (
            <>
              <IconButton
                icon={<ChevronLeftIcon />}
                onClick={handlePrevImage}
                position="absolute"
                top="50%"
                left="10px"
                transform="translateY(-50%)"
                backgroundColor="rgba(0,0,0,0.4)"
                color="white"
                _hover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                zIndex={1}
              />
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={handleNextImage}
                position="absolute"
                top="50%"
                right="10px"
                transform="translateY(-50%)"
                backgroundColor="rgba(0,0,0,0.4)"
                color="white"
                _hover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                zIndex={1}
              />
            </>
          )}
        </Box>

        {/* Room Details */}
        <Box width={{ base: '100%', md: '40%' }} p="4">
          <Stack spacing={4}>
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">{post.heading}</Text>
            <Text fontSize="lg" color="gray.700">{post.description}</Text>
            <Text fontSize="lg" fontWeight="bold">${post.rent[0]} per week</Text>
            <HStack fontSize="sm" spacing={1}>
            {/* Location Icon and Address */}
              <MdLocationOn size={16} color="gray" />
              <Text fontSize="md" color="gray.600">{post.fulladdress}</Text>
            </HStack>
            
            <Text fontSize="md" color="gray.600">Owner: {post.owner_name}</Text>
          </Stack>

          {/* Contact Owner Button */}
          <Button 
            size="lg" 
            mt="6" 
            width="100%" 
          >
            Contact Owner - Coming soon
          </Button>
        </Box>
      </Flex>

      {/* Google Maps */}
      {isLoaded && post.location && (
        <Box mt="6" borderRadius="md" overflow="hidden" boxShadow="lg">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: post.location[0], lng: post.location[1] }}
            zoom={15}
          >
            <Marker position={{ lat: post.location[0], lng: post.location[1] }} />
          </GoogleMap>
        </Box>
      )}
    </Box>
  );
};

export default RoomDetails;
