import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import EmptyCustom from "../Empty";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getAllDocs } from "@/services/firebase";

import Slider_icon from "@/assets/ppt.png";
import { useNavigate } from "react-router-dom";
import type { ProjectTypes } from "@/@types/projectType";

function ProjectList() {
  const { user } = useUser();
  const [projects, setProjects] = useState<ProjectTypes[]>();
  const navigate = useNavigate();

  const loadProjects = async () => {
    const res = await getAllDocs({
      pathName: "projects",
      userEmail: user?.primaryEmailAddress?.emailAddress || "",
    });
    console.log(res);
    setProjects(res);
  };

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  return (
    <div className="md:mx-32 mt-20 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">My Projects </h2>

        <Button>
          <PlusIcon />
          Create new project
        </Button>
      </div>

      <div>
        {projects && projects?.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {projects.map((project, index) => {
              return (
                <div
                  key={`${project?.userInputPrompt}-${index}`}
                  className="p-4 shadow-md flex flex-col justify-between space-y-2 border border-transparent hover:border-primary rounded-2xl cursor-pointer"
                  onClick={() =>
                    navigate(`/workspace/project/${project?.projectId}/outline`)
                  }
                >
                  <img src={Slider_icon} width={50} height={50} />
                  <h2 className="font-bold">{project?.userInputPrompt}</h2>
                  <div className="flex items-end justify-between">
                    <h2>total: {`${project?.slides?.length || 0} slides`}</h2>
                    <p className="text-gray-500">
                      {(project?.createdAt as any)
                        ?.toDate()
                        .toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyCustom />
        )}
      </div>
    </div>
  );
}

export default ProjectList;
