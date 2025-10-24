import React from "react";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useUser();
  return (
    <main className="flex items-center justify-between shadow-md px-16 py-2">
      <Logo />

      {user ? (
        <div className="flex items-center gap-4">
          <UserButton />
          <Link to="/workspace">
            <Button>Go to Workspace</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>
      )}
    </main>
  );
}

export default Header;
