import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataManager } from '@gtn/app-common/data/DataManager';
import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import styles from './results-page.module.scss';
import { AppRoutingPaths } from '../AppRoutingPaths';

interface LocationState {
  categoryPoints: { [key: string]: number };
}
export function ResultsPage() {
  const dataManager = InjectionContainer.resolve(DataManager);
  const location = useLocation<LocationState>();
  const { categoryPoints } = location.state;

  const sortedCategoryPoints = Object.entries(categoryPoints).sort(
    (a, b) => b[1] - a[1]
  );

  const getCategoryNameById = (categoryId: string) => {
    const category = dataManager
      .getCategories()
      ?.find((c) => c.id.toString() === categoryId);
    return category ? category.title : 'Kategorie nicht gefunden';
  };

  return (
    <div className={styles.container}>
      <h1>Ergebnisse</h1>
      <p>
        Dies ist eine Rankingliste Ihrer bevorzugten pädagogischen
        Vorgangsweisen, die Ihre Stärken und Effizienz in der
        Motivationsförderung zeigt.
      </p>
      <div className={styles.resultsContainer}>
        {sortedCategoryPoints.map(([categoryId, points]) => {
          const category = dataManager
            .getCategories()
            ?.find((c) => c.id.toString() === categoryId);
          if (!category) return null;

          return (
            <div className={styles.categoryContainer}>
              <div className={styles.icon}>
                <img src={'assets/img/' + category.icon} alt="" />
              </div>
              <Link
                className={styles.link}
                to={AppRoutingPaths.CATEGORY_DETAIL + '?id=' + category.id}
              >
                <h2 className={styles.category}> {points} Punkte</h2>
                <p className={styles.articles}>{category.title}</p>
              </Link>
              <div className={styles.arrow}>
                <img src={'assets/img/right-arrow.svg'} alt=""></img>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
