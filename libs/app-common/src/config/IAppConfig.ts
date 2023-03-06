import { Theme } from '../theme/Theme';

export enum AppType {
  MOTIVATION = "motivation",

}

export interface IAppConfig {
  isProduction: boolean;
  version: {
    name: string;
    code: number;
  };
  basePath: string;
  buildTimestamp: string;
  buildTimeString: string;

  appType: AppType;

  i18n: {
    defaultLanguage: string;
    availableLanguages: {
      displayName: string;
      code: string;
    }[];
  };

  theme: Theme;
}
