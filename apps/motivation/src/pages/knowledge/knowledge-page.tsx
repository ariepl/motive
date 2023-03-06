import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import { DataManager } from '@gtn/app-common/data/DataManager';
import styles from './knowledge-page.module.scss';
import { Link } from 'react-router-dom';
import { AppRoutingPaths } from '../AppRoutingPaths';
import { useAppTranslation } from '@gtn/app-common/utils/HookUtils';

export function KnowledgePage() {
  const dataManager = InjectionContainer.resolve(DataManager);
  const t = useAppTranslation();

  if (dataManager.getAdditionals()) {
    return (
      <div className={styles.content}>
        <div className={styles.containerInverted}>
          <div className={styles.icon}>
            <img src={'assets/img/lightbulb.svg'} alt="" />
          </div>
          <h1>{t('knowledge.headline')}</h1>
          <p>{t('knowledge.description')}</p>
        </div>

        {dataManager.getAdditionals()?.map((additional) => {
          return (
            <>
              <div className={styles.menuContainer}>
                <Link
                  className={styles.item}
                  to={
                    AppRoutingPaths.ADDITIONAL_KNOWLEDGE +
                    '?id=' +
                    additional.id
                  }
                >
                  <h1 className={styles.item}>{additional.title}</h1>
                </Link>
                <div className={styles.arrow}>
                  <img src={'assets/img/right-arrow.svg'} alt=""></img>
                </div>
              </div>
              <hr></hr>
            </>
          );
        })}
      </div>
    );
  }
  return <></>;
}
