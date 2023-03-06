import React from 'react';
import { RouteProps } from 'react-router-dom';

export interface GtnRoute extends RouteProps {
	requireLogin?: boolean;
	blocked?: boolean;
	content: React.ElementType;
	title?: string;
	backRoute?: string;
}
