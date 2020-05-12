const convoModel = require('../models/conversation')
const nlpConvoModel = require('../models/nlp')
const async = require('async')
const debug = require('debug')('ltm')
const uuid = require('uuid/v4')
const moment = require('moment')
const nanoid = require('nanoid')

class LTM {
    /**
     * 
     * @param type Type data you want to save. Allowed: conversation, entities, intents, nlp, end 
     * @param data Raw JSON. Please only send RAW JSON 
     */
    static async save(type, data) {
        switch(type){
            case 'conversation':
                this.saveConversation(data, "in")
                break
            case 'conversationBot':
                this.saveConversation(data, "out")
                break
            case 'end':
                this.endConversation(data)
                break
        }
    }

    /**
     * 
     * @param {*} nlpResult Result of NLP process
     * @param {*} bot Raw object of variable bot on botkit
     */
    static async saveNlp(nlpResult, bot){
        var { entities, sourceEntities, intent, score, utterance } = nlpResult, intents = nlpResult.classifications
        var activity = bot.dc.context._activity
        debug("prepare save nlp", nlpResult)
        var conversation = await convoModel.findOne({ user: activity.from.id, status: 'active' }).lean()
        await nlpConvoModel.create({
            conversationId: conversation.conversationId,
            utterance: utterance,
            messageId: activity.messageId,
            intent: intent,
            score: score,
            intents: intents,
            entities: entities,
            sourceEntities: sourceEntities,
        })
    }

    static async saveConversation(data, type = "in") {
        var from, recipient, activity, user
        if(type == "in"){
            activity = data.activity, from = activity.from, recipient = activity.recipient, user = from
        } else{
            activity = data
            from = activity.from, recipient = activity.recipient, user = recipient
        }
        debug("ready save data conversation", activity)
        try {
            var result = await convoModel.findOne({ user: user.id, status: 'active' }).lean()
            var transcript = {
                timestamp: moment().utcOffset(7).format('X'),
                messageType: activity.messageType || "text",
                type: type,
                text: activity.text,
                messageId: activity.messageId || nanoid(18),
                user: from.id,
                name: from.name || from.id
            }
            var doc = result ? result : {
                user: user.id,
                status: 'active',
                conversationId: uuid(),
                transcript: [
                    transcript
                ]
            }
            if(result){
                await convoModel.updateOne({ _id: result._id }, { 
                    $push: {
                        transcript: transcript
                    }
                })
            } else{
                await convoModel.create(doc)
            }
        } catch(err){

        }
    }

    static async endConversation(data){
        var { activity } = data
        await convoModel.findOneAndUpdate({
            user: activity.from.id,
            status: 'active'
        }, {
            $set: {
                status: 'end'
            }
        })
    }
}

module.exports = LTM