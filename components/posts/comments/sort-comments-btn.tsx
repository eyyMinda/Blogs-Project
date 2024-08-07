"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowDownWideNarrow } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";

export default function SortCommentsButton({ setSortOption }: { setSortOption: Dispatch<SetStateAction<SortOption>> }) {
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);

  const handleSortPopup = (option: SortOption) => {
    popoverTriggerRef.current?.click();
    setSortOption(option);
  };

  return (
    <Popover>
      <PopoverTrigger ref={popoverTriggerRef}>
        <ArrowDownWideNarrow />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-auto p-1" side="left" align="start">
        {["Popular", "Latest", "Oldest"].map(option => (
          <Button key={option} variant="ghost" onClick={() => handleSortPopup(option.toLowerCase() as SortOption)}>
            {option}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
