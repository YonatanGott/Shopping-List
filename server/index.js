const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').Server(app);
const port = 5000

// Express
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(express.json());

//MongoDB
const mongoose = require('mongoose');
// For Docker: replace 'localhost' with 'mongo:27017' to connect to mongoDB Image or 'host.docker.internal' to connect to local mongoDB

// Use These variables to change DB connection type
const mongoConnectDockerImage = "mongo:27017"
// const mongoConnectLocalDB = "localhost"
//const mongoConnectDockerLocalDB = "host.docker.internal"

mongoose.connect(`mongodb://${mongoConnectDockerImage}/shopping`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to mongoDB'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Routes
const itemsRoute = require('./routes/items')
app.use('/api/items', itemsRoute);

http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})