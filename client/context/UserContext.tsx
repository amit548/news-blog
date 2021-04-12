import { createContext, useState } from 'react';

export const UserContext = createContext({
  users: [],
  isLoading: false,
  setIsLoading: (_: any) => {},
  error: null,
  setUsers: (_: any) => {},
  setError: (_: any) => {},
  deleteUser: (_: any) => {},
});

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteUser = (id: any) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        setIsLoading,
        error,
        setError,
        setUsers,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
