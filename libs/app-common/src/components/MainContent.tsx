/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Container } from '@material-ui/core';
import React from 'react';
import { ChildrenProps } from '@gtn/app-common/components/ChildrenProps';
import { StyleProps } from '@gtn/app-common/components/StyleProps';

export const MainContent = (props: ChildrenProps & StyleProps) => (
  <Container
    className={props.className}
    maxWidth="lg"
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      background: 'var(--color-background)',
      color: 'var(--color-text1OnBackground)',
      padding: 'var(--page-padding)',
      ...props.style,
    }}
  >
    {(props as any).children}
  </Container>
);
