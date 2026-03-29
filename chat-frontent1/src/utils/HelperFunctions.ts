export function debounce(func:any, delay:number) {
  let timer:any;

  return  (...args:any)=> {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function safeJSONParse<T>(value:T, fallback: {} | [] | null) {
  try {

    if(Array.isArray(value)) return value;
    if(typeof value=="object") return value;

    return JSON.parse(value as string);
  } catch {
    return fallback;
  }
}