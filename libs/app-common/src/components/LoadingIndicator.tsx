import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import {useAppTranslation} from '../utils/HookUtils';
import {ChildrenProps} from "./ChildrenProps";

export const LoadingIndicatorOverlay = (props: ChildrenProps) => {
  const t = useAppTranslation();
  return (
    <div
      style={{
        textAlign: 'center',
        position: 'fixed',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <CircularProgress />
      <div style={{ marginTop: 20 }}>{props.children || t('loading')}</div>
    </div>
  );
};

export const LoadingIndicatorInline = (props: ChildrenProps) => {
  const t = useAppTranslation();

  return (
    <div style={{ textAlign: 'center', padding: 80 }}>
      <CircularProgress />
      <div style={{ marginTop: 20 }}>{props.children || t('loading')}</div>
    </div>
  );
};
