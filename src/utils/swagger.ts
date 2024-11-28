import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-jsdoc';

// Define the Swagger documentation configuration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'QR Code Management API',
    version: '1.0.0',
    description: 'API documentation for QR Code Management System',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
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
};

// Define the options for Swagger JSDoc
const options: SwaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.ts'], // Paths to route files for Swagger documentation (updated for TypeScript)
};

// Generate the Swagger specification
export const swaggerSpec = swaggerJSDoc(options);
