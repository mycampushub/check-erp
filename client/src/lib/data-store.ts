import { useLocalStorage } from "@/hooks/use-local-storage";

export interface OdooData {
  opportunities: any[];
  customers: any[];
  products: any[];
  users: any[];
  companies: any[];
  activities: any[];
  projects: any[];
  tasks: any[];
  salesOrders: any[];
  employees: any[];
  leads: any[];
  partners: any[];
}

const initialData: OdooData = {
  opportunities: [],
  customers: [],
  products: [],
  users: [],
  companies: [],
  activities: [],
  projects: [],
  tasks: [],
  salesOrders: [],
  employees: [],
  leads: [],
  partners: [],
};

export class DataStore {
  private static instance: DataStore;
  private data: OdooData;

  private constructor() {
    // Initialize with data from localStorage if available
    const storedData = localStorage.getItem('odoo_demo_data');
    this.data = storedData ? JSON.parse(storedData) : initialData;
  }

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  public getData(): OdooData {
    return this.data;
  }

  public setData(data: Partial<OdooData>): void {
    this.data = { ...this.data, ...data };
    this.persistData();
  }

  public addRecord<K extends keyof OdooData>(
    collection: K, 
    record: OdooData[K] extends Array<infer T> ? T : never
  ): void {
    (this.data[collection] as any[]).push(record);
    this.persistData();
  }

  public updateRecord<K extends keyof OdooData>(
    collection: K,
    id: string,
    updates: Partial<OdooData[K] extends Array<infer T> ? T : never>
  ): void {
    const records = this.data[collection] as any[];
    const index = records.findIndex(record => record.id === id);
    
    if (index !== -1) {
      records[index] = { ...records[index], ...updates };
      this.persistData();
    }
  }

  public removeRecord<K extends keyof OdooData>(collection: K, id: string): void {
    const records = this.data[collection] as any[];
    const filteredRecords = records.filter(record => record.id !== id);
    (this.data[collection] as any) = filteredRecords;
    this.persistData();
  }

  public getRecords<K extends keyof OdooData>(collection: K): OdooData[K] {
    return this.data[collection];
  }

  public getRecord<K extends keyof OdooData>(
    collection: K, 
    id: string
  ): (OdooData[K] extends Array<infer T> ? T : never) | undefined {
    const records = this.data[collection] as any[];
    return records.find(record => record.id === id);
  }

  private persistData(): void {
    try {
      localStorage.setItem('odoo_demo_data', JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to persist data to localStorage:', error);
    }
  }

  public clearAllData(): void {
    this.data = initialData;
    localStorage.removeItem('odoo_demo_data');
  }

  public exportData(): string {
    return JSON.stringify(this.data, null, 2);
  }

  public importData(jsonData: string): boolean {
    try {
      const parsedData = JSON.parse(jsonData);
      this.data = { ...initialData, ...parsedData };
      this.persistData();
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}

// Singleton instance
export const dataStore = DataStore.getInstance();

// React hook for easier integration
export function useDataStore() {
  return {
    dataStore,
    getData: () => dataStore.getData(),
    setData: (data: Partial<OdooData>) => dataStore.setData(data),
    addRecord: <K extends keyof OdooData>(
      collection: K, 
      record: OdooData[K] extends Array<infer T> ? T : never
    ) => dataStore.addRecord(collection, record),
    updateRecord: <K extends keyof OdooData>(
      collection: K,
      id: string,
      updates: Partial<OdooData[K] extends Array<infer T> ? T : never>
    ) => dataStore.updateRecord(collection, id, updates),
    removeRecord: <K extends keyof OdooData>(collection: K, id: string) => dataStore.removeRecord(collection, id),
    getRecords: <K extends keyof OdooData>(collection: K) => dataStore.getRecords(collection),
    getRecord: <K extends keyof OdooData>(collection: K, id: string) => dataStore.getRecord(collection, id),
  };
}
