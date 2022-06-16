const { Router } = require("express");
const resolver = require("./services/resolver");

const routes = new Router();

routes.get("/:url(*)", async ({ params: { url } }, response) => {
    let ip;
    if(url !== "favicon.ico") {
        try {
            ip = await resolver(url);
        } catch (error) {
            if(error.message.toLowerCase().includes("not found")) {
                return response.status(404).json({ error: "IP address not found" });
            }

            return response.status(503).json({ error: "Service unavailable" });
        }

        return response.status(200).json({ url, ip_address: ip });
    }

    return response.end();
});

module.exports = routes;