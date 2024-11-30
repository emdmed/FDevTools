import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests only from localhost
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies if needed
};


// If you still need these Node.js modules
import fs from 'fs';
import path from 'path';

// Babel utilities
import { parse as babelParser } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

// Initialize Express app
const app = express();
const port = 1216;

app.use(cors(corsOptions));
app.use(express.json());

// Endpoint
app.post('/modify-element', (req, res) => {

  console.log("body", req.body)
  const { parsedTarget, payload } = req.body;

  console.log('Target:', parsedTarget, 'Payload:', payload);

  res.send({ message: 'Data received and processed.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
