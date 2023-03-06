import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';
import {singleton} from 'tsyringe';
import {setLocale} from 'yup';
import {GtnLogger} from '../utils/logger/GtnLogger';
import {Utils} from '../utils/Utils';

@singleton()
export class TranslationManager {

  public init(defaultLanguage: string, language: string = defaultLanguage, basePath = '') {
    return i18n
      .use(HttpApi)
      .use(initReactI18next)
      .init(
        {
          lng: language,
          backend: {
            loadPath: (languages: string[]) => {
              const lang = languages[0];
              return `${basePath}assets/i18n/${lang}.json?time=${new Date().getTime()}`; // TODO make root folder dynamic
            },
            crossDomain: true,
          },
          fallbackLng: defaultLanguage,
          debug: false,
          ns: ['app'],
          defaultNS: 'app',
          interpolation: {
            escapeValue: false,
            formatSeparator: ',',
          },
          react: {
            useSuspense: true,
          },
        },
        () => this.setFormValidationLocalization()
      );
  }

  public translate(key: string, options?: object) {
    return i18n.t(key, options);
  }

  public getLanguage() {
    return i18n.language ?? i18n.options.fallbackLng;
  }

  public setLanguage(language: string | null) {
    if (language) {
      i18n.changeLanguage(language, (e) => {
        if (e) {
          GtnLogger.warn('Changing language failed: %o', e);
        }
      });
    }
  }

  private setFormValidationLocalization() {
    setLocale({
      string: {
        url: (params) =>
          this.translate('form-validation.valid-url', {
            label: Utils.capitalize(params.path),
          }),
      },
      mixed: {
        required: (params) =>
          this.translate('form-validation.required', {
            label: Utils.capitalize(params.path),
          }),
      },
    });
  }

  public static getBestUsableLanguage(availableLanguageCodes: string[]) {
    for (const lang of navigator.languages) {
      const normalizedLang = lang.split('-')[0];
      if (availableLanguageCodes.includes(normalizedLang)) {
        return normalizedLang;
      }
    }
    return '';
  }

}
