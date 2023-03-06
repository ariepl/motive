import { singleton } from 'tsyringe';

export interface MetaTagsConfig {
	appName?: string;
	primaryColor?: string;
}

@singleton()
export class MetaTagsManager {
	config?: MetaTagsConfig;

	public init(config: MetaTagsConfig) {
		this.config = config;

		this.setTitle();
		this.setThemeColor(config.primaryColor);
	}

	public setTitle(title?: string) {
		const appName = this.config?.appName ?? '';
		document.title = title ? `${title} | ${appName}` : appName;
	}

	public setThemeColor(color?: string) {
		this.setMeta('theme-color', color);
	}

	private setMeta(name: string, value?: string) {
		if (value != null) {
			document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', value);
		}
	}
}
