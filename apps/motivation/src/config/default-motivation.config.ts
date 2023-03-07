import { DEFAULT_APP_CONFIG } from '@gtn/app-common/config/default-app.config';
import { AppType, IAppConfig } from '@gtn/app-common/config/IAppConfig';

export const DEFAULT_MOTIVATION_APP_CONFIG: IAppConfig = {
  ...DEFAULT_APP_CONFIG,
  appType: AppType.MOTIVATION,
  theme: {
    appName: 'Motivation',
    colors: {
      primary: '#369D9E',
      primaryLight: '#D5ECEC',
      text1OnPrimary: '#fff',

      secondary: '#fff',
      text1OnSecondary: 'rgba(0,0,0,0.85)',

      error: '#f44336',
      text1OnError: '#fff',

      input: '#E3E5E7',
      text1OnInput: '#79797A',

      tertiaryButton: '#ABB6BE',
      text1OnTertiaryButton: 'white',

      foreground: '#fff',
      text1OnForeground: '#292929',
      text2OnForeground: '#767676',

      background: '#F4F4F4',
      text1OnBackground: 'rgba(0, 0, 0, 0.87)',
      text2OnBackground: 'rgba(0, 0, 0, 0.54)',
    },
  },
};
