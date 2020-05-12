//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the botkit-starter-web bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');

// Import a platform-specific adapter for web.

const { WebAdapter } = require('botbuilder-adapter-web');

const { MongoDbStorage } = require('botbuilder-storage-mongodb');

// Load process.env values from .env file
require('dotenv').config();
var config = require('./constant.js').config
const helper = require('./helper/helper')
const crawler = require('./cron.js')
let storage = null;
if (config.mongodb) {
    storage = mongoStorage = new MongoDbStorage({
        url : config.mongodb,
        database: 'indomaret',
        collection: 'botstorage'
    });
    const mongoose = require('mongoose')
    mongoose.connect(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
        helper.log("mongodb connected to", config.mongodb)
    })
}


// const adapter = new WebAdapter({});
const Whatsapp = require('./adapter/whatsapp')
const adapter = new Whatsapp({});

const controller = new Botkit({
    debug: true,
    webhook_uri: '/api/messages',

    adapter: adapter,

    storage
});
if (config.cms_uri) {
    controller.usePlugin(new BotkitCMSHelper({
        cms_uri: config.cms_uri,
        token: config.cms_token,
    }));
}

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');

    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
        helper.log("application start with environment", process.env.NODE_ENV, "and config", JSON.stringify(config))
        controller.on('message,direct_message', async (bot, message) => {
            let results = false;
            results = await controller.plugins.cms.testTrigger(bot, message);

            if (results !== false) {
                // do not continue middleware!
                return false;
            }
        });
    }

});

