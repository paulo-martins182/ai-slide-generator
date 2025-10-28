import React, { useEffect, useRef, useState } from "react";
import OutlineSection from "@/components/custom/OutlineSection";
import SliderFrame from "@/components/custom/SlideFrame";

import { GeminiAiLiveModel } from "@/config/FirebaseConfig";
import { SLIDER_PROMPT } from "@/lib/prompt";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileDown, InfoIcon, Loader2 } from "lucide-react";
import { getDocById, updateDb } from "@/services/firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ProjectTypes } from "@/@types/projectType";

function Editor() {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState<ProjectTypes>();
  const [loading, setLoading] = useState(false);
  const [sliders, setSliders] = useState<any>([]);
  const [isSlidesGenerated, setIsSlidesGenerated] = useState<any>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    if (projectId) {
      getProjectDetails();
    }
  }, [projectId]);

  const getProjectDetails = async () => {
    setLoading(true);
    const res = await getDocById({
      pathName: "projects",
      pathSegment: projectId ?? "",
    });

    console.log(JSON.stringify(res));
    setProjectDetail(res);
    setLoading(false);
  };

  useEffect(() => {
    if (projectDetail && !projectDetail?.slides?.length) {
      /*  generateSlides(); */
    } else {
      setSliders(projectDetail?.slides);
    }
  }, [projectDetail]);

  const generateSlides = async () => {
    if (!projectDetail?.outline || projectDetail.outline.length === 0) return;

    console.log("🚀 Starting slide generation...");

    // Optional: initialize sliders to empty states
    // setSliders(projectDetail.outline.map(() => ({ code: "" })));

    for (
      let index = 0;
      index < projectDetail.outline.length && index < 5;
      index++
    ) {
      const metaData = projectDetail.outline[index];
      const prompt = SLIDER_PROMPT.replace(
        "{DESIGN_STYLE}",
        projectDetail?.designStyle?.designGuide ?? ""
      )
        .replace(
          "{COLORS_CODE}",
          JSON.stringify(projectDetail?.designStyle?.colors)
        )
        .replace("{METADATA}", JSON.stringify(metaData));

      console.log("🧠 Generating slide", index + 1);
      await geminiSlideCall(prompt, index);
      console.log("✅ Finished slide", index + 1);
    }

    console.log("🎉 All slides generated!");

    setIsSlidesGenerated(Date.now());
  };

  const geminiSlideCall = async (prompt: string, index: number) => {
    try {
      const session = await GeminiAiLiveModel.connect();
      await session.send(prompt);

      let text = "";

      for await (const message of session.receive()) {
        if (message.type === "serverContent") {
          const parts = message.modelTurn?.parts;
          if (parts && parts.length > 0) {
            text += parts?.map((p) => p.text).join("");

            const finalText = text
              .replace(/```html/g, "")
              .replace(/```/g, "")
              .trim();

            setSliders((prev: any[]) => {
              const updated = prev ? [...prev] : [];
              updated[index] = { code: finalText };
              return updated;
            });
          }

          if (message.turnComplete) {
            console.log("✅ Slide", index + 1, "complete");
            break;
          }
        }
      }

      session.close();
    } catch (err) {
      console.error("❌ Error generating slide", index + 1, err);
    }
  };

  useEffect(() => {
    if (isSlidesGenerated) SaveAllSlides();
  }, [isSlidesGenerated]);

  const SaveAllSlides = async () => {
    await updateDb({
      pathName: "projects",
      pathSegment: projectId ?? "",
      data: {
        slides: sliders,
      },
      merge: true,
    });
  };

  const updateSliderCode = (updateSlideCode: string, index: number) => {
    setSliders((prev: any) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        code: updateSlideCode,
      };
      return updated;
    });
    setIsSlidesGenerated(Date.now());
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-4">
        <Alert variant="destructive" className="max-w-lg">
          <InfoIcon />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            This is Application Demo, Maximum 4 Slider can generator for demo
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-5 p-10 gap-10 ">
        <div className="col-span-2 h-[90vh] overflow-auto ">
          <OutlineSection
            outline={projectDetail?.outline ?? []}
            updateOutlineData={() => console.log()}
            loading={loading}
            editable={false}
          />
        </div>

        <div className="col-span-3 h-screen overflow-auto" ref={containerRef}>
          {sliders?.map((slide: any, index: number) => (
            <SliderFrame
              slide={slide}
              key={index}
              colors={projectDetail?.designStyle?.colors}
              setUpdateSlider={(updateSlideCode: string) =>
                updateSliderCode(updateSlideCode, index)
              }
            />
          ))}
        </div>

        <Button
          size={"lg"}
          className="fixed bottom-6
            transform left-1/2 -translate-x-1/2"
          disabled={downloadLoading}
        >
          {downloadLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <FileDown />
          )}
          Export PPT
        </Button>
      </div>
    </div>
  );
}

export default Editor;
