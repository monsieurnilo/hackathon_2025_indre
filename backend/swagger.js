const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Deserts Médicaux API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js", "./src/models/*.js", "./index.js"],
};


module.exports = [swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options))];
