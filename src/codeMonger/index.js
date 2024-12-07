import express from 'express';
import { findReactElementInCode, findReactFiles } from "./helpers/babelFinder.js"
import fs from 'fs';
import path from 'path';
const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

const projectRoot = process.cwd();
const reactSrcPath = path.join(projectRoot);

const app = express();
const port = 1216;

app.use(cors(corsOptions));
app.use(express.json());

// Endpoint
app.post('/modify-element', (req, res) => {

  const { parsedOriginalTarget, parsedNewTarget } = req.body;

  const projectDir = path.join(__dirname, reactSrcPath); 
  const reactFiles = findReactFiles(reactSrcPath);
  
  for (const file of reactFiles) {
    const code = fs.readFileSync(file, 'utf-8');
    const matchingCode = findReactElementInCode(code, parsedOriginalTarget, parsedNewTarget, file);

    if (matchingCode) {
      return res.json({
        message: `Found matching React code`,
        code: matchingCode,
      });
    }
  }

  res.json({ message: 'No matching code found.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
