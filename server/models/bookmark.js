var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Bookmark', new Schema({
    Url: String,
    Title: String,
    Image: String,
    Description: String,
    DateCreated: Number
}))