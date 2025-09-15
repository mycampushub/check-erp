// Odoo module definitions
export const ODOO_MODULES = {
  DASHBOARD: { id: "dashboard", name: "Dashboard", path: "/" },
  SALES: { id: "sales", name: "Sales", path: "/sales" },
  CRM: { id: "crm", name: "CRM", path: "/crm" },
  INVENTORY: { id: "inventory", name: "Inventory", path: "/inventory" },
  ACCOUNTING: { id: "accounting", name: "Accounting", path: "/accounting" },
  HR: { id: "hr", name: "Human Resources", path: "/hr" },
  PROJECT: { id: "project", name: "Project Management", path: "/project" },
  MANUFACTURING: { id: "manufacturing", name: "Manufacturing", path: "/manufacturing" },
  PURCHASE: { id: "purchase", name: "Purchase", path: "/purchase" },
  WEBSITE: { id: "website", name: "Website", path: "/website" },
  ECOMMERCE: { id: "ecommerce", name: "eCommerce", path: "/ecommerce" },
  POS: { id: "pos", name: "Point of Sale", path: "/pos" },
  MARKETING: { id: "marketing", name: "Marketing", path: "/marketing" },
  EVENTS: { id: "events", name: "Events", path: "/events" },
  HELPDESK: { id: "helpdesk", name: "Helpdesk", path: "/helpdesk" },
  KNOWLEDGE: { id: "knowledge", name: "Knowledge", path: "/knowledge" },
  DOCUMENTS: { id: "documents", name: "Documents", path: "/documents" },
  SURVEYS: { id: "surveys", name: "Surveys", path: "/surveys" },
  SOCIAL: { id: "social", name: "Social Marketing", path: "/social" },
  EMAIL: { id: "email", name: "Email Marketing", path: "/email" },
  SMS: { id: "sms", name: "SMS Marketing", path: "/sms" },
  APPROVALS: { id: "approvals", name: "Approvals", path: "/approvals" },
  FLEET: { id: "fleet", name: "Fleet", path: "/fleet" },
  MAINTENANCE: { id: "maintenance", name: "Maintenance", path: "/maintenance" },
  QUALITY: { id: "quality", name: "Quality", path: "/quality" },
  PLM: { id: "plm", name: "PLM", path: "/plm" },
  BARCODE: { id: "barcode", name: "Barcode", path: "/barcode" },
  IOT: { id: "iot", name: "IoT", path: "/iot" },
  STUDIO: { id: "studio", name: "Studio", path: "/studio" },
} as const;

// View types
export const VIEW_TYPES = {
  LIST: "list",
  FORM: "form",
  KANBAN: "kanban",
  CALENDAR: "calendar",
  PIVOT: "pivot",
  GRAPH: "graph",
  MAP: "map",
  GANTT: "gantt",
  ACTIVITY: "activity",
} as const;

// Record states
export const RECORD_STATES = {
  DRAFT: "draft",
  SENT: "sent",
  CONFIRMED: "confirmed",
  DONE: "done",
  CANCELLED: "cancel",
} as const;

// CRM stages
export const CRM_STAGES = {
  NEW: "new",
  QUALIFIED: "qualified",
  PROPOSITION: "proposition",
  WON: "won",
  LOST: "lost",
} as const;

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: "low",
  NORMAL: "normal",
  HIGH: "high",
  URGENT: "urgent",
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MANAGER: "manager",
  EMPLOYEE: "employee",
} as const;

// Activity types
export const ACTIVITY_TYPES = {
  CALL: "call",
  MEETING: "meeting",
  EMAIL: "email",
  TASK: "task",
  NOTE: "note",
} as const;

// Currencies
export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
] as const;

// Countries
export const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" },
] as const;

// Timezones
export const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
] as const;

// Product types
export const PRODUCT_TYPES = {
  STORABLE: "storable",
  CONSUMABLE: "consumable",
  SERVICE: "service",
} as const;

// Default settings
export const DEFAULT_SETTINGS = {
  COMPANY_NAME: "Demo Company",
  CURRENCY: "USD",
  TIMEZONE: "UTC",
  DATE_FORMAT: "MM/DD/YYYY",
  TIME_FORMAT: "12h",
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  ODOO_DATA: "odoo_demo_data",
  USER_PREFERENCES: "odoo_user_preferences",
  THEME_SETTINGS: "odoo_theme_settings",
  VIEW_STATES: "odoo_view_states",
} as const;

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  OPPORTUNITIES: "/api/opportunities",
  PARTNERS: "/api/partners",
  PRODUCTS: "/api/products",
  SALES_ORDERS: "/api/sales-orders",
  PROJECTS: "/api/projects",
  TASKS: "/api/tasks",
  EMPLOYEES: "/api/employees",
  ACTIVITIES: "/api/activities",
  DASHBOARD_KPIS: "/api/dashboard/kpis",
} as const;

// Form field types
export const FIELD_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  NUMBER: "number",
  EMAIL: "email",
  PHONE: "phone",
  URL: "url",
  DATE: "date",
  DATETIME: "datetime",
  SELECT: "select",
  MULTISELECT: "multiselect",
  BOOLEAN: "boolean",
  CURRENCY: "currency",
  PERCENTAGE: "percentage",
  MANY2ONE: "many2one",
  ONE2MANY: "one2many",
  MANY2MANY: "many2many",
} as const;
