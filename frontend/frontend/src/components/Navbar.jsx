import { Box, Flex, Text, Link, Spacer } from '@chakra-ui/react';
import AuthButtons from './AuthButtons';

const Navbar = () => {
  return (
    <Box bg="gray.500" p={4} color="white">
      <Flex align="center" maxW="1200px" mx="auto">
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold">RoomFinder</Text>
        </Link>
        <Spacer />
        <Flex gap={4}>
          <Link href="/posts">Posts</Link>
          <Link href="/me">My Profile</Link>
          <AuthButtons />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
