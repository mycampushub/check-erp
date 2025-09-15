var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  accounts: () => accounts,
  activities: () => activities,
  approvalRequests: () => approvalRequests,
  approvalWorkflows: () => approvalWorkflows,
  companies: () => companies,
  documentFolders: () => documentFolders,
  documents: () => documents,
  employees: () => employees,
  equipment: () => equipment,
  eventRegistrations: () => eventRegistrations,
  events: () => events,
  insertAccountSchema: () => insertAccountSchema,
  insertActivitySchema: () => insertActivitySchema,
  insertApprovalRequestSchema: () => insertApprovalRequestSchema,
  insertApprovalWorkflowSchema: () => insertApprovalWorkflowSchema,
  insertCompanySchema: () => insertCompanySchema,
  insertDocumentFolderSchema: () => insertDocumentFolderSchema,
  insertDocumentSchema: () => insertDocumentSchema,
  insertEmployeeSchema: () => insertEmployeeSchema,
  insertEquipmentSchema: () => insertEquipmentSchema,
  insertEventRegistrationSchema: () => insertEventRegistrationSchema,
  insertEventSchema: () => insertEventSchema,
  insertJournalEntrySchema: () => insertJournalEntrySchema,
  insertLeadSchema: () => insertLeadSchema,
  insertMaintenanceRequestSchema: () => insertMaintenanceRequestSchema,
  insertOpportunitySchema: () => insertOpportunitySchema,
  insertPartnerSchema: () => insertPartnerSchema,
  insertProductSchema: () => insertProductSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertPurchaseOrderSchema: () => insertPurchaseOrderSchema,
  insertSalesOrderSchema: () => insertSalesOrderSchema,
  insertTaskSchema: () => insertTaskSchema,
  insertUserSchema: () => insertUserSchema,
  insertVehicleMaintenanceSchema: () => insertVehicleMaintenanceSchema,
  insertVehicleSchema: () => insertVehicleSchema,
  inventory: () => inventory,
  journalEntries: () => journalEntries,
  leads: () => leads,
  maintenanceRequests: () => maintenanceRequests,
  opportunities: () => opportunities,
  partners: () => partners,
  products: () => products,
  projects: () => projects,
  purchaseOrders: () => purchaseOrders,
  salesOrderLines: () => salesOrderLines,
  salesOrders: () => salesOrders,
  tasks: () => tasks,
  users: () => users,
  vehicleMaintenance: () => vehicleMaintenance,
  vehicles: () => vehicles
});
import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
var companies = sqliteTable("companies", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  currency: text("currency", { length: 3 }).default("USD"),
  country: text("country"),
  timezone: text("timezone").default("UTC"),
  settings: text("settings").default("{}"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var users = sqliteTable("users", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  companyId: text("company_id").references(() => companies.id),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  roles: text("roles").default("[]"),
  settings: text("settings").default("{}"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var leads = sqliteTable("leads", {
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
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var opportunities = sqliteTable("opportunities", {
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
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var partners = sqliteTable("partners", {
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
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var products = sqliteTable("products", {
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
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var inventory = sqliteTable("inventory", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  productId: text("product_id").references(() => products.id),
  location: text("location").default("WH/Stock"),
  quantityOnHand: text("quantity_on_hand").default("0"),
  quantityReserved: text("quantity_reserved").default("0"),
  quantityAvailable: text("quantity_available").default("0"),
  companyId: text("company_id").references(() => companies.id),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var salesOrders = sqliteTable("sales_orders", {
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
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var salesOrderLines = sqliteTable("sales_order_lines", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  orderId: text("order_id").references(() => salesOrders.id),
  productId: text("product_id").references(() => products.id),
  quantity: text("quantity").notNull(),
  unitPrice: text("unit_price").notNull(),
  discount: text("discount").default("0"),
  subtotal: text("subtotal").notNull()
});
var purchaseOrders = sqliteTable("purchase_orders", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  vendorId: text("vendor_id").references(() => partners.id),
  state: text("state").default("draft"),
  totalAmount: text("total_amount").default("0"),
  currency: text("currency", { length: 3 }).default("USD"),
  orderDate: integer("order_date", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  receiptDate: integer("receipt_date", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var events = sqliteTable("events", {
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
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var eventRegistrations = sqliteTable("event_registrations", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  eventId: text("event_id").references(() => events.id),
  attendeeName: text("attendee_name").notNull(),
  attendeeEmail: text("attendee_email").notNull(),
  registrationDate: integer("registration_date", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  status: text("status").default("confirmed"),
  companyId: text("company_id").references(() => companies.id)
});
var documents = sqliteTable("documents", {
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
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var documentFolders = sqliteTable("document_folders", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  parentId: text("parent_id"),
  ownerId: text("owner_id").references(() => users.id),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var vehicles = sqliteTable("vehicles", {
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
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var vehicleMaintenance = sqliteTable("vehicle_maintenance", {
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
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var approvalRequests = sqliteTable("approval_requests", {
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
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var approvalWorkflows = sqliteTable("approval_workflows", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  requestId: text("request_id").references(() => approvalRequests.id),
  approverId: text("approver_id").references(() => users.id),
  order: integer("order").notNull(),
  status: text("status").default("pending"),
  comments: text("comments"),
  actionDate: integer("action_date", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id)
});
var equipment = sqliteTable("equipment", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  serialNumber: text("serial_number"),
  category: text("category"),
  location: text("location"),
  status: text("status").default("operational"),
  purchaseDate: integer("purchase_date", { mode: "timestamp" }),
  warrantyExpiry: integer("warranty_expiry", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var maintenanceRequests = sqliteTable("maintenance_requests", {
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
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var projects = sqliteTable("projects", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  description: text("description"),
  partnerId: text("partner_id").references(() => partners.id),
  managerId: text("manager_id").references(() => users.id),
  startDate: integer("start_date", { mode: "timestamp" }),
  endDate: integer("end_date", { mode: "timestamp" }),
  state: text("state").default("active"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var tasks = sqliteTable("tasks", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  description: text("description"),
  projectId: text("project_id").references(() => projects.id),
  assignedTo: text("assigned_to").references(() => users.id),
  stage: text("stage").default("todo"),
  priority: text("priority").default("normal"),
  dueDate: integer("due_date", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var employees = sqliteTable("employees", {
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
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var accounts = sqliteTable("accounts", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  code: text("code").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  parentId: text("parent_id"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var journalEntries = sqliteTable("journal_entries", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  name: text("name").notNull(),
  date: integer("date", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  reference: text("reference"),
  state: text("state").default("draft"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var activities = sqliteTable("activities", {
  id: text("id").primaryKey().$default(() => generateUUID()),
  type: text("type").notNull(),
  summary: text("summary").notNull(),
  description: text("description"),
  startDate: integer("start_date", { mode: "timestamp" }),
  endDate: integer("end_date", { mode: "timestamp" }),
  assignedTo: text("assigned_to").references(() => users.id),
  relatedRecord: text("related_record"),
  companyId: text("company_id").references(() => companies.id),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`)
});
var insertCompanySchema = createInsertSchema(companies);
var insertUserSchema = createInsertSchema(users);
var insertLeadSchema = createInsertSchema(leads);
var insertOpportunitySchema = createInsertSchema(opportunities);
var insertPartnerSchema = createInsertSchema(partners);
var insertProductSchema = createInsertSchema(products);
var insertSalesOrderSchema = createInsertSchema(salesOrders);
var insertProjectSchema = createInsertSchema(projects);
var insertTaskSchema = createInsertSchema(tasks);
var insertEmployeeSchema = createInsertSchema(employees);
var insertActivitySchema = createInsertSchema(activities);
var insertPurchaseOrderSchema = createInsertSchema(purchaseOrders);
var insertEventSchema = createInsertSchema(events);
var insertEventRegistrationSchema = createInsertSchema(eventRegistrations);
var insertDocumentSchema = createInsertSchema(documents);
var insertDocumentFolderSchema = createInsertSchema(documentFolders);
var insertVehicleSchema = createInsertSchema(vehicles);
var insertVehicleMaintenanceSchema = createInsertSchema(vehicleMaintenance);
var insertApprovalRequestSchema = createInsertSchema(approvalRequests);
var insertApprovalWorkflowSchema = createInsertSchema(approvalWorkflows);
var insertEquipmentSchema = createInsertSchema(equipment);
var insertMaintenanceRequestSchema = createInsertSchema(maintenanceRequests);
var insertAccountSchema = createInsertSchema(accounts);
var insertJournalEntrySchema = createInsertSchema(journalEntries);

// server/db.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
var sqlite = new Database("./erp.db");
var db = drizzle({ client: sqlite, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
var DatabaseStorage = class {
  constructor() {
    this.initializeDefaultData();
  }
  async initializeDefaultData() {
    try {
      const existingCompany = await db.select().from(companies).where(eq(companies.id, "default-company")).limit(1);
      if (existingCompany.length === 0) {
        await db.insert(companies).values({
          id: "default-company",
          name: "Demo Company",
          currency: "USD",
          timezone: "UTC",
          country: "United States",
          settings: {}
        });
      }
      const existingAdmin = await db.select().from(users).where(eq(users.username, "admin")).limit(1);
      if (existingAdmin.length === 0) {
        const hashedPassword = await bcrypt.hash("admin", 10);
        await db.insert(users).values({
          username: "admin",
          email: "admin@demo.com",
          name: "System Administrator",
          password: hashedPassword,
          companyId: "default-company",
          isActive: true,
          roles: ["admin"],
          settings: {}
        });
      }
    } catch (error) {
      console.error("Error initializing default data:", error);
    }
  }
  // Users and Companies
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user;
  }
  async createUser(insertUser) {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const [user] = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword,
      companyId: insertUser.companyId ?? null,
      isActive: insertUser.isActive ?? true,
      roles: insertUser.roles ?? [],
      settings: insertUser.settings ?? {}
    }).returning();
    return user;
  }
  async updateUser(id, updateData) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const [user] = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
    return user;
  }
  async deleteUser(id) {
    await db.delete(users).where(eq(users.id, id));
  }
  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
  async getUsers(companyId) {
    return await db.select().from(users).where(eq(users.companyId, companyId));
  }
  async getCompany(id) {
    const [company] = await db.select().from(companies).where(eq(companies.id, id)).limit(1);
    return company;
  }
  async createCompany(insertCompany) {
    const [company] = await db.insert(companies).values({
      ...insertCompany,
      country: insertCompany.country ?? null,
      currency: insertCompany.currency ?? "USD",
      timezone: insertCompany.timezone ?? "UTC",
      settings: insertCompany.settings ?? {}
    }).returning();
    return company;
  }
  async updateCompany(id, updateData) {
    const [company] = await db.update(companies).set(updateData).where(eq(companies.id, id)).returning();
    return company;
  }
  async deleteCompany(id) {
    await db.delete(companies).where(eq(companies.id, id));
  }
  async getCompanies() {
    return await db.select().from(companies);
  }
  // CRM
  async getLeads(companyId) {
    return await db.select().from(leads).where(eq(leads.companyId, companyId));
  }
  async createLead(insertLead) {
    const [lead] = await db.insert(leads).values({
      ...insertLead,
      email: insertLead.email ?? null,
      phone: insertLead.phone ?? null,
      company: insertLead.company ?? null,
      source: insertLead.source ?? null,
      description: insertLead.description ?? null,
      assignedTo: insertLead.assignedTo ?? null,
      companyId: insertLead.companyId ?? null,
      stage: insertLead.stage ?? "new",
      probability: insertLead.probability ?? 0,
      expectedRevenue: insertLead.expectedRevenue ?? null
    }).returning();
    return lead;
  }
  async updateLead(id, updateData) {
    const [lead] = await db.update(leads).set({ ...updateData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(leads.id, id)).returning();
    return lead;
  }
  async deleteLead(id) {
    await db.delete(leads).where(eq(leads.id, id));
  }
  async getOpportunities(companyId) {
    return await db.select().from(opportunities).where(eq(opportunities.companyId, companyId));
  }
  async createOpportunity(insertOpportunity) {
    const [opportunity] = await db.insert(opportunities).values({
      ...insertOpportunity,
      partnerId: insertOpportunity.partnerId ?? null,
      description: insertOpportunity.description ?? null,
      expectedRevenue: insertOpportunity.expectedRevenue ?? null,
      closeDate: insertOpportunity.closeDate ?? null,
      assignedTo: insertOpportunity.assignedTo ?? null,
      companyId: insertOpportunity.companyId ?? null,
      stage: insertOpportunity.stage ?? "new",
      probability: insertOpportunity.probability ?? 0
    }).returning();
    return opportunity;
  }
  async updateOpportunity(id, updateData) {
    const [opportunity] = await db.update(opportunities).set({ ...updateData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(opportunities.id, id)).returning();
    return opportunity;
  }
  async deleteOpportunity(id) {
    await db.delete(opportunities).where(eq(opportunities.id, id));
  }
  // Partners
  async getPartners(companyId) {
    return await db.select().from(partners).where(eq(partners.companyId, companyId));
  }
  async createPartner(insertPartner) {
    const [partner] = await db.insert(partners).values({
      ...insertPartner,
      email: insertPartner.email ?? null,
      phone: insertPartner.phone ?? null,
      website: insertPartner.website ?? null,
      street: insertPartner.street ?? null,
      city: insertPartner.city ?? null,
      state: insertPartner.state ?? null,
      zip: insertPartner.zip ?? null,
      country: insertPartner.country ?? null,
      vatNumber: insertPartner.vatNumber ?? null,
      companyId: insertPartner.companyId ?? null,
      isCustomer: insertPartner.isCustomer ?? true,
      isVendor: insertPartner.isVendor ?? false
    }).returning();
    return partner;
  }
  async updatePartner(id, updateData) {
    const [partner] = await db.update(partners).set(updateData).where(eq(partners.id, id)).returning();
    return partner;
  }
  async deletePartner(id) {
    await db.delete(partners).where(eq(partners.id, id));
  }
  // Products
  async getProducts(companyId) {
    return await db.select().from(products).where(eq(products.companyId, companyId));
  }
  async createProduct(insertProduct) {
    const [product] = await db.insert(products).values({
      ...insertProduct,
      internalReference: insertProduct.internalReference ?? null,
      barcode: insertProduct.barcode ?? null,
      salePrice: insertProduct.salePrice ?? null,
      cost: insertProduct.cost ?? null,
      category: insertProduct.category ?? null,
      description: insertProduct.description ?? null,
      companyId: insertProduct.companyId ?? null,
      active: insertProduct.active ?? true,
      type: insertProduct.type ?? "storable"
    }).returning();
    return product;
  }
  async updateProduct(id, updateData) {
    const [product] = await db.update(products).set(updateData).where(eq(products.id, id)).returning();
    return product;
  }
  async deleteProduct(id) {
    await db.delete(products).where(eq(products.id, id));
  }
  // Sales
  async getSalesOrders(companyId) {
    return await db.select().from(salesOrders).where(eq(salesOrders.companyId, companyId));
  }
  async createSalesOrder(insertSalesOrder) {
    const [order] = await db.insert(salesOrders).values({
      ...insertSalesOrder,
      partnerId: insertSalesOrder.partnerId ?? null,
      deliveryDate: insertSalesOrder.deliveryDate ?? null,
      salespersonId: insertSalesOrder.salespersonId ?? null,
      companyId: insertSalesOrder.companyId ?? null,
      state: insertSalesOrder.state ?? "draft",
      totalAmount: insertSalesOrder.totalAmount ?? "0",
      currency: insertSalesOrder.currency ?? "USD",
      orderDate: insertSalesOrder.orderDate ?? /* @__PURE__ */ new Date()
    }).returning();
    return order;
  }
  async updateSalesOrder(id, updateData) {
    const [order] = await db.update(salesOrders).set({ ...updateData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(salesOrders.id, id)).returning();
    return order;
  }
  async deleteSalesOrder(id) {
    await db.delete(salesOrders).where(eq(salesOrders.id, id));
  }
  // Projects
  async getProjects(companyId) {
    return await db.select().from(projects).where(eq(projects.companyId, companyId));
  }
  async createProject(insertProject) {
    const [project] = await db.insert(projects).values({
      ...insertProject,
      description: insertProject.description ?? null,
      partnerId: insertProject.partnerId ?? null,
      managerId: insertProject.managerId ?? null,
      startDate: insertProject.startDate ?? null,
      endDate: insertProject.endDate ?? null,
      companyId: insertProject.companyId ?? null,
      state: insertProject.state ?? "active"
    }).returning();
    return project;
  }
  async updateProject(id, updateData) {
    const [project] = await db.update(projects).set(updateData).where(eq(projects.id, id)).returning();
    return project;
  }
  async deleteProject(id) {
    await db.delete(projects).where(eq(projects.id, id));
  }
  async getTasks(companyId) {
    return await db.select().from(tasks).where(eq(tasks.companyId, companyId));
  }
  async createTask(insertTask) {
    const [task] = await db.insert(tasks).values({
      ...insertTask,
      description: insertTask.description ?? null,
      projectId: insertTask.projectId ?? null,
      assignedTo: insertTask.assignedTo ?? null,
      dueDate: insertTask.dueDate ?? null,
      companyId: insertTask.companyId ?? null,
      stage: insertTask.stage ?? "todo",
      priority: insertTask.priority ?? "normal"
    }).returning();
    return task;
  }
  async updateTask(id, updateData) {
    const [task] = await db.update(tasks).set(updateData).where(eq(tasks.id, id)).returning();
    return task;
  }
  async deleteTask(id) {
    await db.delete(tasks).where(eq(tasks.id, id));
  }
  // HR
  async getEmployees(companyId) {
    return await db.select().from(employees).where(eq(employees.companyId, companyId));
  }
  async createEmployee(insertEmployee) {
    const [employee] = await db.insert(employees).values({
      ...insertEmployee,
      userId: insertEmployee.userId ?? null,
      employeeId: insertEmployee.employeeId ?? null,
      jobTitle: insertEmployee.jobTitle ?? null,
      department: insertEmployee.department ?? null,
      managerId: insertEmployee.managerId ?? null,
      hireDate: insertEmployee.hireDate ?? null,
      salary: insertEmployee.salary ?? null,
      companyId: insertEmployee.companyId ?? null,
      currency: insertEmployee.currency ?? "USD"
    }).returning();
    return employee;
  }
  async updateEmployee(id, updateData) {
    const [employee] = await db.update(employees).set(updateData).where(eq(employees.id, id)).returning();
    return employee;
  }
  async deleteEmployee(id) {
    await db.delete(employees).where(eq(employees.id, id));
  }
  // Activities
  async getActivities(companyId) {
    return await db.select().from(activities).where(eq(activities.companyId, companyId));
  }
  async createActivity(insertActivity) {
    const [activity] = await db.insert(activities).values({
      ...insertActivity,
      description: insertActivity.description ?? null,
      startDate: insertActivity.startDate ?? null,
      endDate: insertActivity.endDate ?? null,
      assignedTo: insertActivity.assignedTo ?? null,
      relatedRecord: insertActivity.relatedRecord ?? null,
      companyId: insertActivity.companyId ?? null
    }).returning();
    return activity;
  }
  async updateActivity(id, updateData) {
    const [activity] = await db.update(activities).set(updateData).where(eq(activities.id, id)).returning();
    return activity;
  }
  async deleteActivity(id) {
    await db.delete(activities).where(eq(activities.id, id));
  }
  // Purchase Orders
  async getPurchaseOrders(companyId) {
    return await db.select().from(purchaseOrders).where(eq(purchaseOrders.companyId, companyId));
  }
  async createPurchaseOrder(insertPurchaseOrder) {
    const [order] = await db.insert(purchaseOrders).values({
      ...insertPurchaseOrder,
      vendorId: insertPurchaseOrder.vendorId ?? null,
      receiptDate: insertPurchaseOrder.receiptDate ?? null,
      companyId: insertPurchaseOrder.companyId ?? null,
      state: insertPurchaseOrder.state ?? "draft",
      totalAmount: insertPurchaseOrder.totalAmount ?? "0",
      currency: insertPurchaseOrder.currency ?? "USD",
      orderDate: insertPurchaseOrder.orderDate ?? /* @__PURE__ */ new Date()
    }).returning();
    return order;
  }
  async updatePurchaseOrder(id, updateData) {
    const [order] = await db.update(purchaseOrders).set(updateData).where(eq(purchaseOrders.id, id)).returning();
    return order;
  }
  async deletePurchaseOrder(id) {
    await db.delete(purchaseOrders).where(eq(purchaseOrders.id, id));
  }
  // Events
  async getEvents(companyId) {
    return await db.select().from(events).where(eq(events.companyId, companyId));
  }
  async createEvent(insertEvent) {
    const [event] = await db.insert(events).values({
      ...insertEvent,
      description: insertEvent.description ?? null,
      startDate: insertEvent.startDate ?? null,
      endDate: insertEvent.endDate ?? null,
      venue: insertEvent.venue ?? null,
      capacity: insertEvent.capacity ?? null,
      registrationDeadline: insertEvent.registrationDeadline ?? null,
      organizerId: insertEvent.organizerId ?? null,
      companyId: insertEvent.companyId ?? null,
      status: insertEvent.status ?? "draft"
    }).returning();
    return event;
  }
  async updateEvent(id, updateData) {
    const [event] = await db.update(events).set(updateData).where(eq(events.id, id)).returning();
    return event;
  }
  async deleteEvent(id) {
    await db.delete(events).where(eq(events.id, id));
  }
  async getEventRegistrations(eventId) {
    return await db.select().from(eventRegistrations).where(eq(eventRegistrations.eventId, eventId));
  }
  async createEventRegistration(insertRegistration) {
    const [registration] = await db.insert(eventRegistrations).values({
      ...insertRegistration,
      companyId: insertRegistration.companyId ?? null,
      status: insertRegistration.status ?? "confirmed",
      registrationDate: insertRegistration.registrationDate ?? /* @__PURE__ */ new Date()
    }).returning();
    return registration;
  }
  async updateEventRegistration(id, updateData) {
    const [registration] = await db.update(eventRegistrations).set(updateData).where(eq(eventRegistrations.id, id)).returning();
    return registration;
  }
  async deleteEventRegistration(id) {
    await db.delete(eventRegistrations).where(eq(eventRegistrations.id, id));
  }
  // Documents
  async getDocuments(companyId) {
    return await db.select().from(documents).where(eq(documents.companyId, companyId));
  }
  async createDocument(insertDocument) {
    const [document] = await db.insert(documents).values({
      ...insertDocument,
      fileSize: insertDocument.fileSize ?? null,
      mimeType: insertDocument.mimeType ?? null,
      folderId: insertDocument.folderId ?? null,
      ownerId: insertDocument.ownerId ?? null,
      companyId: insertDocument.companyId ?? null,
      tags: insertDocument.tags ?? [],
      isShared: insertDocument.isShared ?? false
    }).returning();
    return document;
  }
  async updateDocument(id, updateData) {
    const [document] = await db.update(documents).set({ ...updateData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(documents.id, id)).returning();
    return document;
  }
  async deleteDocument(id) {
    await db.delete(documents).where(eq(documents.id, id));
  }
  async getDocumentFolders(companyId) {
    return await db.select().from(documentFolders).where(eq(documentFolders.companyId, companyId));
  }
  async createDocumentFolder(insertFolder) {
    const [folder] = await db.insert(documentFolders).values({
      ...insertFolder,
      parentId: insertFolder.parentId ?? null,
      ownerId: insertFolder.ownerId ?? null,
      companyId: insertFolder.companyId ?? null
    }).returning();
    return folder;
  }
  async updateDocumentFolder(id, updateData) {
    const [folder] = await db.update(documentFolders).set(updateData).where(eq(documentFolders.id, id)).returning();
    return folder;
  }
  async deleteDocumentFolder(id) {
    await db.delete(documentFolders).where(eq(documentFolders.id, id));
  }
  // Fleet Management
  async getVehicles(companyId) {
    return await db.select().from(vehicles).where(eq(vehicles.companyId, companyId));
  }
  async createVehicle(insertVehicle) {
    const [vehicle] = await db.insert(vehicles).values({
      ...insertVehicle,
      year: insertVehicle.year ?? null,
      licensePlate: insertVehicle.licensePlate ?? null,
      vin: insertVehicle.vin ?? null,
      driverId: insertVehicle.driverId ?? null,
      location: insertVehicle.location ?? null,
      nextServiceDate: insertVehicle.nextServiceDate ?? null,
      companyId: insertVehicle.companyId ?? null,
      status: insertVehicle.status ?? "active",
      mileage: insertVehicle.mileage ?? 0
    }).returning();
    return vehicle;
  }
  async updateVehicle(id, updateData) {
    const [vehicle] = await db.update(vehicles).set(updateData).where(eq(vehicles.id, id)).returning();
    return vehicle;
  }
  async deleteVehicle(id) {
    await db.delete(vehicles).where(eq(vehicles.id, id));
  }
  async getVehicleMaintenance(vehicleId) {
    return await db.select().from(vehicleMaintenance).where(eq(vehicleMaintenance.vehicleId, vehicleId));
  }
  async createVehicleMaintenance(insertMaintenance) {
    const [maintenance] = await db.insert(vehicleMaintenance).values({
      ...insertMaintenance,
      description: insertMaintenance.description ?? null,
      cost: insertMaintenance.cost ?? null,
      serviceDate: insertMaintenance.serviceDate ?? null,
      nextServiceDate: insertMaintenance.nextServiceDate ?? null,
      mechanicId: insertMaintenance.mechanicId ?? null,
      companyId: insertMaintenance.companyId ?? null,
      status: insertMaintenance.status ?? "scheduled"
    }).returning();
    return maintenance;
  }
  async updateVehicleMaintenance(id, updateData) {
    const [maintenance] = await db.update(vehicleMaintenance).set(updateData).where(eq(vehicleMaintenance.id, id)).returning();
    return maintenance;
  }
  async deleteVehicleMaintenance(id) {
    await db.delete(vehicleMaintenance).where(eq(vehicleMaintenance.id, id));
  }
  // Approvals
  async getApprovalRequests(companyId) {
    return await db.select().from(approvalRequests).where(eq(approvalRequests.companyId, companyId));
  }
  async createApprovalRequest(insertRequest) {
    const [request] = await db.insert(approvalRequests).values({
      ...insertRequest,
      description: insertRequest.description ?? null,
      amount: insertRequest.amount ?? null,
      requesterId: insertRequest.requesterId ?? null,
      companyId: insertRequest.companyId ?? null,
      status: insertRequest.status ?? "pending",
      priority: insertRequest.priority ?? "medium"
    }).returning();
    return request;
  }
  async updateApprovalRequest(id, updateData) {
    const [request] = await db.update(approvalRequests).set({ ...updateData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(approvalRequests.id, id)).returning();
    return request;
  }
  async deleteApprovalRequest(id) {
    await db.delete(approvalRequests).where(eq(approvalRequests.id, id));
  }
  async getApprovalWorkflows(requestId) {
    return await db.select().from(approvalWorkflows).where(eq(approvalWorkflows.requestId, requestId));
  }
  async createApprovalWorkflow(insertWorkflow) {
    const [workflow] = await db.insert(approvalWorkflows).values({
      ...insertWorkflow,
      comments: insertWorkflow.comments ?? null,
      actionDate: insertWorkflow.actionDate ?? null,
      companyId: insertWorkflow.companyId ?? null,
      status: insertWorkflow.status ?? "pending"
    }).returning();
    return workflow;
  }
  async updateApprovalWorkflow(id, updateData) {
    const [workflow] = await db.update(approvalWorkflows).set(updateData).where(eq(approvalWorkflows.id, id)).returning();
    return workflow;
  }
  async deleteApprovalWorkflow(id) {
    await db.delete(approvalWorkflows).where(eq(approvalWorkflows.id, id));
  }
  // Equipment & Maintenance
  async getEquipment(companyId) {
    return await db.select().from(equipment).where(eq(equipment.companyId, companyId));
  }
  async createEquipment(insertEquipment) {
    const [equipmentRecord] = await db.insert(equipment).values({
      ...insertEquipment,
      serialNumber: insertEquipment.serialNumber ?? null,
      category: insertEquipment.category ?? null,
      location: insertEquipment.location ?? null,
      purchaseDate: insertEquipment.purchaseDate ?? null,
      warrantyExpiry: insertEquipment.warrantyExpiry ?? null,
      companyId: insertEquipment.companyId ?? null,
      status: insertEquipment.status ?? "operational"
    }).returning();
    return equipmentRecord;
  }
  async updateEquipment(id, updateData) {
    const [equipmentRecord] = await db.update(equipment).set(updateData).where(eq(equipment.id, id)).returning();
    return equipmentRecord;
  }
  async deleteEquipment(id) {
    await db.delete(equipment).where(eq(equipment.id, id));
  }
  async getMaintenanceRequests(companyId) {
    return await db.select().from(maintenanceRequests).where(eq(maintenanceRequests.companyId, companyId));
  }
  async createMaintenanceRequest(insertRequest) {
    const [request] = await db.insert(maintenanceRequests).values({
      ...insertRequest,
      description: insertRequest.description ?? null,
      assignedTo: insertRequest.assignedTo ?? null,
      requesterId: insertRequest.requesterId ?? null,
      dueDate: insertRequest.dueDate ?? null,
      completedDate: insertRequest.completedDate ?? null,
      companyId: insertRequest.companyId ?? null,
      status: insertRequest.status ?? "pending",
      priority: insertRequest.priority ?? "medium"
    }).returning();
    return request;
  }
  async updateMaintenanceRequest(id, updateData) {
    const [request] = await db.update(maintenanceRequests).set({ ...updateData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(maintenanceRequests.id, id)).returning();
    return request;
  }
  async deleteMaintenanceRequest(id) {
    await db.delete(maintenanceRequests).where(eq(maintenanceRequests.id, id));
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
async function registerRoutes(app2) {
  const currentCompanyId = "default-company";
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user || !await storage.validatePassword(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      if (!user.isActive) {
        return res.status(401).json({ error: "Account is disabled" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json({
        user: userWithoutPassword,
        message: "Login successful"
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const user = await storage.createUser(validatedData);
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({
        user: userWithoutPassword,
        message: "Registration successful"
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });
  app2.get("/api/auth/me", async (req, res) => {
    try {
      const user = await storage.getUserByUsername("admin");
      if (!user) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });
  app2.get("/api/companies", async (req, res) => {
    try {
      const companies2 = await storage.getCompanies();
      res.json(companies2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });
  app2.post("/api/companies", async (req, res) => {
    try {
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(validatedData);
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ error: "Invalid company data" });
    }
  });
  app2.get("/api/users", async (req, res) => {
    try {
      const users2 = await storage.getUsers(currentCompanyId);
      res.json(users2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });
  app2.patch("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(id, validatedData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to update user" });
    }
  });
  app2.delete("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete user" });
    }
  });
  app2.get("/api/leads", async (req, res) => {
    try {
      const leads2 = await storage.getLeads(currentCompanyId);
      res.json(leads2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });
  app2.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(lead);
    } catch (error) {
      res.status(400).json({ error: "Invalid lead data" });
    }
  });
  app2.patch("/api/leads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertLeadSchema.partial().parse(req.body);
      const lead = await storage.updateLead(id, validatedData);
      res.json(lead);
    } catch (error) {
      res.status(400).json({ error: "Failed to update lead" });
    }
  });
  app2.delete("/api/leads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteLead(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete lead" });
    }
  });
  app2.get("/api/sales-orders", async (req, res) => {
    try {
      const salesOrders2 = await storage.getSalesOrders(currentCompanyId);
      res.json(salesOrders2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sales orders" });
    }
  });
  app2.post("/api/sales-orders", async (req, res) => {
    try {
      const validatedData = insertSalesOrderSchema.parse(req.body);
      const salesOrder = await storage.createSalesOrder({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(salesOrder);
    } catch (error) {
      res.status(400).json({ error: "Invalid sales order data" });
    }
  });
  app2.patch("/api/sales-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertSalesOrderSchema.partial().parse(req.body);
      const salesOrder = await storage.updateSalesOrder(id, validatedData);
      res.json(salesOrder);
    } catch (error) {
      res.status(400).json({ error: "Failed to update sales order" });
    }
  });
  app2.delete("/api/sales-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteSalesOrder(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete sales order" });
    }
  });
  app2.get("/api/employees", async (req, res) => {
    try {
      const employees2 = await storage.getEmployees(currentCompanyId);
      res.json(employees2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  });
  app2.post("/api/employees", async (req, res) => {
    try {
      const validatedData = insertEmployeeSchema.parse(req.body);
      const employee = await storage.createEmployee({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ error: "Invalid employee data" });
    }
  });
  app2.patch("/api/employees/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertEmployeeSchema.partial().parse(req.body);
      const employee = await storage.updateEmployee(id, validatedData);
      res.json(employee);
    } catch (error) {
      res.status(400).json({ error: "Failed to update employee" });
    }
  });
  app2.delete("/api/employees/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEmployee(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete employee" });
    }
  });
  app2.get("/api/dashboard/kpis", async (req, res) => {
    try {
      const opportunities2 = await storage.getOpportunities(currentCompanyId);
      const partners2 = await storage.getPartners(currentCompanyId);
      const products2 = await storage.getProducts(currentCompanyId);
      const totalRevenue = opportunities2.filter((opp) => opp.stage === "won").reduce((sum, opp) => sum + Number(opp.expectedRevenue || 0), 0);
      const kpis = {
        revenue: totalRevenue,
        customers: partners2.filter((p) => p.isCustomer).length,
        opportunities: opportunities2.filter((opp) => opp.stage !== "won" && opp.stage !== "lost").length,
        inventory: products2.reduce((sum, product) => sum + Number(product.cost || 0) * 10, 0)
        // Mock inventory calculation
      };
      res.json(kpis);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch KPIs" });
    }
  });
  app2.get("/api/opportunities", async (req, res) => {
    try {
      const opportunities2 = await storage.getOpportunities(currentCompanyId);
      res.json(opportunities2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch opportunities" });
    }
  });
  app2.post("/api/opportunities", async (req, res) => {
    try {
      const validatedData = insertOpportunitySchema.parse(req.body);
      const opportunity = await storage.createOpportunity({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(opportunity);
    } catch (error) {
      res.status(400).json({ error: "Invalid opportunity data" });
    }
  });
  app2.patch("/api/opportunities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertOpportunitySchema.partial().parse(req.body);
      const opportunity = await storage.updateOpportunity(id, validatedData);
      res.json(opportunity);
    } catch (error) {
      res.status(400).json({ error: "Failed to update opportunity" });
    }
  });
  app2.get("/api/partners", async (req, res) => {
    try {
      const partners2 = await storage.getPartners(currentCompanyId);
      res.json(partners2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch partners" });
    }
  });
  app2.post("/api/partners", async (req, res) => {
    try {
      const validatedData = insertPartnerSchema.parse(req.body);
      const partner = await storage.createPartner({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(partner);
    } catch (error) {
      res.status(400).json({ error: "Invalid partner data" });
    }
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const products2 = await storage.getProducts(currentCompanyId);
      res.json(products2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  app2.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });
  app2.get("/api/activities", async (req, res) => {
    try {
      const activities2 = await storage.getActivities(currentCompanyId);
      res.json(activities2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });
  app2.get("/api/purchase-orders", async (req, res) => {
    try {
      const orders = await storage.getPurchaseOrders(currentCompanyId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch purchase orders" });
    }
  });
  app2.post("/api/purchase-orders", async (req, res) => {
    try {
      const validatedData = insertPurchaseOrderSchema.parse(req.body);
      const order = await storage.createPurchaseOrder({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid purchase order data" });
    }
  });
  app2.patch("/api/purchase-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPurchaseOrderSchema.partial().parse(req.body);
      const order = await storage.updatePurchaseOrder(id, validatedData);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Failed to update purchase order" });
    }
  });
  app2.delete("/api/purchase-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePurchaseOrder(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete purchase order" });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const events2 = await storage.getEvents(currentCompanyId);
      res.json(events2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });
  app2.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event data" });
    }
  });
  app2.patch("/api/events/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(id, validatedData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Failed to update event" });
    }
  });
  app2.delete("/api/events/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEvent(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete event" });
    }
  });
  app2.get("/api/events/:eventId/registrations", async (req, res) => {
    try {
      const { eventId } = req.params;
      const registrations = await storage.getEventRegistrations(eventId);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event registrations" });
    }
  });
  app2.post("/api/events/:eventId/registrations", async (req, res) => {
    try {
      const { eventId } = req.params;
      const validatedData = insertEventRegistrationSchema.parse({ ...req.body, eventId });
      const registration = await storage.createEventRegistration({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(registration);
    } catch (error) {
      res.status(400).json({ error: "Invalid registration data" });
    }
  });
  app2.get("/api/documents", async (req, res) => {
    try {
      const documents2 = await storage.getDocuments(currentCompanyId);
      res.json(documents2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });
  app2.post("/api/documents", async (req, res) => {
    try {
      const validatedData = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ error: "Invalid document data" });
    }
  });
  app2.patch("/api/documents/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertDocumentSchema.partial().parse(req.body);
      const document = await storage.updateDocument(id, validatedData);
      res.json(document);
    } catch (error) {
      res.status(400).json({ error: "Failed to update document" });
    }
  });
  app2.delete("/api/documents/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteDocument(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete document" });
    }
  });
  app2.get("/api/document-folders", async (req, res) => {
    try {
      const folders = await storage.getDocumentFolders(currentCompanyId);
      res.json(folders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch folders" });
    }
  });
  app2.post("/api/document-folders", async (req, res) => {
    try {
      const validatedData = insertDocumentFolderSchema.parse(req.body);
      const folder = await storage.createDocumentFolder({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(folder);
    } catch (error) {
      res.status(400).json({ error: "Invalid folder data" });
    }
  });
  app2.get("/api/vehicles", async (req, res) => {
    try {
      const vehicles2 = await storage.getVehicles(currentCompanyId);
      res.json(vehicles2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  });
  app2.post("/api/vehicles", async (req, res) => {
    try {
      const validatedData = insertVehicleSchema.parse(req.body);
      const vehicle = await storage.createVehicle({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(400).json({ error: "Invalid vehicle data" });
    }
  });
  app2.patch("/api/vehicles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertVehicleSchema.partial().parse(req.body);
      const vehicle = await storage.updateVehicle(id, validatedData);
      res.json(vehicle);
    } catch (error) {
      res.status(400).json({ error: "Failed to update vehicle" });
    }
  });
  app2.delete("/api/vehicles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteVehicle(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete vehicle" });
    }
  });
  app2.get("/api/vehicles/:vehicleId/maintenance", async (req, res) => {
    try {
      const { vehicleId } = req.params;
      const maintenance = await storage.getVehicleMaintenance(vehicleId);
      res.json(maintenance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch maintenance records" });
    }
  });
  app2.post("/api/vehicles/:vehicleId/maintenance", async (req, res) => {
    try {
      const { vehicleId } = req.params;
      const validatedData = insertVehicleMaintenanceSchema.parse({ ...req.body, vehicleId });
      const maintenance = await storage.createVehicleMaintenance({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(maintenance);
    } catch (error) {
      res.status(400).json({ error: "Invalid maintenance data" });
    }
  });
  app2.get("/api/approval-requests", async (req, res) => {
    try {
      const requests = await storage.getApprovalRequests(currentCompanyId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch approval requests" });
    }
  });
  app2.post("/api/approval-requests", async (req, res) => {
    try {
      const validatedData = insertApprovalRequestSchema.parse(req.body);
      const request = await storage.createApprovalRequest({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid approval request data" });
    }
  });
  app2.patch("/api/approval-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertApprovalRequestSchema.partial().parse(req.body);
      const request = await storage.updateApprovalRequest(id, validatedData);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Failed to update approval request" });
    }
  });
  app2.delete("/api/approval-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteApprovalRequest(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete approval request" });
    }
  });
  app2.get("/api/equipment", async (req, res) => {
    try {
      const equipment2 = await storage.getEquipment(currentCompanyId);
      res.json(equipment2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch equipment" });
    }
  });
  app2.post("/api/equipment", async (req, res) => {
    try {
      const validatedData = insertEquipmentSchema.parse(req.body);
      const equipment2 = await storage.createEquipment({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(equipment2);
    } catch (error) {
      res.status(400).json({ error: "Invalid equipment data" });
    }
  });
  app2.patch("/api/equipment/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertEquipmentSchema.partial().parse(req.body);
      const equipment2 = await storage.updateEquipment(id, validatedData);
      res.json(equipment2);
    } catch (error) {
      res.status(400).json({ error: "Failed to update equipment" });
    }
  });
  app2.delete("/api/equipment/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEquipment(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete equipment" });
    }
  });
  app2.get("/api/maintenance-requests", async (req, res) => {
    try {
      const requests = await storage.getMaintenanceRequests(currentCompanyId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch maintenance requests" });
    }
  });
  app2.post("/api/maintenance-requests", async (req, res) => {
    try {
      const validatedData = insertMaintenanceRequestSchema.parse(req.body);
      const request = await storage.createMaintenanceRequest({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid maintenance request data" });
    }
  });
  app2.patch("/api/maintenance-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertMaintenanceRequestSchema.partial().parse(req.body);
      const request = await storage.updateMaintenanceRequest(id, validatedData);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Failed to update maintenance request" });
    }
  });
  app2.delete("/api/maintenance-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMaintenanceRequest(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete maintenance request" });
    }
  });
  app2.post("/api/activities", async (req, res) => {
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ error: "Invalid activity data" });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects2 = await storage.getProjects(currentCompanyId);
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });
  app2.get("/api/tasks", async (req, res) => {
    try {
      const tasks2 = await storage.getTasks(currentCompanyId);
      res.json(tasks2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });
  app2.post("/api/tasks", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: "Invalid task data" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
