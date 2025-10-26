import {
  UserDetailsContext,
  type UserDetailsTypes,
} from "@/context/UserDetailsContext";
import { useContext } from "react";

export const useUserDetails = (): UserDetailsTypes => {
  const context = useContext(UserDetailsContext);

  if (!context) {
    throw new Error("useUserDetails must be used within a UserDetailsProvider");
  }

  return context;
};
