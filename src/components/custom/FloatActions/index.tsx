import { Button } from "@/components/ui/button";

import { ArrowRight, Loader2, Sparkle, X } from "lucide-react";
import { useState } from "react";

export type FloatActionsProps = {
  position: { x: number; y: number } | null;
  onClose: () => void;
  loading: boolean;
  handleAiChange: (value: string) => void;
};

function FloatActions({
  handleAiChange,
  loading,
  onClose,
  position,
}: FloatActionsProps) {
  const [aiText, setAiText] = useState("");

  if (!position) return;
  return (
    <div
      className="absolute z-50 bg-primary text-white text-sm px-3 py-2 rounded-lg shadow-xl border flex items-center"
      style={{
        top: position.y + 8,
        left: position.x,
        transform: "translate(-80%)",
      }}
    >
      <div className="flex items-center gap-2">
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Sparkle className="h-4 w-4" />
        )}
        <input
          type="text"
          placeholder="Edit with AI"
          className="outline-none border-none"
          onChange={(e) => setAiText(e.target.value)}
          value={aiText}
        />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => handleAiChange(aiText)}
          disabled={!aiText || loading}
        >
          <ArrowRight size={18} />
        </Button>
      </div>
      <Button variant="ghost" size="icon-sm" onClick={onClose}>
        <X />
      </Button>
    </div>
  );
}

export default FloatActions;
