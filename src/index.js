const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);

const PORT = process.env.PORT || 3000;

// routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// run
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
