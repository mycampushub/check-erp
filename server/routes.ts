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
  insertEquipmentSchema, insertMaintenanceRequestSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const currentCompanyId = "default-company"; // In real app, this would come from session

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

  const httpServer = createServer(app);
  return httpServer;
}
