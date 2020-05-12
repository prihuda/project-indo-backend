var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nlpConversation = new Schema({
    conversationId: String,
    utterance: String,
    messageId: String,
    intent: String,
    score: Number,
    intents: Array,
    entities: Array,
    sourceEntities: Array,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const model = mongoose.model("nlpConversation", nlpConversation);
module.exports = model