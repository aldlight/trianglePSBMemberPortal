export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5050";

export const getToken = () => localStorage.getItem("token");
export const setToken = (t) => localStorage.setItem("token", t);
export const clearToken = () => localStorage.removeItem("token");

// Decodes the payload for UX only (the server does the real verification)
export function getUser() {
  const token = getToken();
  if (!token) return null;
  try {
    const b64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(b64));
    if (payload.exp * 1000 < Date.now()) {
      clearToken();
      return null;
    }
    return payload; // { userId, userName, privileges, exp }
  } catch {
    clearToken();
    return null;
  }
}

export const isLoggedIn = () => getUser() !== null;

// fetch wrapper that attaches the token and handles expiry
export async function authFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (res.status === 401) {
    clearToken();
    window.location.assign("/");
  }
  return res;
}