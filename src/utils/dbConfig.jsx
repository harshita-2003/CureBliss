import { neon } from '@neondatabase/serverless';

import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const sql = neon(
    "postgresql://neondb_owner:npg_H7GnchzSw6sN@ep-green-sea-a84qw0eg-pooler.eastus2.azure.neon.tech/beat_cancer?sslmode=require"
);

export const db = drizzle(sql , {schema})