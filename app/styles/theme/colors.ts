// Base color palette
export const colors = {
  // Primary colors
  primary: "#000000", // Black - Main background
  secondary: "#18181B", // Zinc 900 - Secondary background
  
  // Accent colors
  accent: "#8DB7F5", // Blue - Primary accent
  accent2: "#10B981", // Emerald - Secondary accent
  steensAccent: "#FFAB5B", // Orange - Special accent
  
  // Text colors
  text: "#FFFFFF", // White - Primary text
  textMuted: "#A1A1AA", // Zinc 400 - Secondary text
  
  // Interactive colors
  hover: "#27272A", // Zinc 800 - Hover state
  
  // Semantic colors
  success: "#22C55E", // Green
  error: "#EF4444", // Red
  warning: "#F59E0B", // Amber
  info: "#3B82F6", // Blue
} as const;

// Opacity variants
export const opacities = {
  light: "20",
  medium: "40",
  heavy: "80",
} as const;

// Color roles
export const colorRoles = {
  // Background roles
  background: colors.primary,
  surfacePrimary: colors.secondary,
  surfaceAccent: colors.accent,
  
  // Text roles
  textPrimary: colors.text,
  textSecondary: colors.textMuted,
  textAccent: colors.accent,
  textAccent2: colors.accent2,
  
  // Interactive roles
  buttonPrimary: colors.accent2,
  buttonSecondary: colors.accent,
  buttonHover: colors.hover,
  
  // Border roles
  borderPrimary: colors.accent2,
  borderSecondary: colors.accent,
} as const;

// Type definitions
export type ColorName = keyof typeof colors;
export type OpacityValue = keyof typeof opacities;
export type ColorRole = keyof typeof colorRoles; 