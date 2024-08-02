import React, { createContext, useEffect, useState } from 'react';
import { UserContextType, UserInitialValues } from '../utils/types';

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{
  initialValues: UserInitialValues;
  children: React.ReactNode;
}> = ({ initialValues, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialValues.isLoggedIn);
  const [displayName, setDisplayName] = useState(initialValues.displayName);
  const [accessToken, setAccessToken] = useState(initialValues.accessToken);
  const [expiresAt, setExpiresAt] = useState(initialValues.expiresAt);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        displayName,
        setDisplayName,
        accessToken,
        setAccessToken,
        expiresAt,
        setExpiresAt,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
