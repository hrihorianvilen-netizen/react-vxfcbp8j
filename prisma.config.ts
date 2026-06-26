import path from 'node:path';
import { defineConfig } from 'prisma/config';

// Prisma 7 no longer auto-loads .env. For migration/tooling commands, the
// connection URL is provided via the environment (DIRECT_URL = session pooler,
// IPv4) — e.g. exported in the shell or loaded by your process manager.
const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: url ?? '',
  },
});
