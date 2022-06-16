const express = require("express");
const psl = require('psl');

const app = express();
const routes = new express.Router();

routes.get("/", ({ query }, response) => {
    const nameservers = require("../nameservers.json");

    if(!query || !query.url) {
        return response.status(400).json({ error: "bad request"});
    }

    const tld = psl.parse(query.url).tld;
    
    if(!(tld in nameservers)) {
        return response.status(404).json({ error: "nameserver not found"});
    }

    return response.status(303).json({ nameserver_url: nameservers[tld] });
});

app.use(routes);

app.listen(3003, () => {
    console.log(`Resolver is running on port ${3003}`);
});
