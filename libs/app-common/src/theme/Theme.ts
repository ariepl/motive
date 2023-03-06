export interface ThemeColors {
  primary: string;
  primaryLight?: string;
  text1OnPrimary: string;

  secondary: string;
  text1OnSecondary: string;

  error: string;
  text1OnError: string;

  input: string; // used to color input fields
  text1OnInput: string;

  tertiaryButton: string;
  text1OnTertiaryButton: string;

  foreground: string;
  text1OnForeground: string;
  text2OnForeground: string;

  background: string;
  text1OnBackground: string;
  text2OnBackground: string;
}

export interface Theme {
  appName: string;
  colors: ThemeColors;
  logo?: {
    favicon?: string;
    image?: string;
    imageWithName?: string;
  };
}
