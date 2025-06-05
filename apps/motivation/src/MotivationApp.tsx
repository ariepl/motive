import { AppNavigation } from '@gtn/app-common/navigation/AppNavigation';
import { useMemo } from 'react';
import { GtnRoute } from '@gtn/app-common/utils/routing/GtnRoute';
import { ExplorePage } from './pages/explore/explore-page';
import { SuggestionsPage } from './pages/suggestions/suggestions-page';
import { KnowledgePage } from './pages/knowledge/knowledge-page';
import { QuestionsPage } from './pages/questions/questions-page';
import { CategoryDetailPage } from './pages/categoryDetail/categoryDetail';
import { AppRoutingPaths } from './pages/AppRoutingPaths';
import { CommonRoutingPaths } from '@gtn/app-common/AppCommonRouting';
import { Redirect } from 'react-router-dom';
import { NavigationItem } from '@gtn/app-common/navigation/NavigationItem';
import './styles.scss';
import { ArticlesPage } from './pages/articles/articles-page';
import { ResultsPage } from './pages/results/results-page';
import { WelcomePage } from './pages/welcome/welcome-page';  // Importiere die WelcomePage
import { AdditionalKnowledgePage } from './pages/additional-knowledge/additional-knowledge-page';

export default function MotivationApp() {
  const routes: GtnRoute[] = useMemo(() => {
    return [
      {
        path: CommonRoutingPaths.HOME,
        exact: true,
        content: () => <Redirect to={`/${AppRoutingPaths.WELCOME}`} />, // Hier wird zur WelcomePage weitergeleitet
      },
      {
        path: `/${AppRoutingPaths.WELCOME}`,
        content: () => <WelcomePage />, // Die Route für die Willkommensseite
        title: 'welcome.page-title',
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
      {
        path: `/${AppRoutingPaths.QUESTIONS}`,
        content: () => <QuestionsPage />,
        title: 'questions.page-title',
      },
      {
        path: `/${AppRoutingPaths.RESULTS}`,
        content: () => <ResultsPage />,
        title: 'results.page-title',
      },
      {
        path: `/${AppRoutingPaths.ADDITIONAL_KNOWLEDGE}`,
        content: () => <AdditionalKnowledgePage />,
        title: 'additional-knowledge.page-title',
      },
    ];
  }, []);

  const navItems: NavigationItem[] = useMemo(() => {
    return [
      {
        title: 'explore.page-title',
        href: AppRoutingPaths.EXPLORE,
        icon: <img src={'assets/img/compass.svg'} alt="" />,
      },
      {
        title: 'suggestions.page-title',
        href: AppRoutingPaths.SUGGESTIONS,
        icon: <img src={'assets/img/magnify.svg'} alt="" />,
      },
      {
        title: 'knowledge.page-title',
        href: AppRoutingPaths.KNOWLEDGE,
        icon: <img src={'assets/img/lightbulb.svg'} alt="" />,
      },
    ];
  }, []);

  return <AppNavigation routes={routes} primaryNavigationItems={navItems} />;
}
