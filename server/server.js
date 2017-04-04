const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const url = 'mongodb://otravujuma:otravujuma@ds145380.mlab.com:45380/bookmarks';

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
