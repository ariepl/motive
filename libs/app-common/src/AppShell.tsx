import { AppInitializer } from "./AppInitializer";
import { AppConfigManager } from "./config/AppConfigManager";
import { ChildrenProps } from "./components/ChildrenProps";
import { ConfigManagerToken } from "./config/ConfigManager";
import { ThemeManager } from "./theme/ThemeManager";
import InjectionContainer from "./utils/InjectionContainer";
import { StylesProvider, ThemeProvider } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import useAsyncEffect from "use-async-effect";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter5Adapter } from "use-query-params/adapters/react-router-5";

const Loading = () => (
  <div
    style={{
      textAlign: 'center',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <CircularProgress />
  </div>
);

function AppShell(props: ChildrenProps) {
  const configProvider =
    InjectionContainer.resolve<AppConfigManager>(ConfigManagerToken);
  const themeManager = InjectionContainer.resolve(ThemeManager);

  const [ready, setReady] = React.useState(false);

  useAsyncEffect(async () => {
    await InjectionContainer.resolve(AppInitializer).init();
    setReady(true);
  }, []);

  return (
    <StylesProvider injectFirst={true}>
      <Suspense fallback={<Loading />}>
            {!ready ? (
              <Loading />
            ) : (
              <Router basename={configProvider.getConfig().basePath}>
                <QueryParamProvider
                  adapter={ReactRouter5Adapter}
                >
                  <LastLocationProvider>
                    <ThemeProvider theme={themeManager.materialUITheme!}>
                      {props.children}
                    </ThemeProvider>
                  </LastLocationProvider>
                </QueryParamProvider>
              </Router>
            )}
      </Suspense>
    </StylesProvider>
  );
}

export default AppShell;
