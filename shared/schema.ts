import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Core Company and User Management
export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  country: text("country"),
  timezone: text("timezone").default("UTC"),
  settings: jsonb("settings").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  companyId: varchar("company_id").references(() => companies.id),
  isActive: boolean("is_active").default(true),
  roles: jsonb("roles").default([]),
  settings: jsonb("settings").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// CRM Module
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  source: text("source"),
  stage: text("stage").default("new"),
  probability: integer("probability").default(0),
  expectedRevenue: decimal("expected_revenue", { precision: 15, scale: 2 }),
  description: text("description"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const opportunities = pgTable("opportunities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  partnerId: varchar("partner_id").references(() => partners.id),
  stage: text("stage").default("new"),
  probability: integer("probability").default(0),
  expectedRevenue: decimal("expected_revenue", { precision: 15, scale: 2 }),
  closeDate: timestamp("close_date"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  companyId: varchar("company_id").references(() => companies.id),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Partners (Customers/Vendors)
export const partners = pgTable("partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  website: text("website"),
  isCustomer: boolean("is_customer").default(true),
  isVendor: boolean("is_vendor").default(false),
  street: text("street"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  country: text("country"),
  vatNumber: text("vat_number"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Products and Inventory
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  internalReference: text("internal_reference"),
  barcode: text("barcode"),
  salePrice: decimal("sale_price", { precision: 15, scale: 2 }),
  cost: decimal("cost", { precision: 15, scale: 2 }),
  category: text("category"),
  type: text("type").default("storable"), // storable, consumable, service
  description: text("description"),
  active: boolean("active").default(true),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inventory = pgTable("inventory", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").references(() => products.id),
  location: text("location").default("WH/Stock"),
  quantityOnHand: decimal("quantity_on_hand", { precision: 15, scale: 2 }).default("0"),
  quantityReserved: decimal("quantity_reserved", { precision: 15, scale: 2 }).default("0"),
  quantityAvailable: decimal("quantity_available", { precision: 15, scale: 2 }).default("0"),
  companyId: varchar("company_id").references(() => companies.id),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Sales Module
export const salesOrders = pgTable("sales_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  partnerId: varchar("partner_id").references(() => partners.id),
  state: text("state").default("draft"), // draft, sent, confirmed, done, cancel
  totalAmount: decimal("total_amount", { precision: 15, scale: 2 }).default("0"),
  currency: varchar("currency", { length: 3 }).default("USD"),
  orderDate: timestamp("order_date").defaultNow(),
  deliveryDate: timestamp("delivery_date"),
  salespersonId: varchar("salesperson_id").references(() => users.id),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const salesOrderLines = pgTable("sales_order_lines", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => salesOrders.id),
  productId: varchar("product_id").references(() => products.id),
  quantity: decimal("quantity", { precision: 15, scale: 2 }).notNull(),
  unitPrice: decimal("unit_price", { precision: 15, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 5, scale: 2 }).default("0"),
  subtotal: decimal("subtotal", { precision: 15, scale: 2 }).notNull(),
});

// Purchase Module
export const purchaseOrders = pgTable("purchase_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  vendorId: varchar("vendor_id").references(() => partners.id),
  state: text("state").default("draft"),
  totalAmount: decimal("total_amount", { precision: 15, scale: 2 }).default("0"),
  currency: varchar("currency", { length: 3 }).default("USD"),
  orderDate: timestamp("order_date").defaultNow(),
  receiptDate: timestamp("receipt_date"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Events Module
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  venue: text("venue"),
  capacity: integer("capacity"),
  registrationDeadline: timestamp("registration_deadline"),
  status: text("status").default("draft"), // draft, published, confirmed, cancelled
  organizerId: varchar("organizer_id").references(() => users.id),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const eventRegistrations = pgTable("event_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").references(() => events.id),
  attendeeName: text("attendee_name").notNull(),
  attendeeEmail: text("attendee_email").notNull(),
  registrationDate: timestamp("registration_date").defaultNow(),
  status: text("status").default("confirmed"), // confirmed, cancelled, attended
  companyId: varchar("company_id").references(() => companies.id),
});

// Documents Module
export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  folderId: varchar("folder_id"),
  ownerId: varchar("owner_id").references(() => users.id),
  tags: jsonb("tags").default([]),
  isShared: boolean("is_shared").default(false),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const documentFolders = pgTable("document_folders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  parentId: varchar("parent_id"),
  ownerId: varchar("owner_id").references(() => users.id),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Fleet Module
export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  model: text("model").notNull(),
  year: integer("year"),
  licensePlate: text("license_plate"),
  vin: text("vin"),
  driverId: varchar("driver_id").references(() => users.id),
  status: text("status").default("active"), // active, maintenance, inactive
  mileage: integer("mileage").default(0),
  location: text("location"),
  nextServiceDate: timestamp("next_service_date"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vehicleMaintenance = pgTable("vehicle_maintenance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").references(() => vehicles.id),
  type: text("type").notNull(), // repair, preventive, inspection
  description: text("description"),
  cost: decimal("cost", { precision: 15, scale: 2 }),
  serviceDate: timestamp("service_date"),
  nextServiceDate: timestamp("next_service_date"),
  mechanicId: varchar("mechanic_id").references(() => users.id),
  status: text("status").default("scheduled"), // scheduled, in_progress, completed
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Approvals Module
export const approvalRequests = pgTable("approval_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // purchase, time_off, budget, contract
  amount: decimal("amount", { precision: 15, scale: 2 }),
  requesterId: varchar("requester_id").references(() => users.id),
  status: text("status").default("pending"), // pending, approved, rejected, cancelled
  priority: text("priority").default("medium"), // low, medium, high, urgent
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const approvalWorkflows = pgTable("approval_workflows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  requestId: varchar("request_id").references(() => approvalRequests.id),
  approverId: varchar("approver_id").references(() => users.id),
  order: integer("order").notNull(),
  status: text("status").default("pending"), // pending, approved, rejected
  comments: text("comments"),
  actionDate: timestamp("action_date"),
  companyId: varchar("company_id").references(() => companies.id),
});

// Equipment Maintenance Module
export const equipment = pgTable("equipment", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  serialNumber: text("serial_number"),
  category: text("category"),
  location: text("location"),
  status: text("status").default("operational"), // operational, maintenance_needed, out_of_service
  purchaseDate: timestamp("purchase_date"),
  warrantyExpiry: timestamp("warranty_expiry"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const maintenanceRequests = pgTable("maintenance_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  equipmentId: varchar("equipment_id").references(() => equipment.id),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // repair, preventive, inspection
  priority: text("priority").default("medium"), // low, medium, high, urgent
  status: text("status").default("pending"), // pending, in_progress, completed, cancelled
  assignedTo: varchar("assigned_to").references(() => users.id),
  requesterId: varchar("requester_id").references(() => users.id),
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Project Management
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  partnerId: varchar("partner_id").references(() => partners.id),
  managerId: varchar("manager_id").references(() => users.id),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  state: text("state").default("active"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  projectId: varchar("project_id").references(() => projects.id),
  assignedTo: varchar("assigned_to").references(() => users.id),
  stage: text("stage").default("todo"),
  priority: text("priority").default("normal"),
  dueDate: timestamp("due_date"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// HR Module
export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  employeeId: text("employee_id").unique(),
  name: text("name").notNull(),
  jobTitle: text("job_title"),
  department: text("department"),
  managerId: varchar("manager_id"),
  hireDate: timestamp("hire_date"),
  salary: decimal("salary", { precision: 15, scale: 2 }),
  currency: varchar("currency", { length: 3 }).default("USD"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Accounting Module
export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // asset, liability, equity, income, expense
  parentId: varchar("parent_id"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const journalEntries = pgTable("journal_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  date: timestamp("date").defaultNow(),
  reference: text("reference"),
  state: text("state").default("draft"),
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Activities and Calendar
export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // meeting, call, email, task
  summary: text("summary").notNull(),
  description: text("description"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  relatedRecord: text("related_record"), // JSON reference to related record
  companyId: varchar("company_id").references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas
export const insertCompanySchema = createInsertSchema(companies).omit({ id: true, createdAt: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true, updatedAt: true });
export const insertOpportunitySchema = createInsertSchema(opportunities).omit({ id: true, createdAt: true, updatedAt: true });
export const insertPartnerSchema = createInsertSchema(partners).omit({ id: true, createdAt: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export const insertSalesOrderSchema = createInsertSchema(salesOrders).omit({ id: true, createdAt: true, updatedAt: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true, createdAt: true });
export const insertEmployeeSchema = createInsertSchema(employees).omit({ id: true, createdAt: true });
export const insertAccountSchema = createInsertSchema(accounts).omit({ id: true, createdAt: true });
export const insertActivitySchema = createInsertSchema(activities).omit({ id: true, createdAt: true });
export const insertJournalEntrySchema = createInsertSchema(journalEntries).omit({ id: true, createdAt: true });
export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrders).omit({ id: true, createdAt: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export const insertEventRegistrationSchema = createInsertSchema(eventRegistrations).omit({ id: true });
export const insertDocumentSchema = createInsertSchema(documents).omit({ id: true, createdAt: true, updatedAt: true });
export const insertDocumentFolderSchema = createInsertSchema(documentFolders).omit({ id: true, createdAt: true });
export const insertVehicleSchema = createInsertSchema(vehicles).omit({ id: true, createdAt: true });
export const insertVehicleMaintenanceSchema = createInsertSchema(vehicleMaintenance).omit({ id: true, createdAt: true });
export const insertApprovalRequestSchema = createInsertSchema(approvalRequests).omit({ id: true, createdAt: true, updatedAt: true });
export const insertApprovalWorkflowSchema = createInsertSchema(approvalWorkflows).omit({ id: true });
export const insertEquipmentSchema = createInsertSchema(equipment).omit({ id: true, createdAt: true });
export const insertMaintenanceRequestSchema = createInsertSchema(maintenanceRequests).omit({ id: true, createdAt: true, updatedAt: true });

// Types
export type Company = typeof companies.$inferSelect;
export type User = typeof users.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Opportunity = typeof opportunities.$inferSelect;
export type Partner = typeof partners.$inferSelect;
export type Product = typeof products.$inferSelect;
export type SalesOrder = typeof salesOrders.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Employee = typeof employees.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type JournalEntry = typeof journalEntries.$inferSelect;
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type Event = typeof events.$inferSelect;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type DocumentFolder = typeof documentFolders.$inferSelect;
export type Vehicle = typeof vehicles.$inferSelect;
export type VehicleMaintenance = typeof vehicleMaintenance.$inferSelect;
export type ApprovalRequest = typeof approvalRequests.$inferSelect;
export type ApprovalWorkflow = typeof approvalWorkflows.$inferSelect;
export type Equipment = typeof equipment.$inferSelect;
export type MaintenanceRequest = typeof maintenanceRequests.$inferSelect;

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
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
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
