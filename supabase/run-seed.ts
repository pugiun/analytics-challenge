/**
 * Run seed SQL via Supabase Management API
 */

import * as fs from 'fs';
import * as path from 'path';

const PROJECT_REF = 'wvauuksvdavszzcaelkg';
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN || 'sbp_ecf4ebb1fb6f744b3fc9fb0c84094a465d8c4b64';

async function runSeed() {
  const seedPath = path.join(__dirname, 'seed.sql');
  const seedSql = fs.readFileSync(seedPath, 'utf-8');

  console.log('Running seed SQL via Management API...');

  const response = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: seedSql }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to run seed:', error);
    process.exit(1);
  }

  const result = await response.json();
  console.log('Seed completed successfully!');
  console.log('Result:', JSON.stringify(result, null, 2));
}

runSeed().catch(console.error);
