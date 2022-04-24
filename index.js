const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const port = process.env.PORT || 5000;
const app = express();


//? Middle Were
app.use(cors());
app.use(express.json());


//? Database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qruro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//? Server Stablish
const server = async () => {
    try {
        await client.connect();
        const database = client.db('ema-john').collection('product');

        // get all products
        app.get('/product', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {};
            const cursor = database.find(query)
            let result;
            if (page || size) {
                result = await cursor.skip(page * size).limit(size).toArray();
            } else {
                result = await cursor.toArray();
            }

            res.send(result);
        })

        // count all Product
        app.get('/productCount', async (req, res) => {
            const count = await database.estimatedDocumentCount();
            res.send({ count });
        })

        // post products by id to get
        app.post('/productsById', async (req, res) => {
            const keys = req.body;
            const ids = keys.map(id => ObjectId(id));
            const query = {_id: {$in: ids}};
            const cursor = database.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })
    }

    finally {
        //// client.close();
    }
}

server().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is running');
})

app.listen(port, () => {
    console.log('server is running at', port);
})