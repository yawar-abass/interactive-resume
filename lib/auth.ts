export const login = (email: string, password: string): boolean => {
  return email === "test@algokart.com" && password === "pass123";
};

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
};

export const logout = () => {
  localStorage.removeItem("isLoggedIn");
};
