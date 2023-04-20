import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import {DataManager} from '@gtn/app-common/data/DataManager';
import styles from './articles-page.module.scss';
import {useAppTranslation} from '@gtn/app-common/utils/HookUtils';
import {useMemo, useState} from 'react';
import {NumberParam, useQueryParams} from 'use-query-params';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function ArticlesPage() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dataManager = InjectionContainer.resolve(DataManager);
  const [params] = useQueryParams({
    articleId: NumberParam,
    categoryId: NumberParam,
  });

  const t = useAppTranslation();

  const category = useMemo(() => {
    if (params.categoryId) {
      return dataManager.getCategoryById(params.categoryId);
    }
    return undefined;
  }, [params.categoryId]);

  const article = useMemo(() => {
    if (category && params.articleId) {
      const articleId = params.articleId;
      return category?.articles.find((a) => a.id === articleId);
    }
    return undefined;
  }, [category, params.articleId]);

  if (article) {
    return (
      <div>
        <div className={styles.containerInverted}>
          <h1>{category!.title}</h1>
          <p>{article.title}</p>
          <div className={styles.icon}>
            <img src={'assets/img/' + category?.icon} alt="" />
          </div>
        </div>

        <AppBar position="static">
          <Tabs variant="fullWidth" onChange={handleChange} value={value}>
            <LinkTab label="Umsetzung" />
            <LinkTab label="Hinweise" />
            <LinkTab label="Satzbeispiele" />
          </Tabs>
        </AppBar>
        <div className={styles.navigationContainer}>
          <TabPanel value={value} index={0}>
            <div dangerouslySetInnerHTML={{ __html: article.implementation }} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div dangerouslySetInnerHTML={{ __html: article.hints }} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div dangerouslySetInnerHTML={{ __html: article.examples }} />
          </TabPanel>
        </div>
      </div>
    );
  }
  return <></>;
}
