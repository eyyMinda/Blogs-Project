type ModeToggleVariant = {
  size: "sm" | "lg" | "default" | "icon" | null | undefined;
  text: string | JSX.Element;
};

type ModeToggleVariantsType = {
  [key: string]: ModeToggleVariant;
};

export const ModeToggleVariants: ModeToggleVariantsType = {
  mini: {
    size: "sm",
    text: ""
  },
  default: {
    size: "default",
    text: "Theme"
  },
  large: {
    size: "lg",
    text: "Device Theme"
  }
};
