const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());

routes(app);

app.listen(3000);
