import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={"dev-uitmdheavdlf0gle.au.auth0.com"}
      clientId={"9VKL6AZBFo0RRkIE5mJEhKyS7ec9gE72"}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ChakraProvider >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>
);
