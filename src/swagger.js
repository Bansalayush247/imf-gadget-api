const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IMF Gadget API',
      version: '1.0.0',
      description: 'Secure gadget inventory for the Impossible Missions Force',
    },
    servers: [{ url: 'http://localhost:3000' }],        // change to prod URL when deployed
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // 📝 Paths to files that contain OpenAPI comments:
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJSDoc(options);
