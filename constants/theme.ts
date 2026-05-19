import { useColorScheme } from 'react-native';

export const contentAccents = {
  notas: '#3B82F6',
  tareas: '#22C55E',
  ideas: '#F59E0B',
} as const;

export type ContentType = keyof typeof contentAccents;

export interface Palette {
  background: string;
  surface: string;
  card: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  success: string;
  danger: string;
  notas: string;
  tareas: string;
  ideas: string;
}

const lightColors: Palette = {
  background: '#FFFFFF',
  surface: '#F4F4F5',
  card: '#FFFFFF',
  text: '#18181B',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  primary: '#4F46E5',
  primaryText: '#FFFFFF',
  success: '#16A34A',
  danger: '#DC2626',
  ...contentAccents,
};

const darkColors: Palette = {
  background: '#0B0B0F',
  surface: '#18181B',
  card: '#1C1C1F',
  text: '#F4F4F5',
  textMuted: '#A1A1AA',
  border: '#27272A',
  primary: '#818CF8',
  primaryText: '#0B0B0F',
  success: '#4ADE80',
  danger: '#F87171',
  ...contentAccents,
};

export const palettes = { light: lightColors, dark: darkColors } as const;
export type ColorMode = keyof typeof palettes;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    '2xl': 28,
    '3xl': 34,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 9999,
} as const;

export interface Theme {
  mode: ColorMode;
  colors: Palette;
  typography: typeof typography;
  spacing: typeof spacing;
  radii: typeof radii;
}

export function useTheme(): Theme {
  const scheme = useColorScheme();
  const mode: ColorMode = scheme === 'dark' ? 'dark' : 'light';
  return {
    mode,
    colors: palettes[mode],
    typography,
    spacing,
    radii,
  };
}
