const metascraper = require('metascraper');

var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/bookmarks', (req, res) => {

        db.collection('bookmark').find().sort( { DateCreated: -1 } ).toArray((err, items) => {
            //console.log(items);
            res.send(items);
        });
    });

    app.post('/bookmarks', (req, res) => {
        //console.log('post');
        metascraper
            .scrapeUrl(req.body.url)
            .then((metadata) => {
                //console.log(metadata);
                var bookmark = {
                    Url: req.body.url,
                    Title: metadata.title,
                    Image: metadata.image,
                    Description: metadata.description,
                    DateCreated: new Date().getTime()
                };
                db.collection('bookmark').insert(bookmark, (err, result) => {
                    if (err) {
                        res.send({ 'error': 'An error has occurred' });
                    } else {
                        res.send(result.ops[0]);
                    }
                });
            });

        //console.log(req.body);
        //res.send('Hello')
    });
    /*
    app.get('/bookmark/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('bookmark').findOne(details, (err, bookmark) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(bookmark);
            }
        });
    });
    */
    app.put('/bookmark/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('bookmark').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });

    app.delete('/bookmark/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('bookmark').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send({ 'success': 'Note ' + id + ' deleted!'});
            }
        });
    });
};