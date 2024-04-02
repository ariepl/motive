import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import { DataManager } from '@gtn/app-common/data/DataManager';
import { GtnButton } from '@gtn/app-common/components/gtn-button/GtnButton';
import styles from './suggestions-page.module.scss';
import { useAppTranslation } from '@gtn/app-common/utils/HookUtils';
import { useState, useEffect } from "react";
import { Question } from "@gtn/app-common/data/Question";

export function SuggestionsPage() {
  const [questions, setQuestions] = useState<Question[]>();
  const [loading, setLoading] = useState(false);

  const dataManager = InjectionContainer.resolve(DataManager);
  const t = useAppTranslation();

  useEffect(() => {
    startQuestions();
  }, []);

  async function startQuestions() {
    setLoading(true);
    try {
      await dataManager.loadQuestionsData();
      const loadedQuestions = dataManager.getQuestions();
      setQuestions(loadedQuestions);
      console.log(loadedQuestions);
    } catch (error) {
      // handle error, such as displaying a notification
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1>{t('suggestions.headline')}</h1>
      <p>{t('suggestions.description')}</p>

      <div className={styles.startContainer}>
        <GtnButton
          label={t('suggestions.start-questions')}
          actionType="primary"
          onClick={startQuestions}
        />
      </div>

      {loading && <p>Loading questions...</p>}

      {questions && (
        <div className={styles.questionsContainer}>
          {questions.map((question, index) => (
            <p key={index}>test</p>
          ))}
        </div>
      )}

      {!loading && !questions && <p>Failed to load questions.</p>}
    </div>
  );
}
