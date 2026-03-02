export const DEFAULT_TIMEZONE = "America/Sao_Paulo";

export function toDayKeySP(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: DEFAULT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}
