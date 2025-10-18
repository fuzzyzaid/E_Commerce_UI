import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

/**
 * UserProvider
 * - keeps track of authenticated user
 * - persists user to localStorage
 * - exposes setUser and logout
 */
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    }
  }, []);

  // persist user whenever it changes
  useEffect(() => {
    try {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    } catch (e) {
      console.error("Failed to persist user to localStorage", e);
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    // localStorage cleared by effect
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;