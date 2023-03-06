import * as React from 'react';

export interface NavigationItem {
  title: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  hide?: boolean;
}
