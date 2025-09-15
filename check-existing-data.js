import Database from 'better-sqlite3';

const db = new Database('./erp.db');

try {
  console.log('Checking existing data...');
  
  const companyCount = db.prepare('SELECT COUNT(*) as count FROM companies').get();
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  const partnerCount = db.prepare('SELECT COUNT(*) as count FROM partners').get();
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
  const workCenterCount = db.prepare('SELECT COUNT(*) as count FROM work_centers').get();
  const productionOrderCount = db.prepare('SELECT COUNT(*) as count FROM production_orders').get();
  const workOrderCount = db.prepare('SELECT COUNT(*) as count FROM work_orders').get();
  const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get();
  const taskCount = db.prepare('SELECT COUNT(*) as count FROM tasks').get();
  const purchaseOrderCount = db.prepare('SELECT COUNT(*) as count FROM purchase_orders').get();
  
  console.log(`\nDatabase summary:`);
  console.log(`- Companies: ${companyCount.count}`);
  console.log(`- Users: ${userCount.count}`);
  console.log(`- Partners: ${partnerCount.count}`);
  console.log(`- Products: ${productCount.count}`);
  console.log(`- Work Centers: ${workCenterCount.count}`);
  console.log(`- Production Orders: ${productionOrderCount.count}`);
  console.log(`- Work Orders: ${workOrderCount.count}`);
  console.log(`- Projects: ${projectCount.count}`);
  console.log(`- Tasks: ${taskCount.count}`);
  console.log(`- Purchase Orders: ${purchaseOrderCount.count}`);

  // Check if admin user exists
  const adminUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
  if (adminUser) {
    console.log(`\nAdmin user found: ${adminUser.name} (${adminUser.username})`);
  }

} catch (error) {
  console.error('Error checking data:', error);
} finally {
  db.close();
}