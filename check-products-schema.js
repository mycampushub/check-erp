import Database from 'better-sqlite3';

const db = new Database('./erp.db');

try {
  const columns = db.prepare("PRAGMA table_info(products)").all();
  console.log('Products table schema:');
  columns.forEach(col => {
    console.log(`${col.name} (${col.type})`);
  });
} catch (error) {
  console.error('Error:', error);
} finally {
  db.close();
}