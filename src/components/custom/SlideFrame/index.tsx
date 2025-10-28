import type { DesignTypes } from "@/@types/projectType";
import { GeminiAiModel } from "@/config/FirebaseConfig";
import { HTML_DEFAULT } from "@/lib/template_default";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import FloatActions from "../FloatActions";

type props = {
  slide: { code: string };
  colors: any;
  setUpdateSlider?: any;
};

function SliderFrame({ slide, colors, setUpdateSlider }: props) {
  const FINAL_CODE = HTML_DEFAULT.replace(
    "{colorCodes}",
    JSON.stringify(colors)
  ).replace("{code}", slide?.code);

  const iframeRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const selectedElRef = useRef<HTMLElement | null>(null);
  const [cardPosition, setCardPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  useEffect(() => {
    if (!iframeRef.current) return;
    const iframe = iframeRef.current;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(FINAL_CODE);
    doc.close();

    let hoverEl: HTMLElement | null = null;
    let selectedEl: HTMLElement | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      if (selectedEl) return;
      const target = e.target as HTMLElement;
      if (hoverEl && hoverEl !== target) hoverEl.style.outline = "";
      hoverEl = target;
      hoverEl.style.outline = "2px dotted blue";
    };

    const handleMouseOut = () => {
      if (selectedEl) return;
      if (hoverEl) {
        hoverEl.style.outline = "";
        hoverEl = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;

      if (selectedEl && selectedEl !== target) {
        selectedEl.style.outline = "";
        selectedEl.removeAttribute("contenteditable");
      }

      selectedEl = target;

      selectedElRef.current = target;

      if (selectedEl && selectedEl !== target) {
        selectedEl.style.outline = "";
        selectedEl.removeAttribute("contenteditable");
      }

      selectedEl = target;
      selectedEl.style.outline = "2px solid blue";
      selectedEl.setAttribute("contenteditable", "true");
      selectedEl.focus();

      const rect = target.getBoundingClientRect();
      const iframeRect = iframe.getBoundingClientRect();

      setCardPosition({
        x: iframeRect.left + rect.left + rect.width / 2,
        y: iframeRect.top + rect.bottom,
      });
    };

    /*    const handleBlur = () => {
      if (selectedEl) {
        console.log("Final edited element:", selectedEl.outerHTML);
        const updatedSliderCode = iframe.contentDocument?.body?.innerHTML;
        console.log(updatedSliderCode);
        setUpdateSlider(updatedSliderCode);
      }
    }; */

    /*     const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedEl) {
        selectedEl.style.outline = "";
        selectedEl.removeAttribute("contenteditable");
        selectedEl.removeEventListener("blur", handleBlur);
        selectedEl = null;
      }
    }; */

    doc.addEventListener("DOMContentLoaded", () => {
      doc.body?.addEventListener("mouseover", handleMouseOver);
      doc.body?.addEventListener("mouseout", handleMouseOut);
      doc.body?.addEventListener("click", handleClick);
      /*      doc.body?.addEventListener("keydown", handleKeyDown); */
    });

    return () => {
      doc.body?.removeEventListener("mouseover", handleMouseOver);
      doc.body?.removeEventListener("mouseout", handleMouseOut);
      doc.body?.removeEventListener("click", handleClick);
      /*     doc.body?.removeEventListener("keydown", handleKeyDown); */
    };
  }, [slide?.code]);

  const handleAiSectionChange = async (userAiPrompt: string) => {
    setLoading(true);
    const selectedEl = selectedElRef.current;
    const iframe = iframeRef.current;

    if (!selectedEl || !iframe) return;

    const oldHTML = selectedEl.outerHTML;
    const prompt = `
      Regenerate or rewrite the following HTML code based on this user instruction.
      If user asked to change the image/regenerate the image then make sure to use
      ImageKit:
      'https://ik.imagekit.io/ikmedia/ik-genimg-prompt-{imagePrompt}/{altImageName}.jpg'
      Replace {imagePrompt} with relevant image prompt and altImageName with a random image name.
      if user want to crop image, or remove background or scale image or optimze image then add image kit ai transfromation 
      by providing ?tr=fo-auto,<other transfromation> etc.  
      "User Instruction is :${userAiPrompt}"
      HTML code:
      ${oldHTML}
    `;

    try {
      const result = await GeminiAiModel.generateContent(prompt);
      const newHTML = (await result.response.text()).trim();

      const tempDiv = iframe.contentDocument?.createElement("div");
      if (tempDiv) {
        tempDiv.innerHTML = newHTML;
        const newNode = tempDiv.firstElementChild;

        if (newNode && selectedEl.parentNode) {
          selectedEl.parentNode.replaceChild(newNode, selectedEl);
          selectedElRef.current = newNode as HTMLElement;
          console.log("✅ Element replaced successfully");

          const updatedSliderCode =
            iframe.contentDocument?.body?.innerHTML || newHTML;
          setUpdateSlider(updatedSliderCode);
        }
      }
    } catch (err) {
      console.error("AI generation failed:", err);
    }

    setLoading(false);
  };

  return (
    <div className="mb-5">
      <iframe
        ref={iframeRef}
        className="w-[800px] h-[500px] border-0 rounded-2xl"
        sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups" // ✅ full sandbox permissions
      />

      <FloatActions
        position={cardPosition}
        onClose={() => setCardPosition(null)}
        loading={loading}
        handleAiChange={(value: string) => handleAiSectionChange(value)}
      />
    </div>
  );
}

export default SliderFrame;
