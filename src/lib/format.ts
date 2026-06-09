/** Format an ISO date (YYYY-MM-DD) as a French long date. */
export function frDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
