export function concatAddress(city: string, street: string | null, house: string | null) {
  return `${city} ${street || ''} ${house || ''}`.trim();
}
