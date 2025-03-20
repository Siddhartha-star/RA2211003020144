const axios = require("axios");

module.exports = async function fetchNumbers(url) {
    try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers || [];
    } catch (error) {
        return [];
    }
};
