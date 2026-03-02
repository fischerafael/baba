export type Role = "owner" | "member" | "babysitter";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  locale: "pt-BR" | "en";
  timezone: "America/Sao_Paulo";
}

export interface Family {
  id: string;
  name: string;
  ownerUserId: string;
  subscriptionStatus: "active" | "past_due" | "canceled" | "incomplete";
}

export interface ActivityLog {
  id: string;
  familyId: string;
  activityKind: "standard" | "checkin" | "checkout";
  titleSnapshot: string;
  observations?: string;
  dayKey: string;
  createdByUserId: string;
  createdByRole: Role;
}
