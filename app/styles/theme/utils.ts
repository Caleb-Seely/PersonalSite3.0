import { colors, opacities, type ColorName, type OpacityValue } from './colors';

// Transition utilities
export const transitions = {
  color: 'transition-colors duration-300',
  transform: 'transition-transform duration-300',
  all: 'transition-all duration-300',
} as const;

// Basic color utilities
export const tw = {
  // Basic colors should use Tailwind's built-in classes
  text: (color: ColorName) => {
    switch (color) {
      case 'text': return 'text-white';
      case 'textMuted': return 'text-zinc-400';
      case 'primary': return 'text-black';
      default: return `text-[${colors[color]}]`;
    }
  },
  bg: (color: ColorName) => {
    switch (color) {
      case 'primary': return 'bg-black';
      case 'secondary': return `bg-[${colors.secondary}]`;
      case 'hover': return 'bg-zinc-800';
      default: return `bg-[${colors[color]}]`;
    }
  },
  border: (color: ColorName) => {
    switch (color) {
      case 'primary': return 'border-black';
      case 'secondary': return `border-[${colors.secondary}]`;
      default: return `border-[${colors[color]}]`;
    }
  },
  
  // Hover states
  hoverText: (color: ColorName) => {
    switch (color) {
      case 'text': return 'hover:text-white';
      case 'textMuted': return 'hover:text-zinc-400';
      default: return `hover:text-[${colors[color]}]`;
    }
  },
  hoverBg: (color: ColorName) => {
    switch (color) {
      case 'primary': return 'hover:bg-black';
      case 'secondary': return `hover:bg-[${colors.secondary}]`;
      case 'hover': return 'hover:bg-zinc-800';
      default: return `hover:bg-[${colors[color]}]`;
    }
  },
  hoverBorder: (color: ColorName) => `hover:border-[${colors[color]}]`,
  
  // Focus states
  focusText: (color: ColorName) => `focus:text-[${colors[color]}]`,
  focusBg: (color: ColorName) => `focus:bg-[${colors[color]}]`,
  focusBorder: (color: ColorName) => `focus:border-[${colors[color]}]`,
  
  // Opacity variants
  withOpacity: (color: ColorName, opacity: OpacityValue) => 
    `text-[${colors[color]}/${opacities[opacity]}]`,
  bgWithOpacity: (color: ColorName, opacity: OpacityValue) => {
    switch (color) {
      case 'primary': return `bg-black/${opacities[opacity]}`;
      case 'secondary': return `bg-[${colors.secondary}]/${opacities[opacity]}`;
      default: return `bg-[${colors[color]}/${opacities[opacity]}]`;
    }
  },
} as const;

// Common component styles
export const componentStyles = {
  // Button variants
  button: {
    primary: `
      ${tw.bg('accent')}
      ${tw.text('primary')}
      ${tw.border('accent')}
      ${transitions.color}
    `,
    secondary: `
      ${tw.border('accent')}
      ${tw.text('accent')}
      ${tw.hoverBg('accent')}
      ${tw.hoverText('text')}
      ${transitions.color}
    `,
    outline: `
      ${tw.border('accent')}
      ${tw.text('accent')}
      ${tw.hoverBg('accent')}
      ${tw.hoverText('primary')}
      ${transitions.color}
    `,
  },
  
  // Card variants
  card: {
    primary: `
      ${tw.bg('secondary')}
      ${tw.text('text')}
      rounded-lg
    `,
    interactive: `
      ${tw.bg('secondary')}
      ${tw.text('text')}
      rounded-lg
      hover:shadow-lg
      hover:shadow-accent/20
      ${transitions.all}
    `,
  },
  
  // Tag variants
  tag: {
    primary: `
      ${tw.bgWithOpacity('accent2', 'light')}
      ${tw.text('accent2')}
      rounded-full px-3 py-1
    `,
    secondary: `
      ${tw.bgWithOpacity('accent', 'light')}
      ${tw.text('accent')}
      rounded-full px-3 py-1
    `,
  },
  
  // Link variants
  link: {
    primary: `
      ${tw.text('accent')}
      ${tw.hoverText('accent2')}
      ${transitions.color}
    `,
    secondary: `
      ${tw.text('textMuted')}
      ${tw.hoverText('text')}
      ${transitions.color}
    `,
  },
} as const; 