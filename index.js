const express = require('express');
const cors = require('cors');
require('dotenv').config();


const port = process.env.PORT || 5000;
const app = express();

//? Middle Were
app.use(cors());
app.use(express.json());

//? Database connection

//? Servers

const server = async () => {
    try {

    }

    finally {

    }
}

server().catch(console.log);

app.get('/', (req, res) => {
    res.send('server is running');
})

app.listen(port, () => {
    console.log('server is running at', port);
})