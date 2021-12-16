const express = require('express');
const path = require('path');

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '29e6ac8e72234a3ca4c9ae942316115a',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('HTML file served successfully.')
})

const port = process.env.PORT || 4545

app.listen(port, () => {console.log(`Server is now on port ${port}`)})