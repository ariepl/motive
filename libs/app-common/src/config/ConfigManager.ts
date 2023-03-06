import { HttpService } from '../api/webservice/HttpService';
import InjectionContainer from '../utils/InjectionContainer';
import { GtnLogger } from '../utils/logger/GtnLogger';
import { Utils } from '../utils/Utils';
import { IAppConfig } from './IAppConfig';

export const ConfigManagerToken = Symbol('config-manager');

export abstract class ConfigManager<T extends IAppConfig = IAppConfig> {
  private readonly httpService = InjectionContainer.resolve(HttpService);

  protected config: T;
  protected defaultConfig: T;

  protected constructor(defaultConfig: T) {
    this.defaultConfig = defaultConfig;
    this.config = defaultConfig;
  }

  public getConfig() {
    return this.config;
  }

  public setConfig(newConfig: Partial<T>) {
    const baseConfig = this.defaultConfig;

    if (baseConfig) {
      newConfig = Utils.deepMerge(baseConfig, newConfig);
    }

    return (this.config = newConfig as T);
  }

  protected async loadRemoteConfig(url: string) {
    try {
      const additionalConfig = await this.httpService.get(
        `${url}?time=${new Date().getTime()}`
      );

      return this.setConfig(additionalConfig);
    } catch (e) {
      GtnLogger.warn(`Loading config from ${url} failed!`);
    }
    return this.config;
  }
}
