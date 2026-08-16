import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`
    INSERT INTO product_categories (product_id, category_id)
    SELECT id, category_id FROM products
    ON CONFLICT DO NOTHING
    RETURNING id
  `;
  console.log(`Backfilled ${rows.length} product_categories rows`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
