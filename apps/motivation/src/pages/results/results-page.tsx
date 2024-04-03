import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './results-page.module.scss';
import { DataManager } from '@gtn/app-common/data/DataManager';
import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';

interface LocationState {
  categoryPoints: { [key: string]: number };
}

export function ResultsPage() {
  const dataManager = InjectionContainer.resolve(DataManager);
  const location = useLocation<LocationState>();
  const { categoryPoints } = location.state;
  const [motivationData, setMotivationData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dataManager.loadCategoryData('motivation');
        const categories = dataManager.getCategories();
        if (categories) {
          const motivation = categories.find(
            (category) => category.title === 'Motivation'
          );
          if (motivation) {
            setMotivationData(motivation);
          }
        }
      } catch (error) {
        console.error('Error fetching motivation data:', error);
      }
    };

    fetchData();
  }, [dataManager]);

  return (
    <div className={styles.container}>
      <h1>Ergebnisse</h1>
      <div className={styles.resultsContainer}>
        {Object.entries(categoryPoints).map(([categoryId, points]) => (
          <div key={categoryId} className={styles.categoryResult}>
            {/* todo: category titel einfügen */}
            <h2>Kategorie {categoryId}</h2>
            <p>Punkte: {points}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
