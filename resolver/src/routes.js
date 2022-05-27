const { Router } = require("express");
const resolver = require("./services/resolver");

const routes = new Router();

routes.get("/:url(*)", async ({ params: { url } }, response) => {
    let ip;
    if(url !== "favicon.ico") {
        ip = await resolver(url);

        return response.status(200).json({ url, ip_address: ip });
    }

    return response.end();
});

module.exports = routes;