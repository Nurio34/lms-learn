const Iyzipay = require("iyzipay");

const iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY,
    secretKey: process.env.IYZICO_SECURE_KEY,
    uri: process.env.IYZICI_SANDBOX_BASE_URL,
});

module.exports = { iyzipay, Iyzipay };
