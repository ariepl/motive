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
      Sie sehen hier eine Liste der von Ihnen bevorzugten, pädagogischen Vorgangsweisen.
      <br /><br />
      Die Liste zeigt Ihre Stärken in der Motivationsförderung. Vertiefen Sie Ihre bevorzugten Ansätze mit den vorgeschlagenen Anregungen oder testen Sie neue Methoden, die Ihre Arbeit bereichern.      </p>
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
                to={AppRoutingPaths.CATEGORY_DETAIL + '?id=' + category.id + '&questionnairePoints=' + points}
              >
                <h2 className={styles.category}> {Math.max(points, 0)} Punkte</h2>
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
