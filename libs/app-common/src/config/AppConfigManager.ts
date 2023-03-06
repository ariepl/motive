import { IAppConfig } from './IAppConfig';
import { ConfigManager } from './ConfigManager';

export class AppConfigManager<C extends IAppConfig = IAppConfig> extends ConfigManager<C> {
  constructor(config: C) {
    super(config);
  }

  public override async loadRemoteConfig(name = 'config.json') {
    return super.loadRemoteConfig(`./assets/${name}`);
  }

  public getAssetPath(asset: string) {
    return `${this.config.basePath}/${asset}`;
  }
}
