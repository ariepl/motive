/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button as MaterialButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
import * as React from 'react';
import { useHistory } from '@gtn/app-common/utils/HookUtils';
import { StyleProps } from '@gtn/app-common/components/StyleProps';
import styles from '@gtn/app-common/components/gtn-button/GtnButton.module.scss';

export interface GtnButtonProps extends StyleProps {
  label: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  href?: string;
  type?: 'button' | 'submit';
  loading?: boolean;
  actionType?: 'primary' | 'secondary';
  value?: string;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export function GtnButton(props: GtnButtonProps) {
  const history = useHistory();

  return (
    <div
      className={classNames(styles.container, props.className)}
      style={props.style}
    >
      <MaterialButton
        variant="contained"
        disableElevation={true}
        color={props.actionType}
        disabled={props.loading || props.disabled}
        onClick={(e) => {
          if (props.href) {
            history.push(props.href);
          }
          props.onClick?.(e);
          e.stopPropagation();
        }}
        type={props.type ?? 'button'}
        size={props.size}
        defaultValue={props.value}
      >
        {props.icon && <div className={styles.icon}>{props.icon}</div>}
        {props.label}
      </MaterialButton>

      {props.loading && (
        <div className={styles.loadingContainer}>
          <CircularProgress size={24} />
        </div>
      )}
    </div>
  );
}
