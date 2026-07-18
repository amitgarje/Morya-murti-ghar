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
  loginUser: (name: string, mobile: string) => boolean;
  logoutCustomer: () => void;
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

  const loginUser = (name: string, mobile: string) => {
    // Admin login check
    if (name === 'amit@admin' && mobile === '9029263731') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('morya_admin_active', 'true');
      return true; // true means admin
    }

    // Customer login
    const customer: Customer = { name, mobile };
    setCurrentCustomer(customer);
    localStorage.setItem('morya_customer', JSON.stringify(customer));
    return false; // false means customer
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    localStorage.removeItem('morya_customer');
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
        loginUser,
        logoutCustomer,
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
