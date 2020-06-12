const {Schema, model} = require('mongoose');
let list = new Schema({
	list: {type: String, required: true, unique: true},
}, {
	toObject: {virtuals: true}
})

module.exports = model('list', list);