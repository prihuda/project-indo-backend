const config = require("../constant").config
const redis = require("redis")
const session = redis.createClient(config.redis.client)
const debug = require("debug")("helper-redis")

exports.set = function(key, value, expiration = 3600) {
	return new Promise((resolve, reject) => {
		session.set(key, value, 'EX', expiration, (error, result) => {
			if(error) reject(error)
			resolve(result)
		});
	})
}

exports.get = function(key) {
	return new Promise((resolve, reject) => {
		debug("get data", key)
		session.get(key, (error, result) => {
			if(error) reject(error)
			resolve(result)
		});
	})
}