import { Box, Image, Text, Stack, IconButton, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdLocationOn } from 'react-icons/md'; // Importing location icon from react-icons

const RoomCard = ({ room }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Handle cycling through the images
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? room.photos.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === room.photos.length - 1 ? 0 : prevIndex + 1));
  };

  // Navigate to RoomDetails page with the postid
  const handleClick = () => {
    navigate(`/RoomDetails/${room.id}`);
  };

  return (
    <Box 
      borderWidth="1px" 

      overflow="hidden" 
      boxShadow="md" 
      display="flex" 
      width="100%" 
      maxWidth="400px"
      cursor="pointer"
    >
      {/* Slideshow on the left */}
      <Box width="40%" position="relative">
        <Image
          src={room.photos[currentImageIndex]}
          alt={room.heading}
          objectFit="cover"
          width="100%"
          height="100%"
          referrerPolicy="no-referrer"
        />
        {room.photos.length > 1 && (
          <>
            {/* Left Arrow */}
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
            />
            {/* Right Arrow */}
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
            />
          </>
        )}
      </Box>

      {/* Room details on the right */}
      <Box width="60%" p={4}>
        <Stack spacing={2}>
          <Text onClick={handleClick} fontSize="xl" fontWeight="bold">{room.heading}</Text>
          <Text fontSize="sm">${room.rent[0]} per week</Text>
          <HStack fontSize="sm" spacing={1}>
            {/* Location Icon and Suburb */}
            <MdLocationOn size={16} color="gray" />
            <Text>{room.suburb}</Text>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default RoomCard;
