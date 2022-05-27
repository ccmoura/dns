const axios = require("axios");
const { rootBaseUrl: root, TLDBaseUrl: tld } = require("../config/env");

module.exports = async (url) => { 
    if (url.length) {
        const rootResponse = await axios.get(`/?url=${url}`, { baseURL: root });

        switch(rootResponse.status) {
            case 200:
                return rootResponse.data.ip;
            case 303:
                const { data: { ip } } = await axios.get(`${tld}/?url=${url}`);

                return ip;
        }
    }
}