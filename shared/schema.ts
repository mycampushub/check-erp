import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Helper function to generate UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Core Company and User Management
export const companies = sqliteTable("companies", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  currency: text("currency", { length: 3 }).default("USD"),
  country: text("country"),
  timezone: text("timezone").default("UTC"),
  settings: text("settings").default("{}"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  companyId: text("company_id").references(() => companies.id),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  roles: text("roles").default("[]"),
  settings: text("settings").default("{}"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// CRM Module
export const leads = sqliteTable("leads", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  source: text("source"),
  stage: text("stage").default("new"),
  probability: integer("probability").default(0),
  expectedRevenue: text("expected_revenue"),
  description: text("description"),
  assignedTo: text("assigned_to").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const opportunities = sqliteTable("opportunities", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  partnerId: text("partner_id").references(() => partners.id),
  stage: text("stage").default("new"),
  probability: integer("probability").default(0),
  expectedRevenue: text("expected_revenue"),
  closeDate: integer("close_date", { mode: "timestamp" }),
  assignedTo: text("assigned_to").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Partners (Customers/Vendors)
export const partners = sqliteTable("partners", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  website: text("website"),
  isCustomer: integer("is_customer", { mode: "boolean" }).default(true),
  isVendor: integer("is_vendor", { mode: "boolean" }).default(false),
  street: text("street"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  country: text("country"),
  vatNumber: text("vat_number"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Products and Inventory
export const products = sqliteTable("products", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  internalReference: text("internal_reference"),
  barcode: text("barcode"),
  salePrice: text("sale_price"),
  cost: text("cost"),
  category: text("category"),
  type: text("type").default("storable"),
  description: text("description"),
  active: integer("active", { mode: "boolean" }).default(true),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const inventory = sqliteTable("inventory", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  productId: text("product_id").references(() => products.id),
  location: text("location").default("WH/Stock"),
  quantityOnHand: text("quantity_on_hand").default("0"),
  quantityReserved: text("quantity_reserved").default("0"),
  quantityAvailable: text("quantity_available").default("0"),
  companyId: text("company_id").references(() => companies.id),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Sales Module
export const salesOrders = sqliteTable("sales_orders", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  partnerId: text("partner_id").references(() => partners.id),
  state: text("state").default("draft"),
  totalAmount: text("total_amount").default("0"),
  currency: text("currency", { length: 3 }).default("USD"),
  orderDate: integer("order_date", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  deliveryDate: integer("delivery_date", { mode: "timestamp" }),
  salespersonId: text("salesperson_id").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const salesOrderLines = sqliteTable("sales_order_lines", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  orderId: text("order_id").references(() => salesOrders.id),
  productId: text("product_id").references(() => products.id),
  quantity: text("quantity").notNull(),
  unitPrice: text("unit_price").notNull(),
  discount: text("discount").default("0"),
  subtotal: text("subtotal").notNull(),
});

// Purchase Module
export const purchaseOrders = sqliteTable("purchase_orders", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  vendorId: text("vendor_id").references(() => partners.id),
  state: text("state").default("draft"),
  totalAmount: text("total_amount").default("0"),
  currency: text("currency", { length: 3 }).default("USD"),
  orderDate: integer("order_date", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  receiptDate: integer("receipt_date", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Events Module
export const events = sqliteTable("events", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  description: text("description"),
  startDate: integer("start_date", { mode: "timestamp" }),
  endDate: integer("end_date", { mode: "timestamp" }),
  venue: text("venue"),
  capacity: integer("capacity"),
  registrationDeadline: integer("registration_deadline", { mode: "timestamp" }),
  status: text("status").default("draft"),
  organizerId: text("organizer_id").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const eventRegistrations = sqliteTable("event_registrations", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  eventId: text("event_id").references(() => events.id),
  attendeeName: text("attendee_name").notNull(),
  attendeeEmail: text("attendee_email").notNull(),
  registrationDate: integer("registration_date", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  status: text("status").default("confirmed"),
  companyId: text("company_id").references(() => companies.id),
});

// Documents Module
export const documents = sqliteTable("documents", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  folderId: text("folder_id"),
  ownerId: text("owner_id").references(() => users.id),
  tags: text("tags").default("[]"),
  isShared: integer("is_shared", { mode: "boolean" }).default(false),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const documentFolders = sqliteTable("document_folders", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  parentId: text("parent_id"),
  ownerId: text("owner_id").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Fleet Module
export const vehicles = sqliteTable("vehicles", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  model: text("model").notNull(),
  year: integer("year"),
  licensePlate: text("license_plate"),
  vin: text("vin"),
  driverId: text("driver_id").references(() => users.id),
  status: text("status").default("active"),
  mileage: integer("mileage").default(0),
  location: text("location"),
  nextServiceDate: integer("next_service_date", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const vehicleMaintenance = sqliteTable("vehicle_maintenance", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  vehicleId: text("vehicle_id").references(() => vehicles.id),
  type: text("type").notNull(),
  description: text("description"),
  cost: text("cost"),
  serviceDate: integer("service_date", { mode: "timestamp" }),
  nextServiceDate: integer("next_service_date", { mode: "timestamp" }),
  mechanicId: text("mechanic_id").references(() => users.id),
  status: text("status").default("scheduled"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Approvals Module
export const approvalRequests = sqliteTable("approval_requests", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  amount: text("amount"),
  requesterId: text("requester_id").references(() => users.id),
  status: text("status").default("pending"),
  priority: text("priority").default("medium"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const approvalWorkflows = sqliteTable("approval_workflows", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  requestId: text("request_id").references(() => approvalRequests.id),
  approverId: text("approver_id").references(() => users.id),
  order: integer("order").notNull(),
  status: text("status").default("pending"),
  comments: text("comments"),
  actionDate: integer("action_date", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
});

// Equipment Maintenance Module
export const equipment = sqliteTable("equipment", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  serialNumber: text("serial_number"),
  category: text("category"),
  location: text("location"),
  status: text("status").default("operational"),
  purchaseDate: integer("purchase_date", { mode: "timestamp" }),
  warrantyExpiry: integer("warranty_expiry", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const maintenanceRequests = sqliteTable("maintenance_requests", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  equipmentId: text("equipment_id").references(() => equipment.id),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(),
  priority: text("priority").default("medium"),
  status: text("status").default("pending"),
  assignedTo: text("assigned_to").references(() => users.id),
  requesterId: text("requester_id").references(() => users.id),
  dueDate: integer("due_date", { mode: "timestamp" }),
  completedDate: integer("completed_date", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Project Management
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  description: text("description"),
  partnerId: text("partner_id").references(() => partners.id),
  managerId: text("manager_id").references(() => users.id),
  startDate: integer("start_date", { mode: "timestamp" }),
  endDate: integer("end_date", { mode: "timestamp" }),
  state: text("state").default("active"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  description: text("description"),
  projectId: text("project_id").references(() => projects.id),
  assignedTo: text("assigned_to").references(() => users.id),
  stage: text("stage").default("todo"),
  priority: text("priority").default("normal"),
  dueDate: integer("due_date", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// HR Module
export const employees = sqliteTable("employees", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  userId: text("user_id").references(() => users.id),
  employeeId: text("employee_id").unique(),
  name: text("name").notNull(),
  jobTitle: text("job_title"),
  department: text("department"),
  managerId: text("manager_id"),
  hireDate: integer("hire_date", { mode: "timestamp" }),
  salary: text("salary"),
  currency: text("currency", { length: 3 }).default("USD"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Accounting Module
export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  code: text("code").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  parentId: text("parent_id"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const journalEntries = sqliteTable("journal_entries", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  date: integer("date", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  reference: text("reference"),
  state: text("state").default("draft"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Manufacturing Module
export const productionOrders = sqliteTable("production_orders", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  productId: text("product_id").references(() => products.id),
  quantity: text("quantity").notNull(),
  unit: text("unit").default("pcs"),
  state: text("state").default("draft"),
  priority: text("priority").default("normal"),
  plannedStartDate: integer("planned_start_date", { mode: "timestamp" }),
  plannedEndDate: integer("planned_end_date", { mode: "timestamp" }),
  actualStartDate: integer("actual_start_date", { mode: "timestamp" }),
  actualEndDate: integer("actual_end_date", { mode: "timestamp" }),
  managerId: text("manager_id").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const workOrders = sqliteTable("work_orders", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  productionOrderId: text("production_order_id").references(() => productionOrders.id),
  workCenterId: text("work_center_id"),
  operation: text("operation").notNull(),
  quantity: text("quantity").notNull(),
  unit: text("unit").default("pcs"),
  state: text("state").default("pending"),
  plannedStartDate: integer("planned_start_date", { mode: "timestamp" }),
  plannedEndDate: integer("planned_end_date", { mode: "timestamp" }),
  actualStartDate: integer("actual_start_date", { mode: "timestamp" }),
  actualEndDate: integer("actual_end_date", { mode: "timestamp" }),
  assignedTo: text("assigned_to").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const workCenters = sqliteTable("work_centers", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  type: text("type").notNull(),
  capacity: text("capacity").default("1"),
  efficiency: text("efficiency").default("100"),
  status: text("status").default("active"),
  location: text("location"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const billOfMaterials = sqliteTable("bill_of_materials", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  productId: text("product_id").references(() => products.id),
  componentId: text("component_id").references(() => products.id),
  quantity: text("quantity").notNull(),
  unit: text("unit").default("pcs"),
  version: text("version").default("1"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

export const manufacturingOperations = sqliteTable("manufacturing_operations", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  workOrderId: text("work_order_id").references(() => workOrders.id),
  name: text("name").notNull(),
  description: text("description"),
  sequence: integer("sequence").notNull(),
  duration: text("duration").notNull(),
  unit: text("unit").default("minutes"),
  state: text("state").default("pending"),
  actualDuration: text("actual_duration"),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Activities and Calendar
export const activities = sqliteTable("activities", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  type: text("type").notNull(),
  summary: text("summary").notNull(),
  description: text("description"),
  startDate: integer("start_date", { mode: "timestamp" }),
  endDate: integer("end_date", { mode: "timestamp" }),
  assignedTo: text("assigned_to").references(() => users.id),
  relatedRecord: text("related_record"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
});

// Insert Schemas
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
export const insertAccountSchema = createInsertSchema(accounts);
export const insertJournalEntrySchema = createInsertSchema(journalEntries);
export const insertProductionOrderSchema = createInsertSchema(productionOrders);
export const insertWorkOrderSchema = createInsertSchema(workOrders);
export const insertWorkCenterSchema = createInsertSchema(workCenters);
export const insertBillOfMaterialSchema = createInsertSchema(billOfMaterials);
export const insertManufacturingOperationSchema = createInsertSchema(manufacturingOperations);

// Type exports
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Opportunity = typeof opportunities.$inferSelect;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
export type Partner = typeof partners.$inferSelect;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type SalesOrder = typeof salesOrders.$inferSelect;
export type InsertSalesOrder = z.infer<typeof insertSalesOrderSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type InsertPurchaseOrder = z.infer<typeof insertPurchaseOrderSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type InsertEventRegistration = z.infer<typeof insertEventRegistrationSchema>;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type DocumentFolder = typeof documentFolders.$inferSelect;
export type InsertDocumentFolder = z.infer<typeof insertDocumentFolderSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type VehicleMaintenance = typeof vehicleMaintenance.$inferSelect;
export type InsertVehicleMaintenance = z.infer<typeof insertVehicleMaintenanceSchema>;
export type ApprovalRequest = typeof approvalRequests.$inferSelect;
export type InsertApprovalRequest = z.infer<typeof insertApprovalRequestSchema>;
export type ApprovalWorkflow = typeof approvalWorkflows.$inferSelect;
export type InsertApprovalWorkflow = z.infer<typeof insertApprovalWorkflowSchema>;
export type Equipment = typeof equipment.$inferSelect;
export type InsertEquipment = z.infer<typeof insertEquipmentSchema>;
export type MaintenanceRequest = typeof maintenanceRequests.$inferSelect;
export type InsertMaintenanceRequest = z.infer<typeof insertMaintenanceRequestSchema>;
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type JournalEntry = typeof journalEntries.$inferSelect;
export type InsertJournalEntry = z.infer<typeof insertJournalEntrySchema>;
export type ProductionOrder = typeof productionOrders.$inferSelect;
export type InsertProductionOrder = z.infer<typeof insertProductionOrderSchema>;
export type WorkOrder = typeof workOrders.$inferSelect;
export type InsertWorkOrder = z.infer<typeof insertWorkOrderSchema>;
export type WorkCenter = typeof workCenters.$inferSelect;
export type InsertWorkCenter = z.infer<typeof insertWorkCenterSchema>;
export type BillOfMaterial = typeof billOfMaterials.$inferSelect;
export type InsertBillOfMaterial = z.infer<typeof insertBillOfMaterialSchema>;
export type ManufacturingOperation = typeof manufacturingOperations.$inferSelect;
export type InsertManufacturingOperation = z.infer<typeof insertManufacturingOperationSchema>;