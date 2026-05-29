// src/types/index.ts
import type { Role, ProjectStatus, TimesheetStatus } from "@prisma/client";

// ─── Auth ──────────────────────────────────────────────────────────────────

export type { Role };

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

// ─── Project ───────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatus;
  address?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}

export interface ProjectWithMembers extends Project {
  members: ProjectMember[];
  devices: Device[];
}

// ─── Project Member ────────────────────────────────────────────────────────

export interface ProjectMember {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  joinedAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
}

// ─── Device ────────────────────────────────────────────────────────────────

export interface Device {
  id: string;
  type: string;
  loop: number;
  address: number;
  location?: string | null;
  floor?: number | null;
  zone?: string | null;
  notes?: string | null;
  installed: boolean;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Address Calculator ────────────────────────────────────────────────────

export interface AddressCalculatorInput {
  panelModel: string;
  loop: number;
  deviceType: string;
  startAddress?: number;
  quantity: number;
}

export interface AddressCalculatorResult {
  addresses: number[];
  loop: number;
  deviceType: string;
}

// ─── Timesheet ─────────────────────────────────────────────────────────────

export interface Timesheet {
  id: string;
  date: Date;
  hoursWorked: number;
  description?: string | null;
  status: TimesheetStatus;
  userId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── API Responses ─────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
