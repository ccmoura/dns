const axios = require("axios");
const { rootBaseUrl: root } = require("../config/env");

module.exports = async (url) => { 
    if (url.length) {
        let status;
        let rootResponse;

        try {
            rootResponse = await axios.get(`/?url=${url}`, { baseURL: root });

            status = rootResponse.status;
        } catch ({ response }) {
           status = response.status;
        }

        switch(status) {
            case 204:
                throw new Error("TLD not found");
            case 303:
                try {
                    await axios.get(`${rootResponse.data.body.tld_url}/?url=${url}`);
        
                    throw new Error("Service unavailable");
                } catch ({ response }) {
                    if(response.status !== 303) {
                        throw new Error("Service unavailable");
                    }

                    return { data: { body: { ip } } } = await axios.get(`${response.data.body.nameserver_url}/?url=${url}`);
                }
        }
    }
}