require('dotenv').config()
const { createClient } = require('redis');
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env

const redis = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
})

redis.connect().then(() => {
    redis.flushAll()
})

module.exports = redis