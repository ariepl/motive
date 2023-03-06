import preval from 'preval.macro';
import { IAppConfig } from './IAppConfig';

const [buildTimestamp, buildTimeString] = preval`
var format = require("date-fns-tz/format");
var utcToZonedTime = require("date-fns-tz/utcToZonedTime");

const date = utcToZonedTime(new Date(), "Europe/Vienna");
module.exports = [
  date,
  format(date, 'yyyy-MM-dd HH:mm')
]
`;

export const createPartialBaseConfig = <T extends Partial<IAppConfig>>(t: T) =>
  t;

export const DEFAULT_APP_CONFIG = createPartialBaseConfig({
  buildTimestamp,
  buildTimeString,
  isProduction: process.env['NODE_ENV'] === 'production',
  basePath: process.env['REACT_APP_BASE_PATH'] || './',
  version: { name: '1.0.0', code: 100 },
  i18n: {
    defaultLanguage: 'de',
    availableLanguages: [
      { displayName: 'Deutsch', code: 'de' },
    ],
  },
});
