import React from 'react';
import { Box, Flex, Text, Button, useColorModeValue, IconButton } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const linkColor = useColorModeValue('blue.500', 'blue.200');
  const bgColor = useColorModeValue('white', 'grey.700');



  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg={bgColor} color="black">
      <Flex align="center" mr={5}>
        <Text as="h1" size="lg" letterSpacing={'tighter'}>
          My App
        </Text>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={console.log("aoh")}>
        <Link to="/calendar">
        <IconButton
          icon={<CalendarIcon />}
          variant="outline"
          aria-label="Open Menu"
        />
        </Link>
      </Box>

      <Box display={{ base: 'none', md: 'flex' }} width={{ base: 'full', md: 'auto' }} alignItems="center" flexGrow={1}>
        {/* Other navigation links */}
      </Box>

      <Box display={{ base: 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
        <Link to="/calendar">
          <Button variant="outline" _hover={{ bg: 'blue.500', color: 'white' }} color={linkColor}>
            Calendar
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
