import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { Gem } from "lucide-react";
import { useUserDetails } from "@/hooks/useUserDetails";

function Header() {
  const { user } = useUser();
  const location = useLocation();
  const { userDetails } = useUserDetails();

  return (
    <main className="flex items-center justify-between shadow-md md:px-32 py-2 px-4">
      <Logo />

      <nav className="flex gap-4">
        <li className="list-none">
          <Link to="/workspace">Workspace</Link>
        </li>
        <li className="list-none">
          <Link to="/price">Pricing</Link>
        </li>
      </nav>

      {user ? (
        <div className="flex items-center gap-4">
          <UserButton />
          {location.pathname.includes("workspace") ? (
            <div className="flex ites-center p-2 px-4 bg-purple-300 rounded-sm gap-2">
              <Gem /> {userDetails?.credits ?? "0"}
            </div>
          ) : (
            <Link to="/workspace">
              <Button>Go to Workspace</Button>
            </Link>
          )}
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
