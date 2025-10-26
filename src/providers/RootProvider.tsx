import { UserDetailsProvider } from "@/context/UserDetailsContext";
import router from "@/routes";
import { ClerkProvider } from "@clerk/clerk-react";

import { RouterProvider } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const RootProvider = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserDetailsProvider>
        <RouterProvider router={router} />
      </UserDetailsProvider>
    </ClerkProvider>
  );
};

export default RootProvider;
