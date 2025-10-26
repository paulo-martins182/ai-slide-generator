import { useEffect } from "react";
import UnAuthorized from "@/components/custom/errors/UnAuthorized";
import { useUser } from "@clerk/clerk-react";

import { Outlet, useLocation } from "react-router-dom";
import { createNewUser } from "@/services/firebase";
import { useUserDetails } from "@/hooks/useUserDetails";
import PromptBox from "@/components/custom/PromptBox";
import ProjectList from "@/components/custom/ProjectList";

function WorksPace() {
  const { user } = useUser();
  const { handleUserDetails } = useUserDetails();
  const location = useLocation();

  const handleUser = async () => {
    const userData = await createNewUser({ user });
    handleUserDetails(userData);
  };

  useEffect(() => {
    if (user) {
      handleUser();
    }
  }, [user]);

  if (!user) {
    return <UnAuthorized />;
  }
  return (
    <div>
      {location.pathname === "/workspace" && (
        <div>
          <PromptBox />
          <ProjectList />
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default WorksPace;
