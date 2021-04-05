export function isValidHexCode(string) {
  return /^[a-fA-F0-9]{6}$/.test(string);
}
