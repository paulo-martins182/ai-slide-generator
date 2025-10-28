import { v4 as uuidv4 } from "uuid";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { saveDoc } from "@/services/firebase";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const valuesSliderToSelect = [
  {
    value: "4 to 6",
    label: "4-6 sliders",
  },
  {
    value: "6 to 8",
    label: "6-8 sliders",
  },
  {
    value: "8 to 12",
    label: "8-12 sliders",
  },
  {
    value: "grapes",
    label: "Grapes",
  },
];

function PromptBox() {
  const [userInput, setUserInput] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [noOfSliders, setNoOfSliders] = useState("4 to 6");
  const navigate = useNavigate();

  const handleChangePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);
  };

  const CreateAndSaveProject = async () => {
    const projectId = uuidv4();

    setLoading(true);
    const res = await saveDoc({
      pathName: "projects",
      pathSegment: projectId,
      data: {
        projectId: projectId,
        userInputPrompt: userInput,
        createBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date(),
        noOfSliders: noOfSliders,
      },
    });

    if (!res?.error) {
      navigate(`/workspace/project/${projectId}/outline`);
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex items-center justify-center md:mt-28 mt-14 text-center px-4">
      <div className="flex flex-col items-center justify-center space-y-4 ">
        <h2 className="font-bold text-3xl">
          Describe your topic, we’ll design the{" "}
          <span className="text-primary">PPT</span> slides!
        </h2>
        <p className="text-xl text-gray-500">
          Your design will be saved as new project
        </p>

        <InputGroup>
          <InputGroupTextarea
            onChange={(e) => handleChangePrompt(e)}
            className="min-h-38"
            placeholder="Enter what kind of slider do you want to create?"
          />
          <InputGroupAddon align="block-end">
            {/*  <InputGroupButton>
              <PlusIcon />
            </InputGroupButton> */}

            <Select
              onValueChange={(v) => setNoOfSliders(v)}
              disabled
              defaultValue="4 to 6"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select No. of sliders" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>No. Of Slider</SelectLabel>
                  {valuesSliderToSelect.map((item) => {
                    return (
                      <SelectItem key={`item-${item.label}`} value={item.value}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <InputGroupButton
              className="rounded-full ml-auto"
              size="icon-sm"
              variant="default"
              onClick={CreateAndSaveProject}
              disabled={!userInput}
            >
              {loading ? <Loader2Icon className="animate-spin" /> : <ArrowUp />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}

export default PromptBox;
