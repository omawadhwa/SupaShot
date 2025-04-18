import { users, type User, type InsertUser, type Screenshot, type InsertScreenshot, screenshots } from "@shared/schema";

// Storage interface with CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Screenshot methods
  getScreenshot(id: number): Promise<Screenshot | undefined>;
  getScreenshotsByUserId(userId: number): Promise<Screenshot[]>;
  createScreenshot(screenshot: InsertScreenshot): Promise<Screenshot>;
  updateScreenshot(id: number, data: Partial<InsertScreenshot>): Promise<Screenshot | undefined>;
  deleteScreenshot(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private screenshots: Map<number, Screenshot>;
  private userId: number;
  private screenshotId: number;

  constructor() {
    this.users = new Map();
    this.screenshots = new Map();
    this.userId = 1;
    this.screenshotId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Screenshot methods
  async getScreenshot(id: number): Promise<Screenshot | undefined> {
    return this.screenshots.get(id);
  }

  async getScreenshotsByUserId(userId: number): Promise<Screenshot[]> {
    return Array.from(this.screenshots.values()).filter(
      (screenshot) => screenshot.userId === userId
    );
  }

  async createScreenshot(insertScreenshot: InsertScreenshot): Promise<Screenshot> {
    const id = this.screenshotId++;
    const screenshot: Screenshot = { ...insertScreenshot, id };
    this.screenshots.set(id, screenshot);
    return screenshot;
  }

  async updateScreenshot(id: number, data: Partial<InsertScreenshot>): Promise<Screenshot | undefined> {
    const existing = this.screenshots.get(id);
    if (!existing) return undefined;
    
    const updated: Screenshot = { ...existing, ...data };
    this.screenshots.set(id, updated);
    return updated;
  }

  async deleteScreenshot(id: number): Promise<boolean> {
    return this.screenshots.delete(id);
  }
}

export const storage = new MemStorage();
