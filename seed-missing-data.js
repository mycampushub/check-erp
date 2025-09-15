import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';

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
  console.log('Seeding missing data...');

  // Get existing data
  const existingPartners = db.prepare('SELECT * FROM partners').all();
  const existingCustomers = existingPartners.filter(p => p.is_customer === 1);
  const existingSuppliers = existingPartners.filter(p => p.is_supplier === 1);

  console.log(`Found ${existingCustomers.length} customers and ${existingSuppliers.length} suppliers`);

  // Create products if none exist
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (productCount.count === 0) {
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
        company_id: 'default-company',
        created_at: getDate(),
        updated_at: getDate()
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
        company_id: 'default-company',
        created_at: getDate(),
        updated_at: getDate()
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
        company_id: 'default-company',
        created_at: getDate(),
        updated_at: getDate()
      }
    ];

    for (const product of products) {
      db.prepare(`
        INSERT INTO products (id, name, sku, description, category, price, cost, quantity, unit, is_active, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        product.id,
        product.name,
        product.sku,
        product.description,
        product.category,
        product.price,
        product.cost,
        product.quantity,
        product.unit,
        product.is_active,
        product.company_id,
        product.created_at,
        product.updated_at
      );
      console.log(`Created product: ${product.name}`);
    }
  }

  // Create work centers if none exist
  const workCenterCount = db.prepare('SELECT COUNT(*) as count FROM work_centers').get();
  if (workCenterCount.count === 0) {
    const workCenters = [
      {
        id: generateId(),
        name: 'Assembly Line 1',
        description: 'Main assembly line for electronic products',
        capacity: 100,
        efficiency: 0.95,
        company_id: 'default-company',
        created_at: getDate(),
        updated_at: getDate()
      },
      {
        id: generateId(),
        name: 'Quality Control',
        description: 'Quality inspection and testing station',
        capacity: 50,
        efficiency: 1.0,
        company_id: 'default-company',
        created_at: getDate(),
        updated_at: getDate()
      },
      {
        id: generateId(),
        name: 'Packaging',
        description: 'Final packaging and shipping preparation',
        capacity: 80,
        efficiency: 0.9,
        company_id: 'default-company',
        created_at: getDate(),
        updated_at: getDate()
      }
    ];

    for (const center of workCenters) {
      db.prepare(`
        INSERT INTO work_centers (id, name, description, capacity, efficiency, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        center.id,
        center.name,
        center.description,
        center.capacity,
        center.efficiency,
        center.company_id,
        center.created_at,
        center.updated_at
      );
      console.log(`Created work center: ${center.name}`);
    }
  }

  // Get products and work centers for creating orders
  const products = db.prepare('SELECT * FROM products').all();
  const workCenters = db.prepare('SELECT * FROM work_centers').all();

  // Create production orders if none exist
  const productionOrderCount = db.prepare('SELECT COUNT(*) as count FROM production_orders').get();
  if (productionOrderCount.count === 0 && products.length > 0) {
    const productionOrders = [
      {
        id: generateId(),
        order_number: 'PO-2024-001',
        product_id: products[0].id,
        quantity: 100,
        status: 'in_progress',
        start_date: getDate(-5),
        end_date: getDate(10),
        priority: 'high',
        company_id: 'default-company',
        created_at: getDate(-5),
        updated_at: getDate(-1)
      },
      {
        id: generateId(),
        order_number: 'PO-2024-002',
        product_id: products[1].id,
        quantity: 500,
        status: 'planned',
        start_date: getDate(2),
        end_date: getDate(15),
        priority: 'normal',
        company_id: 'default-company',
        created_at: getDate(-3),
        updated_at: getDate(-3)
      },
      {
        id: generateId(),
        order_number: 'PO-2024-003',
        product_id: products[2].id,
        quantity: 1000,
        status: 'done',
        start_date: getDate(-10),
        end_date: getDate(-2),
        priority: 'low',
        company_id: 'default-company',
        created_at: getDate(-10),
        updated_at: getDate(-2)
      }
    ];

    for (const order of productionOrders) {
      db.prepare(`
        INSERT INTO production_orders (id, order_number, product_id, quantity, status, start_date, end_date, priority, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        order.id,
        order.order_number,
        order.product_id,
        order.quantity,
        order.status,
        order.start_date,
        order.end_date,
        order.priority,
        order.company_id,
        order.created_at,
        order.updated_at
      );
      console.log(`Created production order: ${order.order_number}`);
    }
  }

  // Create work orders if none exist
  const workOrderCount = db.prepare('SELECT COUNT(*) as count FROM work_orders').get();
  if (workOrderCount.count === 0 && productionOrders.length > 0 && workCenters.length > 0) {
    const productionOrders = db.prepare('SELECT * FROM production_orders').all();
    
    const workOrders = [
      {
        id: generateId(),
        production_order_id: productionOrders[0].id,
        work_center_id: workCenters[0].id,
        description: 'Assemble laptop mainboard',
        status: 'in_progress',
        planned_hours: 4.0,
        actual_hours: 2.5,
        start_date: getDate(-4),
        end_date: getDate(8),
        company_id: 'default-company',
        created_at: getDate(-4),
        updated_at: getDate(-1)
      },
      {
        id: generateId(),
        production_order_id: productionOrders[0].id,
        work_center_id: workCenters[1].id,
        description: 'Quality inspection and testing',
        status: 'pending',
        planned_hours: 2.0,
        actual_hours: 0,
        start_date: getDate(6),
        end_date: getDate(9),
        company_id: 'default-company',
        created_at: getDate(-4),
        updated_at: getDate(-4)
      },
      {
        id: generateId(),
        production_order_id: productionOrders[1].id,
        work_center_id: workCenters[0].id,
        description: 'Assemble mouse components',
        status: 'planned',
        planned_hours: 3.0,
        actual_hours: 0,
        start_date: getDate(3),
        end_date: getDate(12),
        company_id: 'default-company',
        created_at: getDate(-3),
        updated_at: getDate(-3)
      },
      {
        id: generateId(),
        production_order_id: productionOrders[2].id,
        work_center_id: workCenters[2].id,
        description: 'Package USB-C cables',
        status: 'done',
        planned_hours: 1.5,
        actual_hours: 1.2,
        start_date: getDate(-8),
        end_date: getDate(-3),
        company_id: 'default-company',
        created_at: getDate(-8),
        updated_at: getDate(-3)
      }
    ];

    for (const order of workOrders) {
      db.prepare(`
        INSERT INTO work_orders (id, production_order_id, work_center_id, description, status, planned_hours, actual_hours, start_date, end_date, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        order.id,
        order.production_order_id,
        order.work_center_id,
        order.description,
        order.status,
        order.planned_hours,
        order.actual_hours,
        order.start_date,
        order.end_date,
        order.company_id,
        order.created_at,
        order.updated_at
      );
      console.log(`Created work order: ${order.description}`);
    }
  }

  // Create projects if none exist
  const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get();
  if (projectCount.count === 0 && existingCustomers.length > 0) {
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
        customer_id: existingCustomers[0].id,
        company_id: 'default-company',
        created_at: getDate(-10),
        updated_at: getDate(-5)
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
        customer_id: existingCustomers[1] ? existingCustomers[1].id : existingCustomers[0].id,
        company_id: 'default-company',
        created_at: getDate(-5),
        updated_at: getDate(-2)
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
        customer_id: existingCustomers[0].id,
        company_id: 'default-company',
        created_at: getDate(-3),
        updated_at: getDate(-3)
      }
    ];

    for (const project of projects) {
      db.prepare(`
        INSERT INTO projects (id, name, description, status, start_date, end_date, budget, manager_id, customer_id, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        project.id,
        project.name,
        project.description,
        project.status,
        project.start_date,
        project.end_date,
        project.budget,
        project.manager_id,
        project.customer_id,
        project.company_id,
        project.created_at,
        project.updated_at
      );
      console.log(`Created project: ${project.name}`);
    }
  }

  // Create tasks if none exist
  const taskCount = db.prepare('SELECT COUNT(*) as count FROM tasks').get();
  if (taskCount.count === 0) {
    const projects = db.prepare('SELECT * FROM projects').all();
    
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
        company_id: 'default-company',
        created_at: getDate(-8),
        updated_at: getDate(-8)
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
        company_id: 'default-company',
        created_at: getDate(-8),
        updated_at: getDate(-3)
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
        company_id: 'default-company',
        created_at: getDate(-6),
        updated_at: getDate(-6)
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
        company_id: 'default-company',
        created_at: getDate(-4),
        updated_at: getDate(-2)
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
        company_id: 'default-company',
        created_at: getDate(-4),
        updated_at: getDate(-4)
      },
      {
        id: generateId(),
        title: 'Database Schema Design',
        description: 'Design new database schema for cloud migration',
        status: 'todo',
        priority: 'medium',
        due_date: getDate(10),
        assignee_id: 'admin-user-id',
        project_id: projects[2].id,
        company_id: 'default-company',
        created_at: getDate(-2),
        updated_at: getDate(-2)
      },
      {
        id: generateId(),
        title: 'Data Mapping Strategy',
        description: 'Create mapping strategy for legacy data migration',
        status: 'todo',
        priority: 'medium',
        due_date: getDate(15),
        assignee_id: 'admin-user-id',
        project_id: projects[2].id,
        company_id: 'default-company',
        created_at: getDate(-2),
        updated_at: getDate(-2)
      },
      {
        id: generateId(),
        title: 'Testing and QA',
        description: 'Comprehensive testing of new website design',
        status: 'done',
        priority: 'medium',
        due_date: getDate(8),
        assignee_id: 'admin-user-id',
        project_id: projects[0].id,
        company_id: 'default-company',
        created_at: getDate(-7),
        updated_at: getDate(-1)
      }
    ];

    for (const task of tasks) {
      db.prepare(`
        INSERT INTO tasks (id, title, description, status, priority, due_date, assignee_id, project_id, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        task.id,
        task.title,
        task.description,
        task.status,
        task.priority,
        task.due_date,
        task.assignee_id,
        task.project_id,
        task.company_id,
        task.created_at,
        task.updated_at
      );
      console.log(`Created task: ${task.title}`);
    }
  }

  // Create purchase orders if none exist
  const purchaseOrderCount = db.prepare('SELECT COUNT(*) as count FROM purchase_orders').get();
  if (purchaseOrderCount.count === 0 && existingSuppliers.length > 0) {
    const purchaseOrders = [
      {
        id: generateId(),
        order_number: 'PO-2024-001',
        supplier_id: existingSuppliers[0].id,
        order_date: getDate(-5),
        expected_delivery_date: getDate(10),
        status: 'confirmed',
        subtotal: 1250.00,
        tax: 87.50,
        total: 1337.50,
        notes: 'Office supplies for Q4',
        company_id: 'default-company',
        created_at: getDate(-5),
        updated_at: getDate(-2)
      },
      {
        id: generateId(),
        order_number: 'PO-2024-002',
        supplier_id: existingSuppliers[1] ? existingSuppliers[1].id : existingSuppliers[0].id,
        order_date: getDate(-3),
        expected_delivery_date: getDate(14),
        status: 'draft',
        subtotal: 8750.00,
        tax: 612.50,
        total: 9362.50,
        notes: 'Electronic components for manufacturing',
        company_id: 'default-company',
        created_at: getDate(-3),
        updated_at: getDate(-3)
      },
      {
        id: generateId(),
        order_number: 'PO-2024-003',
        supplier_id: existingSuppliers[2] ? existingSuppliers[2].id : existingSuppliers[0].id,
        order_date: getDate(-10),
        expected_delivery_date: getDate(-2),
        status: 'received',
        subtotal: 4500.00,
        tax: 315.00,
        total: 4815.00,
        notes: 'Shipping services for product delivery',
        company_id: 'default-company',
        created_at: getDate(-10),
        updated_at: getDate(-2)
      },
      {
        id: generateId(),
        order_number: 'PO-2024-004',
        supplier_id: existingSuppliers[0].id,
        order_date: getDate(-1),
        expected_delivery_date: getDate(7),
        status: 'confirmed',
        subtotal: 3200.00,
        tax: 224.00,
        total: 3424.00,
        notes: 'Additional office supplies',
        company_id: 'default-company',
        created_at: getDate(-1),
        updated_at: getDate(-1)
      }
    ];

    for (const order of purchaseOrders) {
      db.prepare(`
        INSERT INTO purchase_orders (id, order_number, supplier_id, order_date, expected_delivery_date, status, subtotal, tax, total, notes, company_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        order.id,
        order.order_number,
        order.supplier_id,
        order.order_date,
        order.expected_delivery_date,
        order.status,
        order.subtotal,
        order.tax,
        order.total,
        order.notes,
        order.company_id,
        order.created_at,
        order.updated_at
      );
      console.log(`Created purchase order: ${order.order_number}`);
    }
  }

  console.log('Missing data seeding completed successfully!');
  
  // Final verification
  const finalCompanyCount = db.prepare('SELECT COUNT(*) as count FROM companies').get();
  const finalUserCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  const finalPartnerCount = db.prepare('SELECT COUNT(*) as count FROM partners').get();
  const finalProductCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
  const finalWorkCenterCount = db.prepare('SELECT COUNT(*) as count FROM work_centers').get();
  const finalProductionOrderCount = db.prepare('SELECT COUNT(*) as count FROM production_orders').get();
  const finalWorkOrderCount = db.prepare('SELECT COUNT(*) as count FROM work_orders').get();
  const finalProjectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get();
  const finalTaskCount = db.prepare('SELECT COUNT(*) as count FROM tasks').get();
  const finalPurchaseOrderCount = db.prepare('SELECT COUNT(*) as count FROM purchase_orders').get();
  
  console.log(`\nFinal database summary:`);
  console.log(`- Companies: ${finalCompanyCount.count}`);
  console.log(`- Users: ${finalUserCount.count}`);
  console.log(`- Partners: ${finalPartnerCount.count}`);
  console.log(`- Products: ${finalProductCount.count}`);
  console.log(`- Work Centers: ${finalWorkCenterCount.count}`);
  console.log(`- Production Orders: ${finalProductionOrderCount.count}`);
  console.log(`- Work Orders: ${finalWorkOrderCount.count}`);
  console.log(`- Projects: ${finalProjectCount.count}`);
  console.log(`- Tasks: ${finalTaskCount.count}`);
  console.log(`- Purchase Orders: ${finalPurchaseOrderCount.count}`);

} catch (error) {
  console.error('Error seeding missing data:', error);
} finally {
  db.close();
}