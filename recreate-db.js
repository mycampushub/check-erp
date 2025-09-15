import Database from 'better-sqlite3';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const DB_PATH = './erp.db';
const BACKUP_PATH = './erp.db.backup';

// Backup existing database if it exists
if (fs.existsSync(DB_PATH)) {
  fs.copyFileSync(DB_PATH, BACKUP_PATH);
  console.log('Database backed up to:', BACKUP_PATH);
}

// Delete existing database
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log('Deleted existing database');
}

// Create new database with foreign key support
const db = new Database(DB_PATH);

// Enable foreign key constraints
db.pragma('foreign_keys = ON');

console.log('Creating new database with foreign key support...');

// Create tables in the correct order to satisfy foreign key constraints

// 1. Companies table (no foreign keys)
db.exec(`
  CREATE TABLE companies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    currency TEXT DEFAULT 'USD',
    timezone TEXT DEFAULT 'UTC',
    country TEXT,
    settings TEXT DEFAULT '{}',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// 2. Users table (references companies)
db.exec(`
  CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    company_id TEXT,
    is_active INTEGER DEFAULT 1,
    roles TEXT DEFAULT '[]',
    settings TEXT DEFAULT '{}',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 3. Partners table (references companies)
db.exec(`
  CREATE TABLE partners (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    is_customer INTEGER DEFAULT 0,
    is_supplier INTEGER DEFAULT 0,
    tax_id TEXT,
    website TEXT,
    notes TEXT,
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 4. Products table (references companies)
db.exec(`
  CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    description TEXT,
    category TEXT,
    price REAL DEFAULT 0,
    cost REAL DEFAULT 0,
    quantity INTEGER DEFAULT 0,
    unit TEXT DEFAULT 'pcs',
    is_active INTEGER DEFAULT 1,
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 5. Projects table (references companies, users, partners)
db.exec(`
  CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'planning',
    start_date TEXT,
    end_date TEXT,
    budget REAL,
    manager_id TEXT,
    customer_id TEXT,
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (manager_id) REFERENCES users(id),
    FOREIGN KEY (customer_id) REFERENCES partners(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 6. Tasks table (references projects, users)
db.exec(`
  CREATE TABLE tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    priority TEXT DEFAULT 'medium',
    due_date TEXT,
    assignee_id TEXT,
    project_id TEXT,
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignee_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 7. Work centers table (references companies)
db.exec(`
  CREATE TABLE work_centers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    capacity REAL,
    efficiency REAL DEFAULT 1,
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 8. Production orders table (references products, companies)
db.exec(`
  CREATE TABLE production_orders (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    product_id TEXT,
    quantity INTEGER NOT NULL,
    status TEXT DEFAULT 'planned',
    start_date TEXT,
    end_date TEXT,
    priority TEXT DEFAULT 'medium',
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 9. Work orders table (references production_orders, work_centers)
db.exec(`
  CREATE TABLE work_orders (
    id TEXT PRIMARY KEY,
    production_order_id TEXT,
    work_center_id TEXT,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    planned_hours REAL,
    actual_hours REAL,
    start_date TEXT,
    end_date TEXT,
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (production_order_id) REFERENCES production_orders(id),
    FOREIGN KEY (work_center_id) REFERENCES work_centers(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 10. Purchase orders table (references partners, companies)
db.exec(`
  CREATE TABLE purchase_orders (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    supplier_id TEXT,
    order_date TEXT NOT NULL,
    expected_delivery_date TEXT,
    status TEXT DEFAULT 'draft',
    subtotal REAL DEFAULT 0,
    tax REAL DEFAULT 0,
    total REAL DEFAULT 0,
    notes TEXT,
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES partners(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 11. Chart of accounts table (references companies, self-reference)
db.exec(`
  CREATE TABLE chart_of_accounts (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    parent_account_id TEXT,
    is_active INTEGER DEFAULT 1,
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_account_id) REFERENCES chart_of_accounts(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// 12. Transactions table (references companies, users)
db.exec(`
  CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    transaction_number TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    description TEXT,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    category_id TEXT,
    reference_id TEXT,
    reference_type TEXT,
    status TEXT DEFAULT 'pending',
    created_by TEXT,
    company_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
  )
`);

// Insert default company
db.exec(`
  INSERT INTO companies (id, name, currency, timezone, country, settings)
  VALUES ('default-company', 'Demo Company', 'USD', 'UTC', 'United States', '{}')
`);

// Insert default admin user
const hashedPassword = await bcrypt.hash('admin', 10);
db.exec(`
  INSERT INTO users (id, username, email, name, password, company_id, is_active, roles, settings)
  VALUES ('admin-user-id', 'admin', 'admin@demo.com', 'System Administrator', '${hashedPassword}', 'default-company', 1, '["admin"]', '{}')
`);

console.log('Database recreated successfully with foreign key constraints!');

// Verify foreign keys are enabled
const fkEnabled = db.pragma('foreign_keys');
console.log('Foreign keys enabled:', fkEnabled);

db.close();