// welcome-page.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { GtnButton } from '@gtn/app-common/components/gtn-button/GtnButton';
import styles from './welcome-page.module.scss';

export function WelcomePage() {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={styles.welcomeContainer}>
      <h1 dangerouslySetInnerHTML={{ __html: t('welcome.headline') }} />
      <p>{t('welcome.description')}</p>



      <div className={styles.buttonContainer}>
        <GtnButton
          label={t('welcome.button')}
          actionType="primary"
          onClick={() => history.push('/explore')}
        />
      </div>
    </div>
  );
}
