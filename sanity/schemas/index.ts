import type { SchemaTypeDefinition } from "sanity";
import { postType } from "./post";
import { authorType } from "./author";

export const schemaTypes: SchemaTypeDefinition[] = [postType, authorType];
