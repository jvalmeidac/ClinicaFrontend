export const key = "token";
export const login = (token) => {
  localStorage.setItem(key, token);
};
export const logout = () => {
  localStorage.removeItem(key);
};
export const isAuthenticated = () => {
  return localStorage.getItem(key) !== null;
};
