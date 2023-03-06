import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import { DataManager } from '@gtn/app-common/data/DataManager';
import styles from './articles-page.module.scss';
import { Link } from 'react-router-dom';
import { AppRoutingPaths } from '../AppRoutingPaths';
import { useAppTranslation } from '@gtn/app-common/utils/HookUtils';
import { useMemo } from 'react';

export function ArticlesPage() {
  const dataManager = InjectionContainer.resolve(DataManager);
  const t = useAppTranslation();

  const articleId = 1;

  const article = useMemo(
    () => dataManager.getArticleById(articleId),
    [dataManager]
  );

  if (article) {
    return (
      <div className={styles.container}>
        <h1>{article.title}</h1>
        <p>Test</p>
      </div>
    );
  }
  return <></>;
}
