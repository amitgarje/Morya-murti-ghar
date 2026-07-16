import React, { createContext, useContext, useState, useEffect } from 'react';

interface Customer {
  name: string;
  mobile: string;
  email?: string;
}

interface AuthContextType {
  isCustomerLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  currentCustomer: Customer | null;
  loginCustomer: (name: string, mobile: string) => void;
  logoutCustomer: () => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Load session from localStorage on initial render
  useEffect(() => {
    const savedCustomer = localStorage.getItem('morya_customer');
    const savedAdmin = localStorage.getItem('morya_admin_active');
    
    if (savedCustomer) {
      try {
        setCurrentCustomer(JSON.parse(savedCustomer));
      } catch (e) {
        localStorage.removeItem('morya_customer');
      }
    }
    
    if (savedAdmin === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const loginCustomer = (name: string, mobile: string) => {
    const customer: Customer = { name, mobile };
    setCurrentCustomer(customer);
    localStorage.setItem('morya_customer', JSON.stringify(customer));
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    localStorage.removeItem('morya_customer');
  };

  const loginAdmin = (password: string): boolean => {
    // Secret admin login password
    if (password === 'admin@123' || password === 'morya@2026') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('morya_admin_active', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('morya_admin_active');
  };

  return (
    <AuthContext.Provider
      value={{
        isCustomerLoggedIn: !!currentCustomer,
        isAdminLoggedIn,
        currentCustomer,
        loginCustomer,
        logoutCustomer,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
