import React from 'react';
import { NavigationItem } from '@gtn/app-common/navigation/NavigationItem';
import { GtnRoute } from '@gtn/app-common/utils/routing/GtnRoute';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styles from './AppNavigation.module.scss';
import { GtnRouteSwitch } from '@gtn/app-common/utils/routing/GtnRouteSwitch';
import { useAppTranslation } from '@gtn/app-common/utils/HookUtils';

export interface AppNavigationProps {
  routes: GtnRoute[];
  primaryNavigationItems: NavigationItem[];
}

export function AppNavigation(props: AppNavigationProps) {
  const history = useHistory();
  const t = useAppTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <GtnRouteSwitch
          routes={props.routes}
          render={(route) => {
            // metaTagsManager.setTitle(route.title ? translationManager.translate(route.title) : undefined);
            return <route.content />;
          }}
        />
      </div>

      <BottomNavigation
        onChange={(event, newValue) => {
          history.push({ pathname: newValue });
        }}
        showLabels
      >
        {props.primaryNavigationItems.map((item) => (
          <BottomNavigationAction label={t(item.title)} value={item.href} />
        ))}
      </BottomNavigation>
    </div>
  );
}
