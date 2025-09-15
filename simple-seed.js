import Database from 'better-sqlite3';

const db = new Database('./erp.db');

try {
  console.log('Seeding minimal test data...');

  // Create one test partner
  const partnerId = 'test-partner-001';
  const existingPartner = db.prepare('SELECT * FROM partners WHERE id = ?').get(partnerId);
  
  if (!existingPartner) {
    db.prepare(`
      INSERT INTO partners (id, name, type, email, phone, address, city, state, country, is_customer, is_supplier, tax_id, website, notes, company_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      partnerId, 'Test Partner Corp', 'supplier', 'test@test.com', '+1-555-0000',
      '123 Test St', 'Test City', 'TS', 'Test Country', 0, 1, 
      null, null, null, 'default-company', new Date().toISOString(), new Date().toISOString()
    );
    console.log('✅ Created test partner');
  }

  // Create one test product
  const productId = 'test-product-001';
  const existingProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
  
  if (!existingProduct) {
    db.prepare(`
      INSERT INTO products (id, name, sku, description, category, price, cost, quantity, unit, is_active, company_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      productId, 'Test Product', 'TEST-001', 'Test product description', 'Test Category',
      99.99, 49.99, 100, 'pcs', 1, 'default-company', 
      new Date().toISOString(), new Date().toISOString()
    );
    console.log('✅ Created test product');
  }

  // Create one test production order
  const productionOrderId = 'test-po-001';
  const existingPO = db.prepare('SELECT * FROM production_orders WHERE id = ?').get(productionOrderId);
  
  if (!existingPO) {
    db.prepare(`
      INSERT INTO production_orders (id, order_number, product_id, quantity, status, start_date, end_date, priority, company_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      productionOrderId, 'TEST-PO-001', productId, 10, 'planned', 
      new Date().toISOString(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
      'medium', 'default-company', new Date().toISOString(), new Date().toISOString()
    );
    console.log('✅ Created test production order');
  }

  console.log('✅ Minimal test data seeded successfully!');

} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  db.close();
}