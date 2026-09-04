import { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook with error checking
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  // State for authentication
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  
  // Functions will go here...
  const login = async (userEmail, password) => {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password }),
      credentials: 'include',
    };
    
    const res = await fetch('/api/users/logon', options);
    const data = await res.json();
    
    if (res.status === 200 && data.name && data.csrfToken) {
      // Success: Update state
      setEmail(data.name);
      setToken(data.csrfToken);
      return { success: true };
    } else {
      // Failure: Return error
      return {
        success: false,
        error: `Authentication failed: ${data?.message}`,
      };
    }
    } catch (error) {
        return {
        success: false,
        error: 'Network error during login',
        };
    }
    };

    const logout = async () => {
        try {
            if (!token) {
                setEmail('');
                setToken('');
                return { success: true };
            }

            const options = {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
            };
            
            //NOTE - instructions say "/api/user/logoff" instead of "users" like in the existing login endpoint, be mindful
            const res = await fetch('/api/users/logoff', options);  

            if (!res.ok) {
                throw new Error('Logout failed');
            }

            return { success: true };
        }
        catch (error) {
            return {
            success: false,
            error: 'Network error during logoff',
            };
        }
        finally {
            setEmail('');
            setToken('');
        }
    };

  // Context value object
  const value = {
    email,                      // current user email
    token,                      // CSRF token for API requests
    isAuthenticated: !!token,   // computed boolean for auth status
    login,                      // function to authenticate user
    logout,                     // function to clear authentication
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

