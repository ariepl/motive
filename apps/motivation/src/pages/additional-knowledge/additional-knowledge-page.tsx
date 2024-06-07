import React from 'react';
import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import { DataManager } from '@gtn/app-common/data/DataManager';
import styles from './additional-knowledge-page.module.scss';
import { Link, useParams } from 'react-router-dom';
import { AppRoutingPaths } from '../AppRoutingPaths';
import { useAppTranslation } from '@gtn/app-common/utils/HookUtils';
import { useMemo } from 'react';
import { NumberParam, useQueryParams } from 'use-query-params';

export function AdditionalKnowledgePage() {
  const dataManager = InjectionContainer.resolve(DataManager);
  const t = useAppTranslation();
  const [params] = useQueryParams({
    id: NumberParam,
  });

  const additionalIdNumber = params.id || 1;

  const additional = useMemo(
    () => dataManager.getAdditionalById(additionalIdNumber),
    [additionalIdNumber, dataManager]
  );

  if (additional) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.containerInverted}>
            <div className={styles.backButtonContainer}>
              <Link
                to={AppRoutingPaths.KNOWLEDGE}
                className={styles.backButton}
              >
                <div className={styles.arrow}>
                  {' '}
                  <img
                    src={'assets/img/right-arrow.svg'}
                    alt=""
                    className={styles.arrowIcon}
                  ></img>{' '}
                </div>
                Zurück
              </Link>
            </div>
            <div className={styles.icon}>
              <img src={'assets/img/lightbulb.svg'} alt="" />
            </div>
            <h1>{additional.title}</h1>
          </div>
          <div className={styles.menuContainer}>
            {additional.text.map((question, index) => (
              <div key={index}>
                <p className={additional.id === 3 ? styles.question : ''}>
                  {question}
                </p>
                <p>{additional.answer && additional.answer[index]}</p>
                {index !== additional.text.length - 1 && <br />}{' '}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
