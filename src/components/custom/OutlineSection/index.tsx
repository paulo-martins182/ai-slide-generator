import type { OutlineType } from "@/@types/projectType";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit } from "lucide-react";
import EditOutlineDialog from "../EditOutlineDialog";

type OutlineProps = {
  loading: boolean;
  outline: OutlineType[];
  updateOutlineData: (outLineNumber: string, data: OutlineType) => void;
  editable?: boolean;
};

function OutlineSection({
  loading,
  outline,
  updateOutlineData,
  editable,
}: OutlineProps) {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-xl">Slider Outline</h2>
      {loading && (
        <div>
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-[60px] w-full rounded-2xl mb-4" />
          ))}
        </div>
      )}

      <div className="my-4 mb-22">
        {outline.map((item, index) => (
          <div
            key={`${item.slidePoint}${index}`}
            className="bg-white p-3 rounded-2xl flex gap-6 items-center border mb-5 shadow-sm"
          >
            <div className="flex items-center gap-6">
              <h2 className="font-bold text-2xl p-5 rounded-md bg-gray-200">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-bold">{item.slidePoint}</h2>
                <p>{item.outline}</p>
              </div>
            </div>
            {editable && (
              <EditOutlineDialog data={item} onUpdate={updateOutlineData}>
                <Button variant="ghost" size="icon-lg">
                  <Edit />
                </Button>
              </EditOutlineDialog>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OutlineSection;
