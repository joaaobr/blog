require('dotenv').config()
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
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

app.listen(PORT);
