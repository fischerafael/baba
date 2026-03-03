import { toDayKeySP } from "@/lib/timezone";
import type { ActivityLog } from "@/types/domain";

const dayKey = toDayKeySP();

export const logs: ActivityLog[] = [
  {
    id: "1",
    familyId: "demo-family",
    activityKind: "checkin",
    titleSnapshot: "Check-in",
    observations: "Cheguei no horário.",
    dayKey,
    createdByUserId: "u-babysitter-1",
    createdByRole: "babysitter"
  },
  {
    id: "2",
    familyId: "demo-family",
    activityKind: "standard",
    titleSnapshot: "Brincar",
    observations: "Brincamos no quintal.",
    dayKey,
    createdByUserId: "u-babysitter-1",
    createdByRole: "babysitter"
  }
];

export const families = [
  { id: "demo-family", name: "Família Demo", subscriptionStatus: "active" },
  { id: "casa-lima", name: "Casa Lima", subscriptionStatus: "past_due" }
];
