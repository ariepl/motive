import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import { DataManager } from '@gtn/app-common/data/DataManager';
import styles from './categoryDetail-page.module.scss';
import { Link, useParams } from 'react-router-dom';
import { AppRoutingPaths } from '../AppRoutingPaths';
import { useAppTranslation } from '@gtn/app-common/utils/HookUtils';
import { useMemo } from 'react';

import { NumberParam, useQueryParams } from 'use-query-params';

export function CategoryDetailPage() {
  const dataManager = InjectionContainer.resolve(DataManager);
  const t = useAppTranslation();
  //const categoryId = useParams();

  const [params] = useQueryParams({
    articleId: NumberParam,
    categoryId: NumberParam,
  });

  //todo: replace 1 with categoryId
  const category = useMemo(
    () => dataManager.getCategoryById(1),
    [params.categoryId]
  );

  console.log(category);

  if (category) {
    return (
      <div className={styles.container}>
        <h1>{category.title}</h1>
        <p>{t('categories.description')}</p>
        {category.articles?.map((article) => {
          return (
            <div className={styles.categoryContainer}>
              <Link
                className={styles.link}
                to={
                  AppRoutingPaths.ARTICLES +
                  '?articleId=' +
                  article.id +
                  '&categoryId=' +
                  category.id
                }
              >
                {article.title}
              </Link>
              <div className={styles.arrow}>
                <img src={'assets/img/right-arrow.svg'} alt=""></img>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return <></>;
}
