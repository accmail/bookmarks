const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const url = require('./dbUrl');

const app = express();


app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoClient.connect(url, (err, database) => {
    if (err) {
        return console.log(err);
    }
    require('./routes/route')(app, database);

    app.listen(3001, () => {
        console.log('Listening on port 3001');
    });

})
