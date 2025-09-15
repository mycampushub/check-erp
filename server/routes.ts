import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertLeadSchema, insertOpportunitySchema, insertPartnerSchema,
  insertProductSchema, insertSalesOrderSchema, insertProjectSchema,
  insertTaskSchema, insertEmployeeSchema, insertActivitySchema,
  insertPurchaseOrderSchema, insertEventSchema, insertEventRegistrationSchema,
  insertDocumentSchema, insertDocumentFolderSchema, insertVehicleSchema,
  insertVehicleMaintenanceSchema, insertApprovalRequestSchema, insertApprovalWorkflowSchema,
  insertEquipmentSchema, insertMaintenanceRequestSchema, insertUserSchema, insertCompanySchema,
  insertProductionOrderSchema, insertWorkOrderSchema, insertWorkCenterSchema,
  insertBillOfMaterialSchema, insertManufacturingOperationSchema
} from "@shared/schema";
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  const currentCompanyId = "default-company"; // In real app, this would come from session

  // Authentication endpoints
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || !(await storage.validatePassword(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (!user.isActive) {
        return res.status(401).json({ error: "Account is disabled" });
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        user: userWithoutPassword,
        message: "Login successful"
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const user = await storage.createUser(validatedData);
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(201).json({
        user: userWithoutPassword,
        message: "Registration successful"
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      // In a real app, this would get user from session/token
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

  // Companies endpoints
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });

  app.post("/api/companies", async (req, res) => {
    try {
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(validatedData);
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ error: "Invalid company data" });
    }
  });

  // Users endpoints
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers(currentCompanyId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(id, validatedData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete user" });
    }
  });

  // Leads endpoints
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads(currentCompanyId);
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.post("/api/leads", async (req, res) => {
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

  app.patch("/api/leads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertLeadSchema.partial().parse(req.body);
      const lead = await storage.updateLead(id, validatedData);
      res.json(lead);
    } catch (error) {
      res.status(400).json({ error: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteLead(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete lead" });
    }
  });

  // Sales Orders endpoints
  app.get("/api/sales-orders", async (req, res) => {
    try {
      const salesOrders = await storage.getSalesOrders(currentCompanyId);
      res.json(salesOrders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sales orders" });
    }
  });

  app.post("/api/sales-orders", async (req, res) => {
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

  app.patch("/api/sales-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertSalesOrderSchema.partial().parse(req.body);
      const salesOrder = await storage.updateSalesOrder(id, validatedData);
      res.json(salesOrder);
    } catch (error) {
      res.status(400).json({ error: "Failed to update sales order" });
    }
  });

  app.delete("/api/sales-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteSalesOrder(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete sales order" });
    }
  });

  // Employees endpoints
  app.get("/api/employees", async (req, res) => {
    try {
      const employees = await storage.getEmployees(currentCompanyId);
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  });

  app.post("/api/employees", async (req, res) => {
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

  app.patch("/api/employees/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertEmployeeSchema.partial().parse(req.body);
      const employee = await storage.updateEmployee(id, validatedData);
      res.json(employee);
    } catch (error) {
      res.status(400).json({ error: "Failed to update employee" });
    }
  });

  app.delete("/api/employees/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEmployee(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete employee" });
    }
  });

  // Dashboard endpoints
  app.get("/api/dashboard/kpis", async (req, res) => {
    try {
      const opportunities = await storage.getOpportunities(currentCompanyId);
      const partners = await storage.getPartners(currentCompanyId);
      const products = await storage.getProducts(currentCompanyId);
      
      const totalRevenue = opportunities
        .filter(opp => opp.stage === "won")
        .reduce((sum, opp) => sum + Number(opp.expectedRevenue || 0), 0);
      
      const kpis = {
        revenue: totalRevenue,
        customers: partners.filter(p => p.isCustomer).length,
        opportunities: opportunities.filter(opp => opp.stage !== "won" && opp.stage !== "lost").length,
        inventory: products.reduce((sum, product) => sum + Number(product.cost || 0) * 10, 0) // Mock inventory calculation
      };
      
      res.json(kpis);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch KPIs" });
    }
  });

  // Opportunities endpoints
  app.get("/api/opportunities", async (req, res) => {
    try {
      const opportunities = await storage.getOpportunities(currentCompanyId);
      res.json(opportunities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch opportunities" });
    }
  });

  app.post("/api/opportunities", async (req, res) => {
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

  app.patch("/api/opportunities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertOpportunitySchema.partial().parse(req.body);
      const opportunity = await storage.updateOpportunity(id, validatedData);
      res.json(opportunity);
    } catch (error) {
      res.status(400).json({ error: "Failed to update opportunity" });
    }
  });

  // Partners endpoints
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getPartners(currentCompanyId);
      res.json(partners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch partners" });
    }
  });

  app.post("/api/partners", async (req, res) => {
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

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts(currentCompanyId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/products", async (req, res) => {
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

  // Inventory endpoints
  app.get("/api/inventory", async (req, res) => {
    try {
      const inventory = await storage.getInventory(currentCompanyId);
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inventory" });
    }
  });

  app.post("/api/inventory", async (req, res) => {
    try {
      const inventory = await storage.createInventory({
        ...req.body,
        companyId: currentCompanyId
      });
      res.status(201).json(inventory);
    } catch (error) {
      res.status(400).json({ error: "Invalid inventory data" });
    }
  });

  app.patch("/api/inventory/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const inventory = await storage.updateInventory(id, req.body);
      res.json(inventory);
    } catch (error) {
      res.status(400).json({ error: "Failed to update inventory" });
    }
  });

  app.delete("/api/inventory/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteInventory(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete inventory" });
    }
  });

  // Activities endpoints
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities(currentCompanyId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  // Purchase Orders endpoints
  app.get("/api/purchase-orders", async (req, res) => {
    try {
      const orders = await storage.getPurchaseOrders(currentCompanyId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch purchase orders" });
    }
  });

  app.post("/api/purchase-orders", async (req, res) => {
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

  app.patch("/api/purchase-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPurchaseOrderSchema.partial().parse(req.body);
      const order = await storage.updatePurchaseOrder(id, validatedData);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Failed to update purchase order" });
    }
  });

  app.delete("/api/purchase-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePurchaseOrder(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete purchase order" });
    }
  });

  // Events endpoints
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents(currentCompanyId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.post("/api/events", async (req, res) => {
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

  app.patch("/api/events/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(id, validatedData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Failed to update event" });
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEvent(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete event" });
    }
  });

  // Event Registrations endpoints
  app.get("/api/events/:eventId/registrations", async (req, res) => {
    try {
      const { eventId } = req.params;
      const registrations = await storage.getEventRegistrations(eventId);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event registrations" });
    }
  });

  app.post("/api/events/:eventId/registrations", async (req, res) => {
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

  // Documents endpoints
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getDocuments(currentCompanyId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.post("/api/documents", async (req, res) => {
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

  app.patch("/api/documents/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertDocumentSchema.partial().parse(req.body);
      const document = await storage.updateDocument(id, validatedData);
      res.json(document);
    } catch (error) {
      res.status(400).json({ error: "Failed to update document" });
    }
  });

  app.delete("/api/documents/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteDocument(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete document" });
    }
  });

  // Document Folders endpoints
  app.get("/api/document-folders", async (req, res) => {
    try {
      const folders = await storage.getDocumentFolders(currentCompanyId);
      res.json(folders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch folders" });
    }
  });

  app.post("/api/document-folders", async (req, res) => {
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

  // Fleet endpoints
  app.get("/api/vehicles", async (req, res) => {
    try {
      const vehicles = await storage.getVehicles(currentCompanyId);
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  });

  app.post("/api/vehicles", async (req, res) => {
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

  app.patch("/api/vehicles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertVehicleSchema.partial().parse(req.body);
      const vehicle = await storage.updateVehicle(id, validatedData);
      res.json(vehicle);
    } catch (error) {
      res.status(400).json({ error: "Failed to update vehicle" });
    }
  });

  app.delete("/api/vehicles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteVehicle(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete vehicle" });
    }
  });

  // Vehicle Maintenance endpoints
  app.get("/api/vehicles/:vehicleId/maintenance", async (req, res) => {
    try {
      const { vehicleId } = req.params;
      const maintenance = await storage.getVehicleMaintenance(vehicleId);
      res.json(maintenance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch maintenance records" });
    }
  });

  app.post("/api/vehicles/:vehicleId/maintenance", async (req, res) => {
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

  // Approval Requests endpoints
  app.get("/api/approval-requests", async (req, res) => {
    try {
      const requests = await storage.getApprovalRequests(currentCompanyId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch approval requests" });
    }
  });

  app.post("/api/approval-requests", async (req, res) => {
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

  app.patch("/api/approval-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertApprovalRequestSchema.partial().parse(req.body);
      const request = await storage.updateApprovalRequest(id, validatedData);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Failed to update approval request" });
    }
  });

  app.delete("/api/approval-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteApprovalRequest(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete approval request" });
    }
  });

  // Equipment endpoints
  app.get("/api/equipment", async (req, res) => {
    try {
      const equipment = await storage.getEquipment(currentCompanyId);
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch equipment" });
    }
  });

  app.post("/api/equipment", async (req, res) => {
    try {
      const validatedData = insertEquipmentSchema.parse(req.body);
      const equipment = await storage.createEquipment({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(equipment);
    } catch (error) {
      res.status(400).json({ error: "Invalid equipment data" });
    }
  });

  app.patch("/api/equipment/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertEquipmentSchema.partial().parse(req.body);
      const equipment = await storage.updateEquipment(id, validatedData);
      res.json(equipment);
    } catch (error) {
      res.status(400).json({ error: "Failed to update equipment" });
    }
  });

  app.delete("/api/equipment/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteEquipment(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete equipment" });
    }
  });

  // Maintenance Requests endpoints
  app.get("/api/maintenance-requests", async (req, res) => {
    try {
      const requests = await storage.getMaintenanceRequests(currentCompanyId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch maintenance requests" });
    }
  });

  app.post("/api/maintenance-requests", async (req, res) => {
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

  app.patch("/api/maintenance-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertMaintenanceRequestSchema.partial().parse(req.body);
      const request = await storage.updateMaintenanceRequest(id, validatedData);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Failed to update maintenance request" });
    }
  });

  app.delete("/api/maintenance-requests/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMaintenanceRequest(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete maintenance request" });
    }
  });

  app.post("/api/activities", async (req, res) => {
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

  // Projects endpoints
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects(currentCompanyId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
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

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.updateProject(id, req.body);
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete project" });
    }
  });

  // Tasks endpoints
  app.get("/api/tasks", async (req, res) => {
    try {
      const tasks = await storage.getTasks(currentCompanyId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
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

  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await storage.updateTask(id, req.body);
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete task" });
    }
  });

  // Manufacturing endpoints
  app.get("/api/production-orders", async (req, res) => {
    try {
      const orders = await storage.getProductionOrders(currentCompanyId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch production orders" });
    }
  });

  app.post("/api/production-orders", async (req, res) => {
    try {
      const validatedData = insertProductionOrderSchema.parse(req.body);
      const order = await storage.createProductionOrder({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid production order data" });
    }
  });

  app.patch("/api/production-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertProductionOrderSchema.partial().parse(req.body);
      const order = await storage.updateProductionOrder(id, validatedData);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Failed to update production order" });
    }
  });

  app.delete("/api/production-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProductionOrder(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete production order" });
    }
  });

  app.get("/api/work-orders", async (req, res) => {
    try {
      const orders = await storage.getWorkOrders(currentCompanyId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch work orders" });
    }
  });

  app.post("/api/work-orders", async (req, res) => {
    try {
      const validatedData = insertWorkOrderSchema.parse(req.body);
      const order = await storage.createWorkOrder({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid work order data" });
    }
  });

  app.patch("/api/work-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertWorkOrderSchema.partial().parse(req.body);
      const order = await storage.updateWorkOrder(id, validatedData);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Failed to update work order" });
    }
  });

  app.delete("/api/work-orders/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteWorkOrder(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete work order" });
    }
  });

  app.get("/api/work-centers", async (req, res) => {
    try {
      const centers = await storage.getWorkCenters(currentCompanyId);
      res.json(centers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch work centers" });
    }
  });

  app.post("/api/work-centers", async (req, res) => {
    try {
      const validatedData = insertWorkCenterSchema.parse(req.body);
      const center = await storage.createWorkCenter({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(center);
    } catch (error) {
      res.status(400).json({ error: "Invalid work center data" });
    }
  });

  app.patch("/api/work-centers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertWorkCenterSchema.partial().parse(req.body);
      const center = await storage.updateWorkCenter(id, validatedData);
      res.json(center);
    } catch (error) {
      res.status(400).json({ error: "Failed to update work center" });
    }
  });

  app.delete("/api/work-centers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteWorkCenter(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete work center" });
    }
  });

  app.get("/api/bill-of-materials", async (req, res) => {
    try {
      const boms = await storage.getBillOfMaterials(currentCompanyId);
      res.json(boms);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bill of materials" });
    }
  });

  app.post("/api/bill-of-materials", async (req, res) => {
    try {
      const validatedData = insertBillOfMaterialSchema.parse(req.body);
      const bom = await storage.createBillOfMaterial({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(bom);
    } catch (error) {
      res.status(400).json({ error: "Invalid bill of material data" });
    }
  });

  app.patch("/api/bill-of-materials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBillOfMaterialSchema.partial().parse(req.body);
      const bom = await storage.updateBillOfMaterial(id, validatedData);
      res.json(bom);
    } catch (error) {
      res.status(400).json({ error: "Failed to update bill of material" });
    }
  });

  app.delete("/api/bill-of-materials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBillOfMaterial(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete bill of material" });
    }
  });

  app.get("/api/manufacturing-operations", async (req, res) => {
    try {
      const operations = await storage.getManufacturingOperations(currentCompanyId);
      res.json(operations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch manufacturing operations" });
    }
  });

  app.post("/api/manufacturing-operations", async (req, res) => {
    try {
      const validatedData = insertManufacturingOperationSchema.parse(req.body);
      const operation = await storage.createManufacturingOperation({
        ...validatedData,
        companyId: currentCompanyId
      });
      res.status(201).json(operation);
    } catch (error) {
      res.status(400).json({ error: "Invalid manufacturing operation data" });
    }
  });

  app.patch("/api/manufacturing-operations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertManufacturingOperationSchema.partial().parse(req.body);
      const operation = await storage.updateManufacturingOperation(id, validatedData);
      res.json(operation);
    } catch (error) {
      res.status(400).json({ error: "Failed to update manufacturing operation" });
    }
  });

  app.delete("/api/manufacturing-operations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteManufacturingOperation(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete manufacturing operation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
