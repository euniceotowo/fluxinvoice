import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Fluxinvoice API",
    version: "0.1.0",
    description:
      "API documentation for Fluxinvoice. The planned backend lives in src/server; see ARCHITECTURE.md.",
  },
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

async function generateSwaggerJson() {
  const outputPath = path.join(process.cwd(), "public", "swagger.json");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(swaggerSpec, null, 2)}\n`,
    "utf8",
  );

  console.log(`Generated Swagger spec at ${outputPath}`);
}

generateSwaggerJson().catch((error) => {
  console.error("Failed to generate Swagger spec.", error);
  process.exitCode = 1;
});
