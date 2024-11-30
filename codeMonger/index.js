const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;
const babelGenerator = require('@babel/generator').default;

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/modify-element', (req, res) => {
  const { target, payload} = req.body;

  console.log("Target",target, "paylaod")
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
