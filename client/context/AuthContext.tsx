import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isLoading: false,
  user: null,
  setUser: (_: any) => {},
  logout: () => {},
  error: null,
  setError: (_: any) => {},
  setIsLoading: (_: any) => {},
});

const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState<any>({});

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('/api/me', {
          withCredentials: true,
        });
        setUser(res.data);
        setIsLoading(false);
      } catch (_) {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        '/api/user/logout',
        {},
        { withCredentials: true }
      );
      setIsLoading(false);
    } catch (_) {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        logout,
        setUser,
        error,
        setError,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
