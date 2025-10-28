import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { OutlineType } from "@/@types/projectType";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateDb } from "@/services/firebase";
import { useParams } from "react-router-dom";

export type EditOutlineDialog = {
  children: React.ReactNode;
  data: OutlineType;
  onUpdate: (outLineNumber: string, data: OutlineType) => void;
  allOutlines: OutlineType[];
};

function EditOutlineDialog({
  children,
  data,
  onUpdate,
  allOutlines,
}: EditOutlineDialog) {
  const { projectId } = useParams();
  const [localData, setLocalData] = useState(data);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setLocalData({
      ...localData,
      [name]: value,
    });
  };
  const handleUpdateOutline = async () => {
    setLoading(true);
    onUpdate(data?.slideNo, localData);

    await updateDb({
      pathName: "projects",
      pathSegment: projectId ?? "",
      data: {
        outline: allOutlines.map((item) => {
          if (item.slideNo === data?.slideNo) {
            return localData;
          }
          return item;
        }),
      },
      merge: true,
    });
    setLoading(false);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Outline</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              <label>Slider Title</label>
              <Input
                placeholder="Slider Title"
                value={localData.slidePoint}
                onChange={(e) => handleChange("slidePoint", e.target.value)}
              />

              <label>Slider Content</label>
              <Textarea
                value={localData.outline}
                onChange={(e) => handleChange("outline", e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleUpdateOutline} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditOutlineDialog;
