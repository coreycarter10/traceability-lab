const express = require('express');
const path = require('path');

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '6a46d169d32b4ee8bad5e7b8341c1cb3',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('HTML file served successfully.')
})

app.get('/', (req, res) => {
    try {
        doesNotExist()
    } catch (error) {
        console.error(error)
    }
    res.status(200).send()
})

app.use(rollbar.errorHandler());

const port = process.env.PORT || 4545

app.listen(port, () => {console.log(`Server is now on port ${port}`)})
//added comment