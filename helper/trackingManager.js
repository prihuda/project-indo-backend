const pjson = require('../package')
const moment = require('moment')
const axios = require('axios')
const uuid = require('uuid/v4')
const session = require('express-session')
const config = require('../constant').config

const { Client } = require('@elastic/elasticsearch')
const _elastic = new Client({ node: config.elastic })

var winston  = require('winston');

class trackingManager {
    static async logInfo(str, ...any){
        let reqId = session.reqId || "[no session]"
        console.log('[INFO]', this.timenow().toString(), "-", `app=${pjson.name}[${pjson.version}]`, "-", `session=${reqId}`, "-", str, ...any)
    }

    static timenow(timestamp = "", format = ""){
        let time = timestamp !== "" ? moment(timestamp).utcOffset(7) : moment().utcOffset(7)
        if(format != ""){
            time = time.format(format)
        }
        return time
    }

    static logglyInfo(type, data){
        let reqId = session.reqId || "[no session]", now = this.timenow()
        winston.info({ session: reqId, timestamp: now.format('X'), timestampStr: now.toString(), body: data }, { tags: type })
    }

    static elasticIndex(key, data) {
        let now = moment().utcOffset(7)
        data.timestamp = now.format()
        _elastic.index({
            index: `${pjson.name}-${key}-${moment(now).format("YYYY-MM")}`,
            body: data
        }).catch(err => {
            this.logInfo(`[ERROR] failed save elastic index ${key} with message`, err.message, 'data:', data)
        })
    }

    static log(type, data, source = ['loggly', 'elastic']){
        if(typeof source == "string"){
            source = [source]
        }
        if(source.indexOf('loggly') !== -1) this.logglyInfo(type, data)
        if(source.indexOf('elastic') !== -1) this.elasticIndex(type, data)
    }
}

module.exports = trackingManager