import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication - in real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@example.com' && password === 'password') {
          const userData = {
            id: 1,
            email: 'demo@example.com',
            name: 'Demo User',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const userData = {
            id: Date.now(),
            email,
            name,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Please fill in all fields'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 