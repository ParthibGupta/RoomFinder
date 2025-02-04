import React from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Button colorScheme="red" onClick={() => logout({ returnTo: window.location.origin })}>
      Logout
    </Button>
  ) : (
    <Button onClick={() => loginWithRedirect()}>
      Login
    </Button>
  );
};

export default AuthButtons;
