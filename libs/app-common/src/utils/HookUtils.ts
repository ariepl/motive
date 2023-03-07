import useMediaQuery from '@material-ui/core/useMediaQuery';
import { LocationDescriptor } from 'history';
import { TFunction } from 'i18next';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory as useHistoryRouter, useLocation } from 'react-router-dom';

export const useHistory = <T>() => {
  const history = useHistoryRouter<T>();

  const requestUri = window.location.href;

  return {
    ...history,
    requestUri,
    push: (path: LocationDescriptor<T> | null, state?: T) =>
      history.push(path === null ? requestUri : path, state),
    replace: (path: LocationDescriptor<T> | null, state?: T) =>
      history.replace(path === null ? requestUri : path, state),
  };
};

export const useAppTranslation = () => {
  return useTranslation().t;
};

export function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((val) => ++val);
}

export function useIsScreenMinWidth(width: number) {
  return useMediaQuery('(min-width:' + width + 'px)');
}
