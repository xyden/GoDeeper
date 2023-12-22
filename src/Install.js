// Install.js

import React, { useEffect }  from 'react';
import { Box, Container, Divider, Flex, Image, VStack, Text, useColorMode } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import useOS from './useOS';

const InstallAndroid = () => {
    return (
      <div>
        <Text fontSize='xl' as='b' marginY="4" display="inline-block">Installation Instructions for Android</Text>
        <ol>
          <li>Tap the menu icon (three dots) in the upper right corner of the screen.</li>
          <li>Tap <strong>Add to Home Screen</strong>.</li>
          <li>Tap <strong>Add</strong>.</li>
        </ol>
        <p>The app icon will now appear on your home screen like any other app.</p>
      </div>
    );
  };

  const InstallIOS = () => {
    return (
      <div>
        <Text fontSize='xl' as='b' marginY="4" display="block" textAlign="center">Install me</Text>
        <ol>
          <li>Tap the <strong>Share</strong> button at the bottom of the Safari window.</li>
          <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
          <li>Tap <strong>Add</strong>.</li>
        </ol>
        <Text marginY="4" display="block" >The app icon will now appear on your home screen like any other app.</Text>
      </div>
    );
  };

const Install = () => {
  const os = useOS();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (os === 'unknown') {
      navigate('/form'); // Adjust the path as needed
    }
  }, [os, navigate]);

  return (
    <Flex height="100vh" width="100vw" align="center" justify="center">
    <Box boxShadow= {colorMode === 'light' ? 'md' : 'dark-lg'} m="10" p="8" borderRadius={12}>
      <VStack justify="center" w="100%" mb="24px">
        <Image 
          src='logo512.png' alt='Go Deeper Logo' 
          w={[128, 200, 200]}
          borderRadius="50%"
          boxShadow= {colorMode === 'light' ? 'md' : 'dark-lg'}
        />
        <Text fontSize='xl' as='b'>Go Deeper</Text>
        <Text fontSize='xs' mt="-2">Find and track your feelings</Text>
      </VStack>
      <Divider mt="24px" />
      <Container maxW="container.sm" >
        {os === 'Android' && <InstallAndroid />}
        {os === 'iOS' && <InstallIOS />}
      </Container>
    </Box>
    </Flex>
  );
};

export default Install;
