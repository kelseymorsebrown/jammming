import React, { createContext, useEffect, useState } from 'react';
import { UserContextType, UserInitialValues } from '../utils/types';

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{
  initialValues: UserInitialValues;
  children: React.ReactNode;
}> = ({ initialValues, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialValues.isLoggedIn);
  const [displayName, setDisplayName] = useState(initialValues.displayName);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, displayName, setDisplayName }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
