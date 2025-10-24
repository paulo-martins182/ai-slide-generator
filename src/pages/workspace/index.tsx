import UnAuthorized from "@/components/custom/errors/UnAuthorized";
import { useUser } from "@clerk/clerk-react";
import React from "react";

import { Outlet } from "react-router-dom";

function WorksPace() {
  const { user } = useUser();

  if (!user) {
    return <UnAuthorized />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default WorksPace;
