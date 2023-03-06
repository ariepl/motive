import { createMuiTheme, Theme as MaterialUITheme } from '@material-ui/core';
import { PaletteOptions as MaterialUIThemeColors } from '@material-ui/core/styles/createPalette';
import { singleton } from 'tsyringe';
import { Theme, ThemeColors } from './Theme';

@singleton()
export class ThemeManager {
  private readonly COLORS = [
    '#f44336',
    '#da2c2f',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#607D8B',
  ];

  public theme?: Theme;
  public materialUITheme?: MaterialUITheme;

  public init(theme: Theme, baseAssetPath: string) {
    const materialUIColors = this.applyColors(theme.colors);

    this.theme = theme;
    this.materialUITheme = createMuiTheme({ palette: materialUIColors });

    ThemeManager.setFavicon(baseAssetPath + (theme?.logo?.favicon ?? 'img/logo64x64.png'));
  }

  public getColorForId(id: number) {
    return this.COLORS[id % this.COLORS.length];
  }

  private applyColors(colors: ThemeColors) {
    ThemeManager.getTypedKeys(colors).forEach((color) => ThemeManager.setCSSVariable('color-' + color, colors[color]));

    const materialUIColors: MaterialUIThemeColors = {
      primary: {
        main: colors.primary,
        contrastText: colors.text1OnPrimary,
      },
      secondary: {
        main: colors.secondary,
        contrastText: colors.text1OnSecondary,
      },
      background: { default: colors.background },
      text: {
        primary: colors.text1OnBackground,
        secondary: colors.text2OnBackground,
      },
      error: { main: colors.error, contrastText: colors.text1OnError },
    };
    return materialUIColors;
  }

  // tslint:disable-next-line:no-any
  private static setCSSVariable(name: string, value: any) {
    if (value) {
      document.documentElement.style.setProperty('--' + name, value.toString());
    }
  }

  private static setFavicon(url: string) {
    const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  private static getTypedKeys<T>(obj: T) {
    return obj ? (Object.keys(obj) as (keyof typeof obj)[]) : [];
  }
}
