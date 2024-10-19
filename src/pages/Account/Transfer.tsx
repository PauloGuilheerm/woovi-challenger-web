import * as React from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui";
import { Button } from "../../components/ui";

export default function Transfer() {
  const account = useSelector((state) => state.account);

  return (
    <Dialog>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          
         
        </div>
      </div>
    </Dialog>
  );
}
