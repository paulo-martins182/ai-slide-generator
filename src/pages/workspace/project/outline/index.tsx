/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import type {
  DesignTypes,
  OutlineType,
  ProjectTypes,
} from "@/@types/projectType";
import OutlineSection from "@/components/custom/OutlineSection";
import SliderStyle from "@/components/custom/SliderStyle";
import { GeminiAiModel } from "@/config/FirebaseConfig";
import { generatePrompt } from "@/lib/prompt";
import { getDocById, updateDb } from "@/services/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2Icon, SparkleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function Outline() {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [outline, setOutline] = useState<OutlineType[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<DesignTypes>();

  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      getProjectDetails();
    }
  }, [projectId]);

  const getProjectDetails = async () => {
    if (!projectId) return;

    const res = await getDocById({
      pathName: "projects",
      pathSegment: projectId ?? "",
    });

    if (res?.message) {
      console.log("Error Messages", res.message);
      return;
    }
    if (!res?.outline) {
      generateSlidersOutline({ data: res });
    } else {
      setOutline(res.outline);
    }
  };

  const generateSlidersOutline = async ({ data }: { data: ProjectTypes }) => {
    setLoading(true);
    const prompt = generatePrompt({
      userInput: data?.userInputPrompt,
      noOfSliders: data?.noOfSliders,
    });

    const result = await GeminiAiModel.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    const rawjson = text.replace("```json", "").replace("```", "");
    const JsonData = JSON.parse(rawjson);
    setOutline(JsonData);

    setLoading(false);
  };

  const updateOutlineData = async (
    outLineNumber: string,
    data: OutlineType
  ) => {
    setOutline((prev) =>
      prev.map((item) =>
        item.slideNo === outLineNumber ? { ...item, ...data } : item
      )
    );
  };

  const onGenerateSlider = async () => {
    setUpdateLoading(true);
    await updateDb({
      pathName: "projects",
      pathSegment: projectId ?? "",
      data: {
        designStyle: selectedStyle,
        outline,
      },
      merge: true,
    });

    setUpdateLoading(false);

    navigate(`/workspace/project/${projectId}/editor`);
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="max-w-4xl w-full ">
        <h2 className="font-bold text-2xl"> Settings and Slider Outline</h2>
        <SliderStyle onSelectStyle={(v) => setSelectedStyle(v)} />
        <OutlineSection
          loading={loading}
          outline={outline || []}
          updateOutlineData={updateOutlineData}
          editable
        />
      </div>

      <Button
        className="fixed bottom-6 transform left-1/2 -translate-x-1/2"
        size="lg"
        onClick={onGenerateSlider}
        disabled={updateLoading}
      >
        {updateLoading && <Loader2Icon className="animate-spin" />}
        Generate Sliders <SparkleIcon />
      </Button>
    </div>
  );
}

export default Outline;
