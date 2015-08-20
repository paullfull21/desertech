var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new mongoose.Schema({
	title: String,
	descrip: String,
	blogg: String,
	datePost: String,
	imgBlogUrl: String,
	autor: String,
	imgAutorUrl: String,
	linkFB: String,
	linkTW: String,
	linkGH: String
});
module.exports = mongoose.model('Blog', BlogSchema);

