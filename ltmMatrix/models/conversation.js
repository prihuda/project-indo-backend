var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversation = new Schema({
    conversationId: String,
    user:  String,
    transcript: Array,
    status: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const model = mongoose.model("conversation", conversation);
module.exports = model