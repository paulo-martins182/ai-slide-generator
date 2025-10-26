import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import EmptyCustom from "../Empty";

function ProjectList() {
  return (
    <div className="md:mx-32 mt-20">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">My Projects </h2>

        <Button>
          <PlusIcon />
          Create new project
        </Button>
      </div>

      <div>
        <EmptyCustom />
      </div>
    </div>
  );
}

export default ProjectList;
