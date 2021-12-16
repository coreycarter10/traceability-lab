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

app.post('/api/student', (req, res) => {
    let {name} = req.body;
    name = name.trim();

    students.push(name);

    rollbar.critical('Student added successfully', {author: 'Corey', type: 'manual'});

    res.status(200).send(students);
})

app.use(rollbar.errorHandler());

const port = process.env.PORT || 4545

app.listen(port, () => {console.log(`Server is now on port ${port}`)})
//added comment