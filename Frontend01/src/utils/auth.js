const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const PREFERRED_ROLE_KEY = "preferred_role";

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);
export const normalizeRole = (role) => {
  if (["admin", "doctor", "staff", "patient"].includes(role)) {
    return role;
  }
  return "patient";
};

export const getUserRole = () => normalizeRole(localStorage.getItem(ROLE_KEY));

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const setUserRole = (role) => {
  localStorage.setItem(ROLE_KEY, normalizeRole(role));
};

export const getPreferredRole = () => localStorage.getItem(PREFERRED_ROLE_KEY);

export const setPreferredRole = (role) => {
  localStorage.setItem(PREFERRED_ROLE_KEY, normalizeRole(role));
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};

export const isAuthenticated = () => !!getAuthToken();
