const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
module.exports = class LTM {
    constructor(config){
        mongoose.connect(config.url, { useNewUrlParser: true }, (err) => {
            if(!err){
                console.log("Connected to mongo:", config.url)
            }
        })
    }
}