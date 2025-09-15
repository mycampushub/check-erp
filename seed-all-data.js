import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const db = new Database('./erp.db');

// Helper function to generate UUID
function generateId() {
  return uuidv4();
}

// Helper function to generate date string
function getDate(daysOffset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString();
}

try {
  console.log('Seeding all sample data...');

  // Create default company and admin user are already created

  // Create sample partners (customers and suppliers)
  const partners = [
    {
      id: generateId(),
      name: 'TechCorp Solutions',
      type: 'customer',
      email: 'contact@techcorp.com',
      phone: '+1-555-0123',
      address: '123 Tech Street, Silicon Valley, CA 94000',
      city: 'Silicon Valley',
      state: 'CA',
      country: 'United States',
      is_customer: 1,
      is_supplier: 0,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      name: 'Global Industries',
      type: 'customer',
      email: 'projects@globalindustries.com',
      phone: '+1-555-0456',
      address: '456 Business Ave, New York, NY 10001',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      is_customer: 1,
      is_supplier: 0,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      name: 'Office Supplies Inc',
      type: 'supplier',
      email: 'sales@officesupplies.com',
      phone: '+1-555-0789',
      address: '789 Supply St, Chicago, IL 60601',
      city: 'Chicago',
      state: 'IL',
      country: 'United States',
      is_customer: 0,
      is_supplier: 1,
      tax_id: 'SUP-001',
      website: 'https://officesupplies.com',
      notes: 'Reliable office supplies vendor',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      name: 'Tech Components Ltd',
      type: 'supplier',
      email: 'orders@techcomponents.com',
      phone: '+1-555-0321',
      address: '321 Component Way, Austin, TX 73301',
      city: 'Austin',
      state: 'TX',
      country: 'United States',
      is_customer: 0,
      is_supplier: 1,
      tax_id: 'SUP-002',
      website: 'https://techcomponents.com',
      notes: 'High-quality electronic components',
      company_id: 'default-company'
    }
  ];

  // Insert partners
  for (const partner of partners) {
    const existing = db.prepare('SELECT * FROM partners WHERE id = ?').get(partner.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO partners (id, name, type, email, phone, address, city, state, country, is_customer, is_supplier, tax_id, website, notes, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        partner.id, partner.name, partner.type, partner.email, partner.phone,
        partner.address, partner.city, partner.state, partner.country,
        partner.is_customer, partner.is_supplier, partner.tax_id || null, partner.website || null,
        partner.notes || null, partner.company_id, getDate(), getDate()
      );
      console.log(`Created partner: ${partner.name}`);
    }
  }

  // Create sample products
  const products = [
    {
      id: generateId(),
      name: 'Laptop Pro',
      sku: 'LAP-PRO-001',
      description: 'High-performance laptop for professionals',
      category: 'Electronics',
      price: 1299.99,
      cost: 899.99,
      quantity: 50,
      unit: 'pcs',
      is_active: 1,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      name: 'Wireless Mouse',
      sku: 'MOU-WLS-001',
      description: 'Ergonomic wireless mouse',
      category: 'Accessories',
      price: 29.99,
      cost: 15.99,
      quantity: 200,
      unit: 'pcs',
      is_active: 1,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      name: 'USB-C Cable',
      sku: 'CAB-USB-001',
      description: 'High-speed USB-C charging cable',
      category: 'Accessories',
      price: 12.99,
      cost: 6.99,
      quantity: 500,
      unit: 'pcs',
      is_active: 1,
      company_id: 'default-company'
    }
  ];

  // Insert products
  for (const product of products) {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(product.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO products (id, name, sku, description, category, price, cost, quantity, unit, is_active, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        product.id, product.name, product.sku, product.description, product.category,
        product.price, product.cost, product.quantity, product.unit, product.is_active,
        product.company_id, getDate(), getDate()
      );
      console.log(`Created product: ${product.name}`);
    }
  }

  // Create work centers
  const workCenters = [
    {
      id: generateId(),
      name: 'Assembly Line 1',
      description: 'Main assembly line for electronic products',
      capacity: 100,
      efficiency: 0.95,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      name: 'Quality Control',
      description: 'Quality inspection and testing station',
      capacity: 50,
      efficiency: 1.0,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      name: 'Packaging',
      description: 'Final packaging and shipping preparation',
      capacity: 80,
      efficiency: 0.9,
      company_id: 'default-company'
    }
  ];

  // Insert work centers
  for (const center of workCenters) {
    const existing = db.prepare('SELECT * FROM work_centers WHERE id = ?').get(center.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO work_centers (id, name, description, capacity, efficiency, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        center.id, center.name, center.description, center.capacity,
        center.efficiency, center.company_id, getDate(), getDate()
      );
      console.log(`Created work center: ${center.name}`);
    }
  }

  // Create production orders
  const productionOrders = [
    {
      id: generateId(),
      order_number: 'PO-2024-001',
      product_id: products[0].id, // Laptop Pro
      quantity: 100,
      status: 'in_progress',
      start_date: getDate(-5),
      end_date: getDate(10),
      priority: 'high',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      order_number: 'PO-2024-002',
      product_id: products[1].id, // Wireless Mouse
      quantity: 500,
      status: 'planned',
      start_date: getDate(2),
      end_date: getDate(15),
      priority: 'normal',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      order_number: 'PO-2024-003',
      product_id: products[2].id, // USB-C Cable
      quantity: 1000,
      status: 'done',
      start_date: getDate(-10),
      end_date: getDate(-2),
      priority: 'low',
      company_id: 'default-company'
    }
  ];

  // Insert production orders
  for (const order of productionOrders) {
    const existing = db.prepare('SELECT * FROM production_orders WHERE id = ?').get(order.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO production_orders (id, order_number, product_id, quantity, status, start_date, end_date, priority, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        order.id, order.order_number, order.product_id, order.quantity,
        order.status, order.start_date, order.end_date, order.priority,
        order.company_id, getDate(), getDate()
      );
      console.log(`Created production order: ${order.order_number}`);
    }
  }

  // Create work orders
  const workOrders = [
    {
      id: generateId(),
      production_order_id: productionOrders[0].id, // Laptop Pro order
      work_center_id: workCenters[0].id, // Assembly Line 1
      description: 'Assemble laptop mainboard',
      status: 'in_progress',
      planned_hours: 4.0,
      actual_hours: 2.5,
      start_date: getDate(-4),
      end_date: getDate(8),
      company_id: 'default-company'
    },
    {
      id: generateId(),
      production_order_id: productionOrders[0].id, // Laptop Pro order
      work_center_id: workCenters[1].id, // Quality Control
      description: 'Quality inspection and testing',
      status: 'pending',
      planned_hours: 2.0,
      actual_hours: 0,
      start_date: getDate(6),
      end_date: getDate(9),
      company_id: 'default-company'
    },
    {
      id: generateId(),
      production_order_id: productionOrders[1].id, // Wireless Mouse order
      work_center_id: workCenters[0].id, // Assembly Line 1
      description: 'Assemble mouse components',
      status: 'planned',
      planned_hours: 3.0,
      actual_hours: 0,
      start_date: getDate(3),
      end_date: getDate(12),
      company_id: 'default-company'
    },
    {
      id: generateId(),
      production_order_id: productionOrders[2].id, // USB-C Cable order
      work_center_id: workCenters[2].id, // Packaging
      description: 'Package USB-C cables',
      status: 'done',
      planned_hours: 1.5,
      actual_hours: 1.2,
      start_date: getDate(-8),
      end_date: getDate(-3),
      company_id: 'default-company'
    }
  ];

  // Insert work orders
  for (const order of workOrders) {
    const existing = db.prepare('SELECT * FROM work_orders WHERE id = ?').get(order.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO work_orders (id, production_order_id, work_center_id, description, status, planned_hours, actual_hours, start_date, end_date, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        order.id, order.production_order_id, order.work_center_id, order.description,
        order.status, order.planned_hours, order.actual_hours, order.start_date,
        order.end_date, order.company_id, getDate(), getDate()
      );
      console.log(`Created work order: ${order.description}`);
    }
  }

  // Create projects
  const projects = [
    {
      id: generateId(),
      name: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      status: 'active',
      start_date: getDate(-10),
      end_date: getDate(20),
      budget: 25000,
      manager_id: 'admin-user-id',
      customer_id: partners[0].id,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      name: 'Mobile App Development',
      description: 'Native mobile app for iOS and Android platforms',
      status: 'active',
      start_date: getDate(-5),
      end_date: getDate(45),
      budget: 75000,
      manager_id: 'admin-user-id',
      customer_id: partners[1].id,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      name: 'Database Migration',
      description: 'Migration from legacy system to cloud database',
      status: 'planning',
      start_date: getDate(5),
      end_date: getDate(30),
      budget: 40000,
      manager_id: 'admin-user-id',
      customer_id: partners[0].id,
      company_id: 'default-company'
    }
  ];

  // Insert projects
  for (const project of projects) {
    const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(project.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO projects (id, name, description, status, start_date, end_date, budget, manager_id, customer_id, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        project.id, project.name, project.description, project.status,
        project.start_date, project.end_date, project.budget, project.manager_id,
        project.customer_id, project.company_id, getDate(), getDate()
      );
      console.log(`Created project: ${project.name}`);
    }
  }

  // Create tasks
  const tasks = [
    {
      id: generateId(),
      title: 'Design Homepage Layout',
      description: 'Create wireframes and mockups for the new homepage design',
      status: 'todo',
      priority: 'high',
      due_date: getDate(5),
      assignee_id: 'admin-user-id',
      project_id: projects[0].id,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      title: 'Implement Responsive Design',
      description: 'Make website fully responsive for all device sizes',
      status: 'doing',
      priority: 'high',
      due_date: getDate(10),
      assignee_id: 'admin-user-id',
      project_id: projects[0].id,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      title: 'Content Migration',
      description: 'Migrate existing content to new website structure',
      status: 'todo',
      priority: 'medium',
      due_date: getDate(15),
      assignee_id: 'admin-user-id',
      project_id: projects[0].id,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      title: 'UI/UX Design',
      description: 'Design user interface and user experience for mobile app',
      status: 'doing',
      priority: 'high',
      due_date: getDate(12),
      assignee_id: 'admin-user-id',
      project_id: projects[1].id,
      company_id: 'default-company'
    },
    {
      id: generateId(),
      title: 'Backend API Development',
      description: 'Develop RESTful API for mobile app functionality',
      status: 'todo',
      priority: 'high',
      due_date: getDate(20),
      assignee_id: 'admin-user-id',
      project_id: projects[1].id,
      company_id: 'default-company'
    }
  ];

  // Insert tasks
  for (const task of tasks) {
    const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(task.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO tasks (id, title, description, status, priority, due_date, assignee_id, project_id, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        task.id, task.title, task.description, task.status, task.priority,
        task.due_date, task.assignee_id, task.project_id, task.company_id,
        getDate(), getDate()
      );
      console.log(`Created task: ${task.title}`);
    }
  }

  // Create purchase orders
  const purchaseOrders = [
    {
      id: generateId(),
      order_number: 'PO-2024-001',
      supplier_id: partners[2].id, // Office Supplies Inc
      order_date: getDate(-5),
      expected_delivery_date: getDate(10),
      status: 'confirmed',
      subtotal: 1250.00,
      tax: 87.50,
      total: 1337.50,
      notes: 'Office supplies for Q4',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      order_number: 'PO-2024-002',
      supplier_id: partners[3].id, // Tech Components Ltd
      order_date: getDate(-3),
      expected_delivery_date: getDate(14),
      status: 'draft',
      subtotal: 8750.00,
      tax: 612.50,
      total: 9362.50,
      notes: 'Electronic components for manufacturing',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      order_number: 'PO-2024-003',
      supplier_id: partners[2].id, // Office Supplies Inc
      order_date: getDate(-1),
      expected_delivery_date: getDate(7),
      status: 'confirmed',
      subtotal: 3200.00,
      tax: 224.00,
      total: 3424.00,
      notes: 'Additional office supplies',
      company_id: 'default-company'
    }
  ];

  // Insert purchase orders
  for (const order of purchaseOrders) {
    const existing = db.prepare('SELECT * FROM purchase_orders WHERE id = ?').get(order.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO purchase_orders (id, order_number, supplier_id, order_date, expected_delivery_date, status, subtotal, tax, total, notes, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        order.id, order.order_number, order.supplier_id, order.order_date,
        order.expected_delivery_date, order.status, order.subtotal, order.tax,
        order.total, order.notes, order.company_id, getDate(), getDate()
      );
      console.log(`Created purchase order: ${order.order_number}`);
    }
  }

  // Create chart of accounts
  const chartOfAccounts = [
    {
      id: generateId(),
      code: '1000',
      name: 'Assets',
      type: 'asset',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      code: '1100',
      name: 'Cash',
      type: 'asset',
      parent_account_id: null, // Will be set after creating parent
      company_id: 'default-company'
    },
    {
      id: generateId(),
      code: '2000',
      name: 'Liabilities',
      type: 'liability',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      code: '3000',
      name: 'Equity',
      type: 'equity',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      code: '4000',
      name: 'Revenue',
      type: 'revenue',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      code: '5000',
      name: 'Expenses',
      type: 'expense',
      company_id: 'default-company'
    }
  ];

  // Insert chart of accounts
  for (const account of chartOfAccounts) {
    const existing = db.prepare('SELECT * FROM chart_of_accounts WHERE id = ?').get(account.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO chart_of_accounts (id, code, name, type, parent_account_id, is_active, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        account.id, account.code, account.name, account.type,
        account.parent_account_id, 1, account.company_id, getDate(), getDate()
      );
      console.log(`Created chart of account: ${account.name}`);
    }
  }

  // Create sample transactions
  const transactions = [
    {
      id: generateId(),
      transaction_number: 'TRX-2024-001',
      type: 'income',
      description: 'Customer Payment - TechCorp Solutions',
      amount: 5000.00,
      date: getDate(-2),
      status: 'completed',
      created_by: 'admin-user-id',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      transaction_number: 'TRX-2024-002',
      type: 'expense',
      description: 'Office Supplies Purchase',
      amount: 250.00,
      date: getDate(-1),
      status: 'completed',
      created_by: 'admin-user-id',
      company_id: 'default-company'
    },
    {
      id: generateId(),
      transaction_number: 'TRX-2024-003',
      type: 'income',
      description: 'Consulting Revenue - Global Industries',
      amount: 3500.00,
      date: getDate(-3),
      status: 'completed',
      created_by: 'admin-user-id',
      company_id: 'default-company'
    }
  ];

  // Insert transactions
  for (const transaction of transactions) {
    const existing = db.prepare('SELECT * FROM transactions WHERE id = ?').get(transaction.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO transactions (id, transaction_number, type, description, amount, date, status, created_by, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        transaction.id, transaction.transaction_number, transaction.type,
        transaction.description, transaction.amount, transaction.date,
        transaction.status, transaction.created_by, transaction.company_id,
        getDate(), getDate()
      );
      console.log(`Created transaction: ${transaction.description}`);
    }
  }

  console.log('\n✅ All sample data seeded successfully!');
  
  // Verify the data
  const partnerCount = db.prepare('SELECT COUNT(*) as count FROM partners').get();
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
  const productionOrderCount = db.prepare('SELECT COUNT(*) as count FROM production_orders').get();
  const workOrderCount = db.prepare('SELECT COUNT(*) as count FROM work_orders').get();
  const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get();
  const taskCount = db.prepare('SELECT COUNT(*) as count FROM tasks').get();
  const purchaseOrderCount = db.prepare('SELECT COUNT(*) as count FROM purchase_orders').get();
  const transactionCount = db.prepare('SELECT COUNT(*) as count FROM transactions').get();
  
  console.log('\n📊 Database Summary:');
  console.log(`- Partners: ${partnerCount.count}`);
  console.log(`- Products: ${productCount.count}`);
  console.log(`- Production Orders: ${productionOrderCount.count}`);
  console.log(`- Work Orders: ${workOrderCount.count}`);
  console.log(`- Projects: ${projectCount.count}`);
  console.log(`- Tasks: ${taskCount.count}`);
  console.log(`- Purchase Orders: ${purchaseOrderCount.count}`);
  console.log(`- Transactions: ${transactionCount.count}`);

} catch (error) {
  console.error('❌ Error seeding data:', error);
} finally {
  db.close();
}