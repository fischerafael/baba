export const DEFAULT_TIMEZONE = "America/Sao_Paulo";

export function toDayKeySP(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: DEFAULT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function isValidDayKey(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function shiftDayKey(dayKey: string, amount: number): string {
  if (!isValidDayKey(dayKey)) {
    return toDayKeySP();
  }

  const [year, month, day] = dayKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + amount);

  return date.toISOString().slice(0, 10);
}

export function formatDayLabel(dayKey: string): string {
  if (!isValidDayKey(dayKey)) {
    return "Hoje";
  }

  if (dayKey === toDayKeySP()) {
    return "Hoje";
  }

  const [year, month, day] = dayKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}
