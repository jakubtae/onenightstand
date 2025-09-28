export type colorSchemeType = {
  background: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
};

export type themeSchemeType = {
  name: string;
  colorScheme: colorSchemeType;
};
export const colorThemes: themeSchemeType[] = [
  {
    name: "Sunrise",
    colorScheme: {
      background: "#ffffff",
      accent: "#F45B69", // coral/pink
      textPrimary: "#22181C",
      textSecondary: "#C5C5C6",
    },
  },
  {
    name: "Ocean",
    colorScheme: {
      background: "#ffffff",
      accent: "#4A90E2", // vivid blue
      textPrimary: "#22181C",
      textSecondary: "#C5C5C6",
    },
  },
  {
    name: "Violet",
    colorScheme: {
      background: "#ffffff",
      accent: "#9B59B6", // medium purple
      textPrimary: "#22181C",
      textSecondary: "#C5C5C6",
    },
  },
  {
    name: "Mint",
    colorScheme: {
      background: "#ffffff",
      accent: "#27AE60", // fresh green
      textPrimary: "#22181C",
      textSecondary: "#C5C5C6",
    },
  },
  {
    name: "Midnight",
    colorScheme: {
      background: "#1C1C1E",
      accent: "#F45B69", // pink accent pops on dark
      textPrimary: "#FFFFFF",
      textSecondary: "#C5C5C6",
    },
  },
];
