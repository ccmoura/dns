const { Router } = require("express");
const axios = require("axios");

const routes = new Router();

routes.get("/:url(*)", ({ params: { url } }, response) => {
    
});

module.exports = routes;