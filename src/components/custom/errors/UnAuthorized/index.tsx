import React from "react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function UnAuthorized() {
  return (
    <div className="mx-auto mt-32 flex items-center justify-center flex-col gap-4">
      <h2 className="text-2xl font-bold">
        Please Sign in to access this page.
      </h2>
      <div className="flex items-center justify-center gap-4">
        <Link to="/">
          <Button>Go to Home</Button>
        </Link>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </div>
    </div>
  );
}

export default UnAuthorized;
