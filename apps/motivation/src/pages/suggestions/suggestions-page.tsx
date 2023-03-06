import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import { DataManager } from '@gtn/app-common/data/DataManager';
import { GtnButton } from '@gtn/app-common/components/gtn-button/GtnButton';
import styles from './suggestions-page.module.scss';
import { Link } from 'react-router-dom';
import { AppRoutingPaths } from '../AppRoutingPaths';
import { useAppTranslation } from '@gtn/app-common/utils/HookUtils';

export function SuggestionsPage() {
  const dataManager = InjectionContainer.resolve(DataManager);
  const t = useAppTranslation();

  return (
    <div className={styles.container}>
      <h1>{t('suggestions.headline')}</h1>
      <p>{t('suggestions.description')}</p>

      <div className={styles.startContainer}>
        <GtnButton
          label={t('suggestions.start-questions')}
          actionType="primary"
          onClick={startQuestions}
          /*loading={importProgressState === ProgressState.Loading}*/
        />
      </div>
    </div>
  );

  async function startQuestions() {
    //todo Card Questions
  }
}
