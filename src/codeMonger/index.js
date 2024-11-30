import express from 'express';
import bodyParser from 'body-parser';

// If you still need these Node.js modules
import fs from 'fs';
import path from 'path';

// Babel utilities
import { parse as babelParser } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

// Initialize Express app
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint
app.post('/modify-element', (req, res) => {
  const { target, payload } = req.body;

  console.log('Target:', target, 'Payload:', payload);
  res.send({ message: 'Data received and processed.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
