import pkg from "../../package.json";

type OpenApiSpec = {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  servers: Array<{
    url: string;
    description: string;
  }>;
  paths: Record<string, never>;
};

export function createSwaggerSpec(): OpenApiSpec {
  return {
    openapi: "3.0.3",
    info: {
      title: "Fluxinvoice API",
      version: pkg.version,
      description:
        "Generated OpenAPI scaffold for the Fluxinvoice application.",
    },
    servers: [
      {
        url: "/api",
        description: "Default API base path",
      },
    ],
    paths: {},
  };
}
