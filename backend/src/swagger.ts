import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Sweet Shop Management System API",
        version: "1.0.0",
        description:
          "API documentation for the Sweet Shop Management System (Incubyte TDD Kata)",
      },
      servers: [
        {
          url: "http://localhost:4000/api/v1",
          description: "Local development server",
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          Sweet: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              category: { type: "string" },
              price: { type: "number" },
              quantity: { type: "integer" },
            },
          },
          User: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              email: { type: "string" },
              role: { type: "string" },
            },
          },
        },
      },
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./src/models/*.ts"],
  };

  const specs = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
