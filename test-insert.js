import Database from 'better-sqlite3';

const db = new Database('./erp.db');

try {
  // Test inserting one partner
  const testPartner = {
    id: 'test-partner-001',
    name: 'Test Partner',
    type: 'supplier',
    email: 'test@test.com',
    phone: '+1-555-0000',
    address: '123 Test St',
    city: 'Test City',
    state: 'TS',
    country: 'Test Country',
    is_customer: 0,
    is_supplier: 1,
    tax_id: null,
    website: null,
    notes: null,
    company_id: 'default-company'
  };

  console.log('Attempting to insert test partner...');
  
  const result = db.prepare(`
    INSERT INTO partners (id, name, type, email, phone, address, city, state, country, is_customer, is_supplier, tax_id, website, notes, company_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    testPartner.id, testPartner.name, testPartner.type, testPartner.email, testPartner.phone,
    testPartner.address, testPartner.city, testPartner.state, testPartner.country,
    testPartner.is_customer, testPartner.is_supplier, testPartner.tax_id, testPartner.website,
    testPartner.notes, testPartner.company_id, new Date().toISOString(), new Date().toISOString()
  );

  console.log('✅ Test partner inserted successfully!');
  console.log('Result:', result);

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Error details:', error);
} finally {
  db.close();
}