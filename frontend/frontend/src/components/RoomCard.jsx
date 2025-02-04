import { Box, Image, Text, Stack } from '@chakra-ui/react';

const RoomCard = ({ room }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
      <Image src={room.photos[0]} alt={room.heading} objectFit="cover" />

      <Stack p={4} spacing={3}>
        <Text fontSize="xl" fontWeight="bold">{room.heading}</Text>
        <Text>Rent: ${room.rent[0]} - ${room.rent[1]}</Text>
      </Stack>
    </Box>
  );
};

export default RoomCard;
