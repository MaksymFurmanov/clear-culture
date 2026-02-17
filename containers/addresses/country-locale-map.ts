export const countryLocaleMap: Map<string, string> = new Map([
  ["Slovakia", "SK"],
  ["Germany", "DE"],
  ["France", "FR"],
  ["Italy", "IT"],
  ["Spain", "ES"],
  ["Netherlands", "NL"],
  ["Belgium", "BE"],
  ["Poland", "PL"],
  ["Austria", "AT"],
  ["Czechia", "CZ"],
  ["Sweden", "SE"],
  ["Denmark", "DK"],
  ["Portugal", "PT"],
  ["Hungary", "HU"],
]);

export const countries = Array.from(countryLocaleMap.keys());

export default countryLocaleMap;