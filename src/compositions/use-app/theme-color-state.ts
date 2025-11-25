
export const ThemeColorKeys = [
  "--i-bg-1",
  "--i-bg-2",
  "--i-bg-3",
  "--i-bg-4",
  "--i-bg-5",
  "--i-bg-6",
  "--i-bg-7",
  "--i-bg-8",
  "--i-bg-9",
  "--i-bg-10",
  
  "--i-primary",
  "--i-primary-1",
  "--i-fg-2"
]
export type ThemeColorKey = typeof ThemeColorKeys[number];
export const themeColor = reactive<{[key: ThemeColorKey]: string}>({})