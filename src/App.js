import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Button,
  FormControl,
  FormLabel,
  Text,
  Input,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name || !email || !job) {
      return window.alert('missing field');
    }

    const res = await fetch(
      'https://sheet.best/api/sheets/ffc31ea5-d2e4-4859-984e-b7b8e7a1239b',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          job,
        }),
      }
    );

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert('Invalid');
    } else {
      window.alert('added');
      window.location.reload(false);
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <Box m="auto" maxW="450px">
        <ColorModeSwitcher />
        <Text m={15} textAlign="center">
          Fill UP THE FORM
        </Text>
        <form method="POST">
          <FormControl>
            <FormLabel htmlFor="text">Name</FormLabel>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              id="name"
              type="text"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
              type="email"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="job">Job</FormLabel>
            <Input
              value={job}
              onChange={e => setJob(e.target.value)}
              id="job"
              type="text"
            />
          </FormControl>

          <Button mt={3} onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default App;
