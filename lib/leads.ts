import { PrismaClient } from "@prisma/client";

export type LeadInput = { name: string; email: string; phone?: string; company?: string; service: string; budget?: string; message: string };
export type Lead = { id: string; name: string; email: string; phone?: string | null; company?: string | null; service: string; budget?: string | null; message: string; status: string; createdAt: Date };

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient; demoLeads?: Lead[] };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function createLead(input: LeadInput): Promise<Lead> {
  if (process.env.DATABASE_URL) return prisma.lead.create({ data: input });
  const lead = { ...input, id: crypto.randomUUID(), status: "NEW", createdAt: new Date() };
  globalForPrisma.demoLeads = [lead, ...(globalForPrisma.demoLeads || [])];
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  if (process.env.DATABASE_URL) return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return globalForPrisma.demoLeads || [];
}

export async function setLeadStatus(id: string, status: string) {
  if (process.env.DATABASE_URL) return prisma.lead.update({ where: { id }, data: { status } });
  const lead = (globalForPrisma.demoLeads || []).find((item) => item.id === id);
  if (lead) lead.status = status;
  return lead;
}
