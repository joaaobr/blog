require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routes = require("../routes");
const mongo = require("../database/connection")
const redis = require("../database/redis")
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors())

app.use((req, res, next) =>  {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST")
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, authorization'
    );
    res.header("Access-Control-Allow-Credentials", true)
    next()
}
)

app.use(routes)

const server = app.listen(PORT)

function gracefulShutdown() {
  return async () => {
    try {
      server.close(async () => {
        await mongo.connection.close()
        await redis.quit()
    
        process.exit(0)
      })
    } catch (err) {
      process.exit(1)
    }
  }
}

process.on('SIGINT', gracefulShutdown());
process.on('SIGTERM', gracefulShutdown());