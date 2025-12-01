/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#22c55e';
const tintColorDark = '#fff';

// Modern color palette for contemporary design
export const Colors = {
  light: {
    // Primary brand colors
    primary: '#22c55e',
    primaryDark: '#16a34a',
    primaryLight: '#4ade80',
    
    // Text colors
    text: '#0f172a',
    textSecondary: '#64748b',
    textLight: '#94a3b8',
    
    // Background colors
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceSecondary: '#f1f5f9',
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    
    // UI colors
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    shadow: '#0f172a',
    
    // Icon colors
    icon: '#64748b',
    iconSecondary: '#94a3b8',
    
    // Legacy support
    tint: tintColorLight,
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorLight,
  },
  dark: {
    // Primary brand colors
    primary: '#22c55e',
    primaryDark: '#16a34a',
    primaryLight: '#4ade80',
    
    // Text colors
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    textLight: '#64748b',
    
    // Background colors
    background: '#0f172a',
    surface: '#1e293b',
    surfaceSecondary: '#334155',
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    
    // UI colors
    border: '#334155',
    borderLight: '#475569',
    shadow: '#000000',
    
    // Icon colors
    icon: '#94a3b8',
    iconSecondary: '#64748b',
    
    // Legacy support
    tint: tintColorDark,
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
