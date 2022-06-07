const axios = require("axios");
const { rootBaseUrl: root } = require("../config/env");

module.exports = async (url) => { 
    if (url.length) {
        let status;
        let rootResponse;

        try {
            rootResponse = await axios.get(`/?url=${url}`, { baseURL: root });
        } catch ({ response }) {
           status = response.status;
        }

        switch(status) {
            case 204:
                console.log(rootResponse.status)
                throw new Error("TLD not found");
            case 303:
                const tldResponse = await axios.get(`${rootResponse.data.tld_url}/?url=${url}`);
                console.log(tldResponse)
                return "ip";
        }
    }
}