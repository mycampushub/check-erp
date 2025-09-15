// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

// User and Company types
export interface User extends BaseEntity {
  username: string;
  email: string;
  name: string;
  companyId?: string;
  isActive: boolean;
  roles: string[];
  settings: Record<string, any>;
}

export interface Company extends BaseEntity {
  name: string;
  currency: string;
  country?: string;
  timezone: string;
  settings: Record<string, any>;
}

// CRM types
export interface Lead extends BaseEntity {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  stage: string;
  probability: number;
  expectedRevenue?: number;
  description?: string;
  assignedTo?: string;
  companyId?: string;
}

export interface Opportunity extends BaseEntity {
  name: string;
  partnerId?: string;
  stage: string;
  probability: number;
  expectedRevenue?: number;
  closeDate?: Date;
  assignedTo?: string;
  companyId?: string;
  description?: string;
}

// Partner (Customer/Vendor) types
export interface Partner extends BaseEntity {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  isCustomer: boolean;
  isVendor: boolean;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  vatNumber?: string;
  companyId?: string;
}

// Product and Inventory types
export interface Product extends BaseEntity {
  name: string;
  internalReference?: string;
  barcode?: string;
  salePrice?: number;
  cost?: number;
  category?: string;
  type: "storable" | "consumable" | "service";
  description?: string;
  active: boolean;
  companyId?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  location: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  companyId?: string;
  updatedAt: Date;
}

// Sales types
export interface SalesOrder extends BaseEntity {
  name: string;
  partnerId?: string;
  state: "draft" | "sent" | "confirmed" | "done" | "cancel";
  totalAmount: number;
  currency: string;
  orderDate: Date;
  deliveryDate?: Date;
  salespersonId?: string;
  companyId?: string;
  lines: SalesOrderLine[];
}

export interface SalesOrderLine {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
}

// Project Management types
export interface Project extends BaseEntity {
  name: string;
  description?: string;
  partnerId?: string;
  managerId?: string;
  startDate?: Date;
  endDate?: Date;
  state: "active" | "closed" | "cancelled";
  companyId?: string;
}

export interface Task extends BaseEntity {
  name: string;
  description?: string;
  projectId?: string;
  assignedTo?: string;
  stage: "todo" | "doing" | "done";
  priority: "low" | "normal" | "high" | "urgent";
  dueDate?: Date;
  companyId?: string;
}

// HR types
export interface Employee extends BaseEntity {
  userId?: string;
  employeeId?: string;
  name: string;
  jobTitle?: string;
  department?: string;
  managerId?: string;
  hireDate?: Date;
  salary?: number;
  currency: string;
  companyId?: string;
}

// Activity and Calendar types
export interface Activity extends BaseEntity {
  type: "meeting" | "call" | "email" | "task" | "note";
  summary: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  assignedTo?: string;
  relatedRecord?: string; // JSON reference to related record
  companyId?: string;
}

// Accounting types
export interface Account extends BaseEntity {
  code: string;
  name: string;
  type: "asset" | "liability" | "equity" | "income" | "expense";
  parentId?: string;
  companyId?: string;
}

export interface JournalEntry extends BaseEntity {
  name: string;
  date: Date;
  reference?: string;
  state: "draft" | "posted";
  companyId?: string;
  lines: JournalEntryLine[];
}

export interface JournalEntryLine {
  id: string;
  entryId: string;
  accountId: string;
  debit: number;
  credit: number;
  description?: string;
}

// UI and View types
export interface ViewState {
  currentView: "list" | "form" | "kanban" | "calendar" | "pivot" | "graph";
  filters: Record<string, any>;
  sorting: { field: string; direction: "asc" | "desc" }[];
  groupBy: string[];
  searchTerm: string;
  selectedIds: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  readonly: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  help?: string;
  validation?: Record<string, any>;
}

export interface MenuItem {
  id: string;
  name: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
  badge?: string | number;
}

// Search and Filter types
export interface SearchFilter {
  field: string;
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=" | "like" | "ilike" | "in" | "not in";
  value: any;
  display?: string;
}

export interface SearchDomain {
  filters: SearchFilter[];
  operator: "AND" | "OR";
}

// Dashboard types
export interface KPI {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative";
  color?: string;
  icon?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }>;
}

// Notification types
export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// Settings and Preferences types
export interface UserPreferences {
  theme: "light" | "dark";
  language: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  defaultView: string;
  itemsPerPage: number;
  notifications: {
    email: boolean;
    browser: boolean;
    sound: boolean;
  };
}

export interface CompanySettings {
  name: string;
  logo?: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  timezone: string;
  fiscalYearEnd: string;
  multiCurrency: boolean;
  multiCompany: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
