const cron = require('node-cron');
const redis = require("./helper/redis")
const helper = require('./helper/helper')
const config = require('./constant').config
const _ = require('lodash')
cron.schedule('* * * * *', () => {
    helper.api({
        url: config.crawler,
        method: "get"
    }).then(resp => {
        if(!_.isEmpty(resp.data)){
            if(resp.data.promos){
                if(!_.isEmpty(resp.data.promos)){
                    redis.set("indomart:prormo", JSON.stringify(resp.data), 86400)
                }
            }
        }
    })
    .catch(err => {
        helper.log("error", err)
    })
})