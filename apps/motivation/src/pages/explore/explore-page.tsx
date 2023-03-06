import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import { DataManager } from '@gtn/app-common/data/DataManager';
import styles from './explore-page.module.scss';
import { Link } from 'react-router-dom';
import { AppRoutingPaths } from '../AppRoutingPaths';
import { useAppTranslation } from '@gtn/app-common/utils/HookUtils';

export function ExplorePage() {
  const dataManager = InjectionContainer.resolve(DataManager);
  const t = useAppTranslation();

  if (dataManager.getCategories()) {
    return (
      <div className={styles.container}>
        <h1>{t('explore.headline')}</h1>
        <p>{t('explore.description')}</p>
        {dataManager.getCategories()?.map((category) => {
          return (
            <div className={styles.categoryContainer}>
              <div className={styles.icon}>
                <img src={'assets/img/' + category.icon} alt="" />
              </div>
              <Link
                className={styles.link}
                to={AppRoutingPaths.CATEGORY_DETAIL + '?id=' + category.id}
              >
                <h1 className={styles.category}>{category.title}</h1>
                <div className={styles.articles}>8 Artikel</div>
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
