import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import 'reflect-metadata';
import '@gtn/app-common/styles/index.scss';

import MotivationApp from './MotivationApp';
import AppShell from '@gtn/app-common/AppShell';
import { GtnLogger, LogLevel } from '@gtn/app-common/utils/logger/GtnLogger';
import { container } from 'tsyringe';
import { ConfigManagerToken } from '@gtn/app-common/config/ConfigManager';
import { IAppConfig } from '@gtn/app-common/config/IAppConfig';
import { AppConfigManager } from '@gtn/app-common/config/AppConfigManager';
import { DEFAULT_MOTIVATION_APP_CONFIG } from './config/default-motivation.config';

GtnLogger.setLogLevel(LogLevel.Info);

container.registerInstance(
  ConfigManagerToken,
  new AppConfigManager<IAppConfig>(DEFAULT_MOTIVATION_APP_CONFIG)
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppShell>
      <MotivationApp></MotivationApp>
    </AppShell>
  </StrictMode>
);
