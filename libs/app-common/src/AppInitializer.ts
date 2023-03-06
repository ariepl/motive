import { AppConfigManager } from '@gtn/app-common/config/AppConfigManager';
import { IAppConfig } from '@gtn/app-common/config/IAppConfig';
import { CommonRoutingParams } from './AppCommonRouting';
import { ConfigManagerToken } from './config/ConfigManager';
import { TranslationManager } from './i18n/TranslationManager';
import { ThemeManager } from './theme/ThemeManager';
import InjectionContainer from './utils/InjectionContainer';
import { GtnLogger } from './utils/logger/GtnLogger';
import { MetaTagsManager } from './utils/MetaTagsManager';
import { Utils } from './utils/Utils';
import { singleton } from 'tsyringe';
import { DataManager } from './data/DataManager';

@singleton()
export class AppInitializer {
  private readonly configManager =
    InjectionContainer.resolve<AppConfigManager>(ConfigManagerToken);
  private readonly dataManager = InjectionContainer.resolve(DataManager);
  private readonly translationManager =
    InjectionContainer.resolve(TranslationManager);
  private readonly themeManager = InjectionContainer.resolve(ThemeManager);
  private readonly metaTagsManager =
    InjectionContainer.resolve(MetaTagsManager);

  private config?: IAppConfig;

  public async init() {
    GtnLogger.log('Initializing App...');

    await this.initConfig();

    await this.initI18n();
    this.initTheme();
    this.initMetaTags();

    await this.initData();
  }

  private async initData() {
    try {
      await this.dataManager.loadCategoryData(this.config!.appType);
    } catch (e) {}
    try {
      await this.dataManager.loadAdditionalData(this.config!.appType);
    } catch (e) {}
  }

  private async initConfig() {
    try {
      const queryParams = Utils.parseQuery(window.location.search);
      const configPath = queryParams[CommonRoutingParams.CONFIG];
      this.config = await this.configManager.loadRemoteConfig(configPath);

      GtnLogger.log('basePath: ' + this.config.basePath);
    } catch (e) {}
  }

  private initI18n() {
    const i18nConfig = this.config!.i18n;
    const uiLanguage = TranslationManager.getBestUsableLanguage(
      i18nConfig.availableLanguages.map((l) => l.code)
    );

    return this.translationManager.init(
      i18nConfig.defaultLanguage,
      uiLanguage,
      this.config?.basePath
    );
  }

  private initTheme() {
    this.themeManager.init(
      this.config!.theme,
      this.configManager.getAssetPath('')
    );
  }

  private initMetaTags() {
    this.metaTagsManager.init({
      appName: this.config?.theme.appName,
      primaryColor: this.config?.theme.colors.primary,
    });
  }
}
