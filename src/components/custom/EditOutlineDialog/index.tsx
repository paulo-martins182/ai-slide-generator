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

export type EditOutlineDialog = {
  children: React.ReactNode;
  data: OutlineType;
  onUpdate: (outLineNumber: string, data: OutlineType) => void;
};

function EditOutlineDialog({ children, data, onUpdate }: EditOutlineDialog) {
  const [localData, setLocalData] = useState(data);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (name: string, value: string) => {
    setLocalData({
      ...localData,
      [name]: value,
    });
  };
  const handleUpdateOutline = () => {
    onUpdate(data?.slideNo, localData);
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
          <Button onClick={handleUpdateOutline}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditOutlineDialog;
