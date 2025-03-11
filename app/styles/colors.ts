export const colors = {
  // Base backgrounds
  primary: "bg-black",
  secondary: "bg-zinc-900",
  
  // Text colors
  text: "text-white",
  textMuted: "text-zinc-400",
  
  // Accent colors and their variations
  accent: "text-[#8DB7F5]",
  accentBg: "bg-[#8DB7F5]",
  accentBorder: "border-[#8DB7F5]",
  accentHover: "hover:text-[#8DB7F5]",
  
  accent2: "text-[#10B981]",
  accent2Bg: "bg-[#10B981]",
  accent2Border: "border-[#10B981]",
  accent2Hover: "hover:text-[#10B981]",
  accent2BgHover: "hover:bg-[#10B981]",
  accent2Opacity: "bg-[#10B981]/20",
  
  steensAccent: "text-[#FFAB5B]",
  
  // Interactive states
  hover: "hover:bg-zinc-800",
  hoverText: "hover:text-white",
} as const;

// Derived color combinations for common patterns
export const colorCombos = {
  // Basic combinations
  card: `${colors.secondary} ${colors.text}`,
  gradientOverlay: "bg-gradient-to-t from-black",
  
  // Interactive states
  hoverTransition: `${colors.hover} transition-all duration-300`,
  buttonTransition: "transition-colors duration-300",
  
  // Button styles
  primaryButton: `${colors.accent2Bg} text-black ${colors.accent2Border}`,
  outlineButton: `${colors.accent2Border} ${colors.accent2} ${colors.accent2BgHover} hover:text-black`,
  
  // Card and container styles
  projectCard: `bg-gray-900 rounded-lg hover:shadow-lg hover:shadow-[#8DB7F5]/20`,
  modalOverlay: `${colors.primary}/80`,
  
  // Text styles
  linkHover: `${colors.accent} ${colors.accent2Hover}`,
  
  // Tool tag styles
  toolTag: `${colors.accent2Opacity} ${colors.accent2}`,
} as const; 