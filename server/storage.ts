import { messages, type Message, type InsertMessage, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message related methods
  saveMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  getMessagesBySubject(subject: string): Promise<Message[]>;
  getMessagesByExamType(examType: string): Promise<Message[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messagesStore: Map<number, Message>;
  private userCurrentId: number;
  private messageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.messagesStore = new Map();
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageCurrentId++;
    const timestamp = new Date();
    const message: Message = { ...insertMessage, id, timestamp };
    this.messagesStore.set(id, message);
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messagesStore.values());
  }

  async getMessagesBySubject(subject: string): Promise<Message[]> {
    return Array.from(this.messagesStore.values()).filter(
      (message) => message.subject === subject
    );
  }

  async getMessagesByExamType(examType: string): Promise<Message[]> {
    return Array.from(this.messagesStore.values()).filter(
      (message) => message.examType === examType
    );
  }
}

export const storage = new MemStorage();
