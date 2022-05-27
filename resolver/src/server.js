require("dotenv/config");

const express = require("express");
const routes = require("./routes");
const { port } = require("./config/env");

const app = express();

app.use(routes);

app.listen(port, () => {
    console.log(`Resolver is running on port ${port}`);
});
