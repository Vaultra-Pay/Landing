/**
 * Sanity Studio config — mounted at /studio inside the Next.js app.
 * Anyone with access to the Sanity project can log in and manage content.
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "vaultra-blog",
  title: "Vaultra Blog",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
