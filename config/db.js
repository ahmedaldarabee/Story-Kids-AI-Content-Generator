import { drizzle } from 'drizzle-orm/neon-http';

import { neon } from '@neondatabase/serverless';

// connection for sync operations
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql });
