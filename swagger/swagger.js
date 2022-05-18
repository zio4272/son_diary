const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Test",
      version: "1.0.0",
      description: "Test API with express",
      license: { name: "MIT", url: "http://localhost:3000/api-docs/" },
      contact: {
        name: "secret",
        url: "",
        email: "mail@gmail.com",
      },
    },
    servers: [{ url: "http://localhost:3000", description: "local Server" }],
  },
  apis: ["./routes/*.js", "./swagger/*"],
};
const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };
