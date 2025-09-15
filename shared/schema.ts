import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Companies table
export const companies = sqliteTable("companies", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  currency: text("currency").default("USD"),
  timezone: text("timezone").default("UTC"),
  country: text("country"),
  settings: text("settings", { mode: "json" }).default("{}"),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Users table
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  companyId: text("company_id").references(() => companies.id),
  isActive: integer("is_active").default(1),
  roles: text("roles", { mode: "json" }).default("[]"),
  settings: text("settings", { mode: "json" }).default("{}"),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// CRM - Leads table
export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  source: text("source"),
  description: text("description"),
  stage: text("stage").default("new"),
  probability: integer("probability").default(0),
  expectedRevenue: real("expected_revenue"),
  assignedTo: text("assigned_to").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// CRM - Opportunities table
export const opportunities = sqliteTable("opportunities", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  partnerId: text("partner_id").references(() => partners.id),
  description: text("description"),
  stage: text("stage").default("new"),
  probability: integer("probability").default(0),
  expectedRevenue: real("expected_revenue"),
  closeDate: text("close_date"),
  assignedTo: text("assigned_to").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Partners table
export const partners = sqliteTable("partners", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // customer, supplier, both
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  isCustomer: integer("is_customer").default(0),
  isSupplier: integer("is_supplier").default(0),
  taxId: text("tax_id"),
  website: text("website"),
  notes: text("notes"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Products table
export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  sku: text("sku").unique(),
  description: text("description"),
  category: text("category"),
  price: real("price").default(0),
  cost: real("cost").default(0),
  quantity: integer("quantity").default(0),
  unit: text("unit").default("pcs"),
  isActive: integer("is_active").default(1),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Inventory table
export const inventory = sqliteTable("inventory", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  location: text("location"),
  batchNumber: text("batch_number"),
  expiryDate: text("expiry_date"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Sales Orders table
export const salesOrders = sqliteTable("sales_orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerId: text("customer_id").references(() => partners.id),
  orderDate: text("order_date").notNull(),
  expectedDeliveryDate: text("expected_delivery_date"),
  status: text("status").default("draft"),
  subtotal: real("subtotal").default(0),
  tax: real("tax").default(0),
  total: real("total").default(0),
  notes: text("notes"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Projects table
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").default("planning"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  budget: real("budget"),
  managerId: text("manager_id").references(() => users.id),
  customerId: text("customer_id").references(() => partners.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Tasks table
export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").default("todo"),
  priority: text("priority").default("medium"),
  dueDate: text("due_date"),
  assigneeId: text("assignee_id").references(() => users.id),
  projectId: text("project_id").references(() => projects.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Employees table
export const employees = sqliteTable("employees", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  employeeId: text("employee_id").unique(),
  department: text("department"),
  position: text("position"),
  hireDate: text("hire_date"),
  salary: real("salary"),
  managerId: text("manager_id").references(() => employees.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Activities table
export const activities = sqliteTable("activities", {
  id: text("id").primaryKey(),
  type: text("type").notNull(), // call, email, meeting, task
  title: text("title").notNull(),
  description: text("description"),
  dueDate: text("due_date"),
  completed: integer("completed").default(0),
  assignedTo: text("assigned_to").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Purchase Orders table
export const purchaseOrders = sqliteTable("purchase_orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  supplierId: text("supplier_id").references(() => partners.id),
  orderDate: text("order_date").notNull(),
  expectedDeliveryDate: text("expected_delivery_date"),
  status: text("status").default("draft"),
  subtotal: real("subtotal").default(0),
  tax: real("tax").default(0),
  total: real("total").default(0),
  notes: text("notes"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Events table
export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  location: text("location"),
  maxAttendees: integer("max_attendees"),
  isActive: integer("is_active").default(1),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Event Registrations table
export const eventRegistrations = sqliteTable("event_registrations", {
  id: text("id").primaryKey(),
  eventId: text("event_id").references(() => events.id),
  userId: text("user_id").references(() => users.id),
  status: text("status").default("registered"),
  registeredAt: text("registered_at").default(new Date().toISOString()),
  createdAt: text("created_at").default(new Date().toISOString()),
});

// Documents table
export const documents = sqliteTable("documents", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: integer("size"),
  path: text("path"),
  folderId: text("folder_id").references(() => documentFolders.id),
  uploadedBy: text("uploaded_by").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Document Folders table
export const documentFolders = sqliteTable("document_folders", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  parentId: text("parent_id").references(() => documentFolders.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Vehicles table
export const vehicles = sqliteTable("vehicles", {
  id: text("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year"),
  licensePlate: text("license_plate").unique(),
  vin: text("vin").unique(),
  type: text("type"),
  status: text("status").default("active"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Vehicle Maintenance table
export const vehicleMaintenance = sqliteTable("vehicle_maintenance", {
  id: text("id").primaryKey(),
  vehicleId: text("vehicle_id").references(() => vehicles.id),
  type: text("type").notNull(),
  description: text("description"),
  date: text("date").notNull(),
  cost: real("cost"),
  mileage: integer("mileage"),
  status: text("status").default("scheduled"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Approval Requests table
export const approvalRequests = sqliteTable("approval_requests", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  status: text("status").default("pending"),
  requestedBy: text("requested_by").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Approval Workflows table
export const approvalWorkflows = sqliteTable("approval_workflows", {
  id: text("id").primaryKey(),
  requestId: text("request_id").references(() => approvalRequests.id),
  approverId: text("approver_id").references(() => users.id),
  status: text("status").default("pending"),
  comments: text("comments"),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Equipment table
export const equipment = sqliteTable("equipment", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  location: text("location"),
  status: text("status").default("active"),
  lastMaintenanceDate: text("last_maintenance_date"),
  nextMaintenanceDate: text("next_maintenance_date"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Maintenance Requests table
export const maintenanceRequests = sqliteTable("maintenance_requests", {
  id: text("id").primaryKey(),
  equipmentId: text("equipment_id").references(() => equipment.id),
  title: text("title").notNull(),
  description: text("description"),
  priority: text("priority").default("medium"),
  status: text("status").default("open"),
  requestedBy: text("requested_by").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Manufacturing - Production Orders table
export const productionOrders = sqliteTable("production_orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  productId: text("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  status: text("status").default("planned"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  priority: text("priority").default("medium"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Manufacturing - Work Orders table
export const workOrders = sqliteTable("work_orders", {
  id: text("id").primaryKey(),
  productionOrderId: text("production_order_id").references(() => productionOrders.id),
  workCenterId: text("work_center_id").references(() => workCenters.id),
  description: text("description").notNull(),
  status: text("status").default("pending"),
  plannedHours: real("planned_hours"),
  actualHours: real("actual_hours"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Manufacturing - Work Centers table
export const workCenters = sqliteTable("work_centers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  capacity: real("capacity"),
  efficiency: real("efficiency").default(1),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Manufacturing - Bill of Materials table
export const billOfMaterials = sqliteTable("bill_of_materials", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id),
  componentId: text("component_id").references(() => products.id),
  quantity: real("quantity").notNull(),
  unit: text("unit").default("pcs"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Manufacturing - Manufacturing Operations table
export const manufacturingOperations = sqliteTable("manufacturing_operations", {
  id: text("id").primaryKey(),
  workOrderId: text("work_order_id").references(() => workOrders.id),
  operation: text("operation").notNull(),
  description: text("description"),
  sequence: integer("sequence").notNull(),
  plannedTime: real("planned_time"),
  actualTime: real("actual_time"),
  status: text("status").default("pending"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Accounting - Chart of Accounts table
export const chartOfAccounts = sqliteTable("chart_of_accounts", {
  id: text("id").primaryKey(),
  code: text("code").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // asset, liability, equity, revenue, expense
  parentAccountId: text("parent_account_id"), // Remove foreign key constraint to avoid circular reference
  isActive: integer("is_active").default(1),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Accounting - Journal Entries table
export const journalEntries = sqliteTable("journal_entries", {
  id: text("id").primaryKey(),
  entryNumber: text("entry_number").notNull(),
  date: text("date").notNull(),
  description: text("description"),
  reference: text("reference"),
  status: text("status").default("draft"), // draft, posted
  totalDebit: real("total_debit").default(0),
  totalCredit: real("total_credit").default(0),
  createdBy: text("created_by").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Accounting - Journal Entry Lines table
export const journalEntryLines = sqliteTable("journal_entry_lines", {
  id: text("id").primaryKey(),
  journalEntryId: text("journal_entry_id"), // Remove foreign key constraint
  accountId: text("account_id"), // Remove foreign key constraint
  description: text("description"),
  debit: real("debit").default(0),
  credit: real("credit").default(0),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Accounting - Transactions table
export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey(),
  transactionNumber: text("transaction_number").notNull(),
  type: text("type").notNull(), // income, expense, transfer
  description: text("description"),
  amount: real("amount").notNull(),
  date: text("date").notNull(),
  categoryId: text("category_id"),
  referenceId: text("reference_id"), // Reference to purchase order, sales order, etc.
  referenceType: text("reference_type"), // purchase_order, sales_order, etc.
  status: text("status").default("pending"), // pending, completed, cancelled
  createdBy: text("created_by").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: text("created_at").default(new Date().toISOString()),
  updatedAt: text("updated_at").default(new Date().toISOString()),
});

// Zod schemas for validation
export const insertCompanySchema = createInsertSchema(companies);
export const insertUserSchema = createInsertSchema(users);
export const insertLeadSchema = createInsertSchema(leads);
export const insertOpportunitySchema = createInsertSchema(opportunities);
export const insertPartnerSchema = createInsertSchema(partners);
export const insertProductSchema = createInsertSchema(products);
export const insertSalesOrderSchema = createInsertSchema(salesOrders);
export const insertProjectSchema = createInsertSchema(projects);
export const insertTaskSchema = createInsertSchema(tasks);
export const insertEmployeeSchema = createInsertSchema(employees);
export const insertActivitySchema = createInsertSchema(activities);
export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrders);
export const insertEventSchema = createInsertSchema(events);
export const insertEventRegistrationSchema = createInsertSchema(eventRegistrations);
export const insertDocumentSchema = createInsertSchema(documents);
export const insertDocumentFolderSchema = createInsertSchema(documentFolders);
export const insertVehicleSchema = createInsertSchema(vehicles);
export const insertVehicleMaintenanceSchema = createInsertSchema(vehicleMaintenance);
export const insertApprovalRequestSchema = createInsertSchema(approvalRequests);
export const insertApprovalWorkflowSchema = createInsertSchema(approvalWorkflows);
export const insertEquipmentSchema = createInsertSchema(equipment);
export const insertMaintenanceRequestSchema = createInsertSchema(maintenanceRequests);
export const insertProductionOrderSchema = createInsertSchema(productionOrders);
export const insertWorkOrderSchema = createInsertSchema(workOrders);
export const insertWorkCenterSchema = createInsertSchema(workCenters);
export const insertBillOfMaterialSchema = createInsertSchema(billOfMaterials);
export const insertManufacturingOperationSchema = createInsertSchema(manufacturingOperations);
export const insertChartOfAccountsSchema = createInsertSchema(chartOfAccounts);
export const insertJournalEntrySchema = createInsertSchema(journalEntries);
export const insertJournalEntryLineSchema = createInsertSchema(journalEntryLines);
export const insertTransactionSchema = createInsertSchema(transactions);

// Select schemas for return types
export const selectCompanySchema = createSelectSchema(companies);
export const selectUserSchema = createSelectSchema(users);
export const selectLeadSchema = createSelectSchema(leads);
export const selectOpportunitySchema = createSelectSchema(opportunities);
export const selectPartnerSchema = createSelectSchema(partners);
export const selectProductSchema = createSelectSchema(products);
export const selectSalesOrderSchema = createSelectSchema(salesOrders);
export const selectProjectSchema = createSelectSchema(projects);
export const selectTaskSchema = createSelectSchema(tasks);
export const selectEmployeeSchema = createSelectSchema(employees);
export const selectActivitySchema = createSelectSchema(activities);
export const selectPurchaseOrderSchema = createSelectSchema(purchaseOrders);
export const selectEventSchema = createSelectSchema(events);
export const selectEventRegistrationSchema = createSelectSchema(eventRegistrations);
export const selectDocumentSchema = createSelectSchema(documents);
export const selectDocumentFolderSchema = createSelectSchema(documentFolders);
export const selectVehicleSchema = createSelectSchema(vehicles);
export const selectVehicleMaintenanceSchema = createSelectSchema(vehicleMaintenance);
export const selectApprovalRequestSchema = createSelectSchema(approvalRequests);
export const selectApprovalWorkflowSchema = createSelectSchema(approvalWorkflows);
export const selectEquipmentSchema = createSelectSchema(equipment);
export const selectMaintenanceRequestSchema = createSelectSchema(maintenanceRequests);
export const selectProductionOrderSchema = createSelectSchema(productionOrders);
export const selectWorkOrderSchema = createSelectSchema(workOrders);
export const selectWorkCenterSchema = createSelectSchema(workCenters);
export const selectBillOfMaterialSchema = createSelectSchema(billOfMaterials);
export const selectManufacturingOperationSchema = createSelectSchema(manufacturingOperations);
export const selectChartOfAccountsSchema = createSelectSchema(chartOfAccounts);
export const selectJournalEntrySchema = createSelectSchema(journalEntries);
export const selectJournalEntryLineSchema = createSelectSchema(journalEntryLines);
export const selectTransactionSchema = createSelectSchema(transactions);

// TypeScript types
export type Company = z.infer<typeof selectCompanySchema>;
export type User = z.infer<typeof selectUserSchema>;
export type Lead = z.infer<typeof selectLeadSchema>;
export type Opportunity = z.infer<typeof selectOpportunitySchema>;
export type Partner = z.infer<typeof selectPartnerSchema>;
export type Product = z.infer<typeof selectProductSchema>;
export type SalesOrder = z.infer<typeof selectSalesOrderSchema>;
export type Project = z.infer<typeof selectProjectSchema>;
export type Task = z.infer<typeof selectTaskSchema>;
export type Employee = z.infer<typeof selectEmployeeSchema>;
export type Activity = z.infer<typeof selectActivitySchema>;
export type PurchaseOrder = z.infer<typeof selectPurchaseOrderSchema>;
export type Event = z.infer<typeof selectEventSchema>;
export type EventRegistration = z.infer<typeof selectEventRegistrationSchema>;
export type Document = z.infer<typeof selectDocumentSchema>;
export type DocumentFolder = z.infer<typeof selectDocumentFolderSchema>;
export type Vehicle = z.infer<typeof selectVehicleSchema>;
export type VehicleMaintenance = z.infer<typeof selectVehicleMaintenanceSchema>;
export type ApprovalRequest = z.infer<typeof selectApprovalRequestSchema>;
export type ApprovalWorkflow = z.infer<typeof selectApprovalWorkflowSchema>;
export type Equipment = z.infer<typeof selectEquipmentSchema>;
export type MaintenanceRequest = z.infer<typeof selectMaintenanceRequestSchema>;
export type ProductionOrder = z.infer<typeof selectProductionOrderSchema>;
export type WorkOrder = z.infer<typeof selectWorkOrderSchema>;
export type WorkCenter = z.infer<typeof selectWorkCenterSchema>;
export type BillOfMaterial = z.infer<typeof selectBillOfMaterialSchema>;
export type ManufacturingOperation = z.infer<typeof selectManufacturingOperationSchema>;
export type ChartOfAccounts = z.infer<typeof selectChartOfAccountsSchema>;
export type JournalEntry = z.infer<typeof selectJournalEntrySchema>;
export type JournalEntryLine = z.infer<typeof selectJournalEntryLineSchema>;
export type Transaction = z.infer<typeof selectTransactionSchema>;

// Insert types
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertSalesOrder = z.infer<typeof insertSalesOrderSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type InsertPurchaseOrder = z.infer<typeof insertPurchaseOrderSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertEventRegistration = z.infer<typeof insertEventRegistrationSchema>;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type InsertDocumentFolder = z.infer<typeof insertDocumentFolderSchema>;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type InsertVehicleMaintenance = z.infer<typeof insertVehicleMaintenanceSchema>;
export type InsertApprovalRequest = z.infer<typeof insertApprovalRequestSchema>;
export type InsertApprovalWorkflow = z.infer<typeof insertApprovalWorkflowSchema>;
export type InsertEquipment = z.infer<typeof insertEquipmentSchema>;
export type InsertMaintenanceRequest = z.infer<typeof insertMaintenanceRequestSchema>;
export type InsertProductionOrder = z.infer<typeof insertProductionOrderSchema>;
export type InsertWorkOrder = z.infer<typeof insertWorkOrderSchema>;
export type InsertWorkCenter = z.infer<typeof insertWorkCenterSchema>;
export type InsertBillOfMaterial = z.infer<typeof insertBillOfMaterialSchema>;
export type InsertManufacturingOperation = z.infer<typeof insertManufacturingOperationSchema>;
export type InsertChartOfAccounts = z.infer<typeof insertChartOfAccountsSchema>;
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type InsertJournalEntryLine = z.infer<typeof insertJournalEntryLineSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;