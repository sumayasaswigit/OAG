import { useContext, useState, createContext, useEffect } from "react";

const context = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || null;
  })
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("isAdminLoggedIn") === "true";
  });
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(() => {
    return sessionStorage.getItem("isCustomerLoggedIn") === "true";
  });
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(() => {
    return sessionStorage.getItem("isSellerLoggedIn") === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
    sessionStorage.setItem("isCustomerLoggedIn", isCustomerLoggedIn);
    sessionStorage.setItem("isSellerLoggedIn", isSellerLoggedIn);
    localStorage.setItem("username", username);
  }, [isAdminLoggedIn, isSellerLoggedIn, isCustomerLoggedIn, username]);

  return (
    <context.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isCustomerLoggedIn,
        setIsCustomerLoggedIn,
        isSellerLoggedIn,
        setIsSellerLoggedIn,
        username,
        setUsername
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useAuth = () => useContext(context);
