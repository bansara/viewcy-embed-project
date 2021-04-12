export function isValidHexCode(string) {
  return /^[a-fA-F0-9]{6}$/.test(string);
}

export function removePrefix(string) {
  if (string.startsWith("@") || string.startsWith("#")) {
    return string.slice(1);
  } else {
    return string;
  }
}

export function isValidUsername(string) {
  return /^[a-zA-Z0-9]{1,20}$/.test(string);
}
