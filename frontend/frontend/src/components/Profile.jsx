import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Text, Avatar } from '@chakra-ui/react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Box p={8}>
        <Avatar name={user.name} src={user.picture} size="xl" />
        <Text fontSize="2xl" mt={4}>{user.nickname}</Text>
        <Text fontSize="lg">{user.email}</Text>
      </Box>
    )
  );
};

export default Profile;
