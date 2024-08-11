"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useTheme } from "next-themes";

export default function EmojiPickerComp({ setCommentText }: { setCommentText: Function }) {
  const { theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile />
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={12} side="right" className="w-auto">
        <EmojiPicker
          open={true}
          lazyLoadEmojis
          searchDisabled
          theme={theme === "system" ? ("auto" as Theme) : (theme as Theme)}
          onEmojiClick={(e: EmojiObject) => setCommentText((v: string) => v + e.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
}
