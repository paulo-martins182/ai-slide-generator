import type { DesignTypes } from "@/@types/projectType";
import { DESGIN_STYLES } from "@/lib/Design_Styles";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export type SliderStyleProps = {
  onSelectStyle: (design: DesignTypes) => void;
};

function SliderStyle({ onSelectStyle }: SliderStyleProps) {
  const [selectedStyle, setSelectedStyle] = useState("");

  const handleSelectStyle = (design: DesignTypes) => {
    setSelectedStyle(design.styleName);
    onSelectStyle(design);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">Select Slider Style</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
        {DESGIN_STYLES.map((design) => (
          <div
            key={design.styleName}
            className={cn(
              "shadow-sm hover:shadow-md p-2 flex flex-col justify-center items-center rounded-2xl cursor-pointer border border-transparent",
              selectedStyle === design.styleName && "border border-primary"
            )}
            onClick={() => handleSelectStyle(design)}
          >
            <img
              src={design.bannerImage}
              alt={design.styleName}
              width={300}
              height={300}
              className="w-full object-cover hover:scale-104 transition-all duration-500 rounded-xl"
            />

            <h2 className="font-medium text-center mt-1">{design.styleName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderStyle;
