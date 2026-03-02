import type { Role } from "@/types/domain";

export function canAccessSettings(role: Role): boolean {
  return role === "owner" || role === "member";
}

export function canDeleteLog(role: Role): boolean {
  return role !== "babysitter";
}

export function hasFamilyAccess(subscriptionStatus: string): boolean {
  return subscriptionStatus === "active";
}
