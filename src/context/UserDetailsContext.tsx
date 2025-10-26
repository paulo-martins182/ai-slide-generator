/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from "react";

export type UserDetailsTypes = {
  userDetails: any;
  handleUserDetails: (val: any) => void;
};

const UserDetailsContext = createContext<UserDetailsTypes>({
  userDetails: {},
  handleUserDetails: () => null,
});

const UserDetailsProvider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState({});

  const handleUserDetails = (val: any) => {
    setUserDetails(val);
  };

  return (
    <UserDetailsContext.Provider value={{ userDetails, handleUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export { UserDetailsContext, UserDetailsProvider };
