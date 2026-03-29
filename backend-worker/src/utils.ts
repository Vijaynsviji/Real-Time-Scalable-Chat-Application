

export function safeJSONParse<T>(value:T, fallback: {} | [] | null) {
  try {

    if(Array.isArray(value)) return value;
    if(typeof value=="object") return value;

    return JSON.parse(value as string);
  } catch {
    return fallback;
  }
}