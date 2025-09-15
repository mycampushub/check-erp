import { 
  type User, type InsertUser, type Company, type InsertCompany,
  type Lead, type InsertLead, type Opportunity, type InsertOpportunity,
  type Partner, type InsertPartner, type Product, type InsertProduct,
  type SalesOrder, type InsertSalesOrder, type Project, type InsertProject,
  type Task, type InsertTask, type Employee, type InsertEmployee,
  type Activity, type InsertActivity, type PurchaseOrder, type InsertPurchaseOrder,
  type Event, type InsertEvent, type EventRegistration, type InsertEventRegistration,
  type Document, type InsertDocument, type DocumentFolder, type InsertDocumentFolder,
  type Vehicle, type InsertVehicle, type VehicleMaintenance, type InsertVehicleMaintenance,
  type ApprovalRequest, type InsertApprovalRequest, type ApprovalWorkflow, type InsertApprovalWorkflow,
  type Equipment, type InsertEquipment, type MaintenanceRequest, type InsertMaintenanceRequest,
  companies, users, leads, opportunities, partners, products,
  salesOrders, projects, tasks, employees, activities, purchaseOrders,
  events, eventRegistrations, documents, documentFolders, vehicles, vehicleMaintenance,
  approvalRequests, approvalWorkflows, equipment, maintenanceRequests
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // Users and Companies
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getUsers(companyId: string): Promise<User[]>;
  getCompany(id: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: string, company: Partial<InsertCompany>): Promise<Company>;
  deleteCompany(id: string): Promise<void>;
  getCompanies(): Promise<Company[]>;
  
  // CRM
  getLeads(companyId: string): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead>;
  deleteLead(id: string): Promise<void>;
  getOpportunities(companyId: string): Promise<Opportunity[]>;
  createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity>;
  updateOpportunity(id: string, opportunity: Partial<InsertOpportunity>): Promise<Opportunity>;
  deleteOpportunity(id: string): Promise<void>;
  
  // Partners
  getPartners(companyId: string): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  updatePartner(id: string, partner: Partial<InsertPartner>): Promise<Partner>;
  deletePartner(id: string): Promise<void>;
  
  // Products
  getProducts(companyId: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  
  // Sales
  getSalesOrders(companyId: string): Promise<SalesOrder[]>;
  createSalesOrder(order: InsertSalesOrder): Promise<SalesOrder>;
  updateSalesOrder(id: string, order: Partial<InsertSalesOrder>): Promise<SalesOrder>;
  deleteSalesOrder(id: string): Promise<void>;
  
  // Projects
  getProjects(companyId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  getTasks(companyId: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<InsertTask>): Promise<Task>;
  deleteTask(id: string): Promise<void>;
  
  // HR
  getEmployees(companyId: string): Promise<Employee[]>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, employee: Partial<InsertEmployee>): Promise<Employee>;
  deleteEmployee(id: string): Promise<void>;
  
  // Activities
  getActivities(companyId: string): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: string, activity: Partial<InsertActivity>): Promise<Activity>;
  deleteActivity(id: string): Promise<void>;

  // Purchase Orders
  getPurchaseOrders(companyId: string): Promise<PurchaseOrder[]>;
  createPurchaseOrder(order: InsertPurchaseOrder): Promise<PurchaseOrder>;
  updatePurchaseOrder(id: string, order: Partial<InsertPurchaseOrder>): Promise<PurchaseOrder>;
  deletePurchaseOrder(id: string): Promise<void>;

  // Events
  getEvents(companyId: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  getEventRegistrations(eventId: string): Promise<EventRegistration[]>;
  createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration>;
  updateEventRegistration(id: string, registration: Partial<InsertEventRegistration>): Promise<EventRegistration>;
  deleteEventRegistration(id: string): Promise<void>;

  // Documents
  getDocuments(companyId: string): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: string, document: Partial<InsertDocument>): Promise<Document>;
  deleteDocument(id: string): Promise<void>;
  getDocumentFolders(companyId: string): Promise<DocumentFolder[]>;
  createDocumentFolder(folder: InsertDocumentFolder): Promise<DocumentFolder>;
  updateDocumentFolder(id: string, folder: Partial<InsertDocumentFolder>): Promise<DocumentFolder>;
  deleteDocumentFolder(id: string): Promise<void>;

  // Fleet Management
  getVehicles(companyId: string): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, vehicle: Partial<InsertVehicle>): Promise<Vehicle>;
  deleteVehicle(id: string): Promise<void>;
  getVehicleMaintenance(vehicleId: string): Promise<VehicleMaintenance[]>;
  createVehicleMaintenance(maintenance: InsertVehicleMaintenance): Promise<VehicleMaintenance>;
  updateVehicleMaintenance(id: string, maintenance: Partial<InsertVehicleMaintenance>): Promise<VehicleMaintenance>;
  deleteVehicleMaintenance(id: string): Promise<void>;

  // Approvals
  getApprovalRequests(companyId: string): Promise<ApprovalRequest[]>;
  createApprovalRequest(request: InsertApprovalRequest): Promise<ApprovalRequest>;
  updateApprovalRequest(id: string, request: Partial<InsertApprovalRequest>): Promise<ApprovalRequest>;
  deleteApprovalRequest(id: string): Promise<void>;
  getApprovalWorkflows(requestId: string): Promise<ApprovalWorkflow[]>;
  createApprovalWorkflow(workflow: InsertApprovalWorkflow): Promise<ApprovalWorkflow>;
  updateApprovalWorkflow(id: string, workflow: Partial<InsertApprovalWorkflow>): Promise<ApprovalWorkflow>;
  deleteApprovalWorkflow(id: string): Promise<void>;

  // Equipment & Maintenance
  getEquipment(companyId: string): Promise<Equipment[]>;
  createEquipment(equipment: InsertEquipment): Promise<Equipment>;
  updateEquipment(id: string, equipment: Partial<InsertEquipment>): Promise<Equipment>;
  deleteEquipment(id: string): Promise<void>;
  getMaintenanceRequests(companyId: string): Promise<MaintenanceRequest[]>;
  createMaintenanceRequest(request: InsertMaintenanceRequest): Promise<MaintenanceRequest>;
  updateMaintenanceRequest(id: string, request: Partial<InsertMaintenanceRequest>): Promise<MaintenanceRequest>;
  deleteMaintenanceRequest(id: string): Promise<void>;

  // Auth helpers
  validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    try {
      // Check if default company exists
      const existingCompany = await db.select().from(companies).where(eq(companies.id, "default-company")).limit(1);
      
      if (existingCompany.length === 0) {
        // Create default company
        await db.insert(companies).values({
          id: "default-company",
          name: "Demo Company",
          currency: "USD",
          timezone: "UTC",
          country: "United States",
          settings: {}
        });
      }

      // Check if default admin user exists
      const existingAdmin = await db.select().from(users).where(eq(users.username, "admin")).limit(1);
      
      if (existingAdmin.length === 0) {
        // Create default admin user
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
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash password before storing
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

  async updateUser(id: string, updateData: Partial<InsertUser>): Promise<User> {
    // Hash password if being updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    
    const [user] = await db.update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async getUsers(companyId: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.companyId, companyId));
  }

  async getCompany(id: string): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id)).limit(1);
    return company;
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await db.insert(companies).values({
      ...insertCompany,
      country: insertCompany.country ?? null,
      currency: insertCompany.currency ?? "USD",
      timezone: insertCompany.timezone ?? "UTC",
      settings: insertCompany.settings ?? {}
    }).returning();
    return company;
  }

  async updateCompany(id: string, updateData: Partial<InsertCompany>): Promise<Company> {
    const [company] = await db.update(companies)
      .set(updateData)
      .where(eq(companies.id, id))
      .returning();
    return company;
  }

  async deleteCompany(id: string): Promise<void> {
    await db.delete(companies).where(eq(companies.id, id));
  }

  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies);
  }

  // CRM
  async getLeads(companyId: string): Promise<Lead[]> {
    return await db.select().from(leads).where(eq(leads.companyId, companyId));
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
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

  async updateLead(id: string, updateData: Partial<InsertLead>): Promise<Lead> {
    const [lead] = await db.update(leads)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return lead;
  }

  async deleteLead(id: string): Promise<void> {
    await db.delete(leads).where(eq(leads.id, id));
  }

  async getOpportunities(companyId: string): Promise<Opportunity[]> {
    return await db.select().from(opportunities).where(eq(opportunities.companyId, companyId));
  }

  async createOpportunity(insertOpportunity: InsertOpportunity): Promise<Opportunity> {
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

  async updateOpportunity(id: string, updateData: Partial<InsertOpportunity>): Promise<Opportunity> {
    const [opportunity] = await db.update(opportunities)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(opportunities.id, id))
      .returning();
    return opportunity;
  }

  async deleteOpportunity(id: string): Promise<void> {
    await db.delete(opportunities).where(eq(opportunities.id, id));
  }

  // Partners
  async getPartners(companyId: string): Promise<Partner[]> {
    return await db.select().from(partners).where(eq(partners.companyId, companyId));
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
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

  async updatePartner(id: string, updateData: Partial<InsertPartner>): Promise<Partner> {
    const [partner] = await db.update(partners)
      .set(updateData)
      .where(eq(partners.id, id))
      .returning();
    return partner;
  }

  async deletePartner(id: string): Promise<void> {
    await db.delete(partners).where(eq(partners.id, id));
  }

  // Products
  async getProducts(companyId: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.companyId, companyId));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
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

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product> {
    const [product] = await db.update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Sales
  async getSalesOrders(companyId: string): Promise<SalesOrder[]> {
    return await db.select().from(salesOrders).where(eq(salesOrders.companyId, companyId));
  }

  async createSalesOrder(insertSalesOrder: InsertSalesOrder): Promise<SalesOrder> {
    const [order] = await db.insert(salesOrders).values({
      ...insertSalesOrder,
      partnerId: insertSalesOrder.partnerId ?? null,
      deliveryDate: insertSalesOrder.deliveryDate ?? null,
      salespersonId: insertSalesOrder.salespersonId ?? null,
      companyId: insertSalesOrder.companyId ?? null,
      state: insertSalesOrder.state ?? "draft",
      totalAmount: insertSalesOrder.totalAmount ?? "0",
      currency: insertSalesOrder.currency ?? "USD",
      orderDate: insertSalesOrder.orderDate ?? new Date()
    }).returning();
    return order;
  }

  async updateSalesOrder(id: string, updateData: Partial<InsertSalesOrder>): Promise<SalesOrder> {
    const [order] = await db.update(salesOrders)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(salesOrders.id, id))
      .returning();
    return order;
  }

  async deleteSalesOrder(id: string): Promise<void> {
    await db.delete(salesOrders).where(eq(salesOrders.id, id));
  }

  // Projects
  async getProjects(companyId: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.companyId, companyId));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
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

  async updateProject(id: string, updateData: Partial<InsertProject>): Promise<Project> {
    const [project] = await db.update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async getTasks(companyId: string): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.companyId, companyId));
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
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

  async updateTask(id: string, updateData: Partial<InsertTask>): Promise<Task> {
    const [task] = await db.update(tasks)
      .set(updateData)
      .where(eq(tasks.id, id))
      .returning();
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await db.delete(tasks).where(eq(tasks.id, id));
  }

  // HR
  async getEmployees(companyId: string): Promise<Employee[]> {
    return await db.select().from(employees).where(eq(employees.companyId, companyId));
  }

  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
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

  async updateEmployee(id: string, updateData: Partial<InsertEmployee>): Promise<Employee> {
    const [employee] = await db.update(employees)
      .set(updateData)
      .where(eq(employees.id, id))
      .returning();
    return employee;
  }

  async deleteEmployee(id: string): Promise<void> {
    await db.delete(employees).where(eq(employees.id, id));
  }

  // Activities
  async getActivities(companyId: string): Promise<Activity[]> {
    return await db.select().from(activities).where(eq(activities.companyId, companyId));
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
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

  async updateActivity(id: string, updateData: Partial<InsertActivity>): Promise<Activity> {
    const [activity] = await db.update(activities)
      .set(updateData)
      .where(eq(activities.id, id))
      .returning();
    return activity;
  }

  async deleteActivity(id: string): Promise<void> {
    await db.delete(activities).where(eq(activities.id, id));
  }

  // Purchase Orders
  async getPurchaseOrders(companyId: string): Promise<PurchaseOrder[]> {
    return await db.select().from(purchaseOrders).where(eq(purchaseOrders.companyId, companyId));
  }

  async createPurchaseOrder(insertPurchaseOrder: InsertPurchaseOrder): Promise<PurchaseOrder> {
    const [order] = await db.insert(purchaseOrders).values({
      ...insertPurchaseOrder,
      vendorId: insertPurchaseOrder.vendorId ?? null,
      receiptDate: insertPurchaseOrder.receiptDate ?? null,
      companyId: insertPurchaseOrder.companyId ?? null,
      state: insertPurchaseOrder.state ?? "draft",
      totalAmount: insertPurchaseOrder.totalAmount ?? "0",
      currency: insertPurchaseOrder.currency ?? "USD",
      orderDate: insertPurchaseOrder.orderDate ?? new Date()
    }).returning();
    return order;
  }

  async updatePurchaseOrder(id: string, updateData: Partial<InsertPurchaseOrder>): Promise<PurchaseOrder> {
    const [order] = await db.update(purchaseOrders)
      .set(updateData)
      .where(eq(purchaseOrders.id, id))
      .returning();
    return order;
  }

  async deletePurchaseOrder(id: string): Promise<void> {
    await db.delete(purchaseOrders).where(eq(purchaseOrders.id, id));
  }

  // Events
  async getEvents(companyId: string): Promise<Event[]> {
    return await db.select().from(events).where(eq(events.companyId, companyId));
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
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

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event> {
    const [event] = await db.update(events)
      .set(updateData)
      .where(eq(events.id, id))
      .returning();
    return event;
  }

  async deleteEvent(id: string): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  async getEventRegistrations(eventId: string): Promise<EventRegistration[]> {
    return await db.select().from(eventRegistrations).where(eq(eventRegistrations.eventId, eventId));
  }

  async createEventRegistration(insertRegistration: InsertEventRegistration): Promise<EventRegistration> {
    const [registration] = await db.insert(eventRegistrations).values({
      ...insertRegistration,
      companyId: insertRegistration.companyId ?? null,
      status: insertRegistration.status ?? "confirmed",
      registrationDate: insertRegistration.registrationDate ?? new Date()
    }).returning();
    return registration;
  }

  async updateEventRegistration(id: string, updateData: Partial<InsertEventRegistration>): Promise<EventRegistration> {
    const [registration] = await db.update(eventRegistrations)
      .set(updateData)
      .where(eq(eventRegistrations.id, id))
      .returning();
    return registration;
  }

  async deleteEventRegistration(id: string): Promise<void> {
    await db.delete(eventRegistrations).where(eq(eventRegistrations.id, id));
  }

  // Documents
  async getDocuments(companyId: string): Promise<Document[]> {
    return await db.select().from(documents).where(eq(documents.companyId, companyId));
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
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

  async updateDocument(id: string, updateData: Partial<InsertDocument>): Promise<Document> {
    const [document] = await db.update(documents)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(documents.id, id))
      .returning();
    return document;
  }

  async deleteDocument(id: string): Promise<void> {
    await db.delete(documents).where(eq(documents.id, id));
  }

  async getDocumentFolders(companyId: string): Promise<DocumentFolder[]> {
    return await db.select().from(documentFolders).where(eq(documentFolders.companyId, companyId));
  }

  async createDocumentFolder(insertFolder: InsertDocumentFolder): Promise<DocumentFolder> {
    const [folder] = await db.insert(documentFolders).values({
      ...insertFolder,
      parentId: insertFolder.parentId ?? null,
      ownerId: insertFolder.ownerId ?? null,
      companyId: insertFolder.companyId ?? null
    }).returning();
    return folder;
  }

  async updateDocumentFolder(id: string, updateData: Partial<InsertDocumentFolder>): Promise<DocumentFolder> {
    const [folder] = await db.update(documentFolders)
      .set(updateData)
      .where(eq(documentFolders.id, id))
      .returning();
    return folder;
  }

  async deleteDocumentFolder(id: string): Promise<void> {
    await db.delete(documentFolders).where(eq(documentFolders.id, id));
  }

  // Fleet Management
  async getVehicles(companyId: string): Promise<Vehicle[]> {
    return await db.select().from(vehicles).where(eq(vehicles.companyId, companyId));
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
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

  async updateVehicle(id: string, updateData: Partial<InsertVehicle>): Promise<Vehicle> {
    const [vehicle] = await db.update(vehicles)
      .set(updateData)
      .where(eq(vehicles.id, id))
      .returning();
    return vehicle;
  }

  async deleteVehicle(id: string): Promise<void> {
    await db.delete(vehicles).where(eq(vehicles.id, id));
  }

  async getVehicleMaintenance(vehicleId: string): Promise<VehicleMaintenance[]> {
    return await db.select().from(vehicleMaintenance).where(eq(vehicleMaintenance.vehicleId, vehicleId));
  }

  async createVehicleMaintenance(insertMaintenance: InsertVehicleMaintenance): Promise<VehicleMaintenance> {
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

  async updateVehicleMaintenance(id: string, updateData: Partial<InsertVehicleMaintenance>): Promise<VehicleMaintenance> {
    const [maintenance] = await db.update(vehicleMaintenance)
      .set(updateData)
      .where(eq(vehicleMaintenance.id, id))
      .returning();
    return maintenance;
  }

  async deleteVehicleMaintenance(id: string): Promise<void> {
    await db.delete(vehicleMaintenance).where(eq(vehicleMaintenance.id, id));
  }

  // Approvals
  async getApprovalRequests(companyId: string): Promise<ApprovalRequest[]> {
    return await db.select().from(approvalRequests).where(eq(approvalRequests.companyId, companyId));
  }

  async createApprovalRequest(insertRequest: InsertApprovalRequest): Promise<ApprovalRequest> {
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

  async updateApprovalRequest(id: string, updateData: Partial<InsertApprovalRequest>): Promise<ApprovalRequest> {
    const [request] = await db.update(approvalRequests)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(approvalRequests.id, id))
      .returning();
    return request;
  }

  async deleteApprovalRequest(id: string): Promise<void> {
    await db.delete(approvalRequests).where(eq(approvalRequests.id, id));
  }

  async getApprovalWorkflows(requestId: string): Promise<ApprovalWorkflow[]> {
    return await db.select().from(approvalWorkflows).where(eq(approvalWorkflows.requestId, requestId));
  }

  async createApprovalWorkflow(insertWorkflow: InsertApprovalWorkflow): Promise<ApprovalWorkflow> {
    const [workflow] = await db.insert(approvalWorkflows).values({
      ...insertWorkflow,
      comments: insertWorkflow.comments ?? null,
      actionDate: insertWorkflow.actionDate ?? null,
      companyId: insertWorkflow.companyId ?? null,
      status: insertWorkflow.status ?? "pending"
    }).returning();
    return workflow;
  }

  async updateApprovalWorkflow(id: string, updateData: Partial<InsertApprovalWorkflow>): Promise<ApprovalWorkflow> {
    const [workflow] = await db.update(approvalWorkflows)
      .set(updateData)
      .where(eq(approvalWorkflows.id, id))
      .returning();
    return workflow;
  }

  async deleteApprovalWorkflow(id: string): Promise<void> {
    await db.delete(approvalWorkflows).where(eq(approvalWorkflows.id, id));
  }

  // Equipment & Maintenance
  async getEquipment(companyId: string): Promise<Equipment[]> {
    return await db.select().from(equipment).where(eq(equipment.companyId, companyId));
  }

  async createEquipment(insertEquipment: InsertEquipment): Promise<Equipment> {
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

  async updateEquipment(id: string, updateData: Partial<InsertEquipment>): Promise<Equipment> {
    const [equipmentRecord] = await db.update(equipment)
      .set(updateData)
      .where(eq(equipment.id, id))
      .returning();
    return equipmentRecord;
  }

  async deleteEquipment(id: string): Promise<void> {
    await db.delete(equipment).where(eq(equipment.id, id));
  }

  async getMaintenanceRequests(companyId: string): Promise<MaintenanceRequest[]> {
    return await db.select().from(maintenanceRequests).where(eq(maintenanceRequests.companyId, companyId));
  }

  async createMaintenanceRequest(insertRequest: InsertMaintenanceRequest): Promise<MaintenanceRequest> {
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

  async updateMaintenanceRequest(id: string, updateData: Partial<InsertMaintenanceRequest>): Promise<MaintenanceRequest> {
    const [request] = await db.update(maintenanceRequests)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(maintenanceRequests.id, id))
      .returning();
    return request;
  }

  async deleteMaintenanceRequest(id: string): Promise<void> {
    await db.delete(maintenanceRequests).where(eq(maintenanceRequests.id, id));
  }
}

export const storage = new DatabaseStorage();