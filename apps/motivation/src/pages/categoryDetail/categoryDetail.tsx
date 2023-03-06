import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import { DataManager } from '@gtn/app-common/data/DataManager';
import styles from './categoryDetail-page.module.scss';
import { Link } from 'react-router-dom';
import { AppRoutingPaths } from '../AppRoutingPaths';
import { useAppTranslation } from '@gtn/app-common/utils/HookUtils';
import { useMemo } from 'react';

export function CategoryDetailPage() {
  const dataManager = InjectionContainer.resolve(DataManager);
  const t = useAppTranslation();
  const categoryId = 1;
  const category = useMemo(
    () => dataManager.getCategoryById(categoryId),
    [categoryId]
  );

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
                to={AppRoutingPaths.ARTICLES + '?id=' + article.id}
              >
                {/* //todo link category d + article id */}
                {/* AppRoutingPaths.CATEGORY_DETAIL + '?id=' + category.id + '&' +
                AppRoutingPaths.ARTICLES + '?id=' + article.id */}

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
