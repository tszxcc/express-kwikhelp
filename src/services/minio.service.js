const minio = require("minio");

const minioClient = new minio.Client({
    endPoint: "kwikhelp-minio",
    // endPoint: "server3.bryanc12.net",
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

module.exports = minioClient;
