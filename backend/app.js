const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();

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


routes(app);

app.listen(3000);
