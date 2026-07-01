
console.log("import.meta.env =", import.meta.env);
console.log("VITE_APIBASE_URL =", import.meta.env.VITE_APIBASE_URL);
export const apiBaseUrl = import.meta.env.VITE_APIBASE_URL ||  "http://10.193.111.232:8080";
export const wsAPIBaseURL = import.meta.env.VITE_WSAPIBASEURL || "ws://10.193.111.232:8050"