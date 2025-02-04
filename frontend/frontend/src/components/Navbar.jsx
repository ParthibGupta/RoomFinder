import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4} color="white">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Text fontSize="xl" fontWeight="bold">RoomFinder</Text>
        <Flex gap={4}>
          <Link href="/posts" fontWeight="medium">Posts</Link>
          <Link href="/me" fontWeight="medium">My Profile</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
