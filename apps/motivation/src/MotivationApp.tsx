import { AppNavigation } from '@gtn/app-common/navigation/AppNavigation';
import { useMemo } from 'react';
import { GtnRoute } from '@gtn/app-common/utils/routing/GtnRoute';
import { ExplorePage } from './pages/explore/explore-page';
import { SuggestionsPage } from './pages/suggestions/suggestions-page';
import { KnowledgePage } from './pages/knowledge/knowledge-page';
import { CategoryDetailPage } from './pages/categoryDetail/categoryDetail';
import { AppRoutingPaths } from './pages/AppRoutingPaths';
import { CommonRoutingPaths } from '@gtn/app-common/AppCommonRouting';
import { Redirect } from 'react-router-dom';
import { NavigationItem } from '@gtn/app-common/navigation/NavigationItem';
import './styles.scss';
import { ArticlesPage } from './pages/articles/articles-page';

export default function MotivationApp() {
  const routes: GtnRoute[] = useMemo(() => {
    return [
      {
        path: CommonRoutingPaths.HOME,
        exact: true,
        content: () => <Redirect to={`/${AppRoutingPaths.EXPLORE}`} />,
      },
      {
        path: `/${AppRoutingPaths.EXPLORE}`,
        content: () => <ExplorePage />,
        title: 'explore.page-title',
      },
      {
        path: `/${AppRoutingPaths.SUGGESTIONS}`,
        content: () => <SuggestionsPage />,
        title: 'suggestions.page-title',
      },
      {
        path: `/${AppRoutingPaths.KNOWLEDGE}`,
        content: () => <KnowledgePage />,
        title: 'knowledge.page-title',
      },
      {
        path: `/${AppRoutingPaths.CATEGORY_DETAIL}`,
        content: () => <CategoryDetailPage />,
        title: 'categoryDetail.page-title',
      },
      {
        path: `/${AppRoutingPaths.ARTICLES}`,
        content: () => <ArticlesPage />,
        title: 'articles.page-title',
      },
    ];
  }, []);

  const navItems: NavigationItem[] = useMemo(() => {
    return [
      { title: 'explore.page-title', href: AppRoutingPaths.EXPLORE },
      { title: 'suggestions.page-title', href: AppRoutingPaths.SUGGESTIONS },
      { title: 'knowledge.page-title', href: AppRoutingPaths.KNOWLEDGE },
    ];
  }, []);

  return <AppNavigation routes={routes} primaryNavigationItems={navItems} />;
}
