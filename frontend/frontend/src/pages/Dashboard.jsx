import { Button, Box, Text, Flex, Heading, VStack, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const buttonText = useBreakpointValue({ base: 'Get Started', md: 'Browse Rooms' });

  const handleBrowseRooms = () => {
    navigate('/rooms'); // Modify to the route you want to navigate to
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue('blue.100', 'gray.900')}
      color={useColorModeValue('black', 'white')}
      px={{ base: '4', sm: '6' }}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        maxWidth="lg"
        p={6}
        boxShadow="lg"
        borderRadius="md"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Heading as="h2" size="2xl" mb={4}>
          Welcome to RoomFinder
        </Heading>
        <Text fontSize="lg" mb={6}>
          Find your perfect room with ease.
        </Text>

        <VStack spacing={6}>
          <Text fontSize="xl" color="gray.500">
            Browse our listings or create a new post today. Let's find your next home!
          </Text>
          <Button
            size="lg"
            onClick={handleBrowseRooms}
            px={10}
            borderRadius="md"
          >
            {buttonText}
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Dashboard;
