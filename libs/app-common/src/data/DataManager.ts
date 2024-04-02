/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { singleton } from 'tsyringe';
import { Category } from './Category';
import { Article } from './Article';
import { Question } from './Question';
import { Additional } from './Additional';
import { GtnLogger } from '@gtn/app-common/utils/logger/GtnLogger';
import InjectionContainer from '@gtn/app-common/utils/InjectionContainer';
import { HttpService } from '@gtn/app-common/api/webservice/HttpService';

@singleton()
export class DataManager {
  getCategoryById(categoryId: number) {
    return this.categories?.find((c) => c.id === categoryId);
  }

  getArticleById(categoryId: number, articleId: number) {
    return this.categories?.find((c) => c.id === categoryId);
  }

  private readonly httpService = InjectionContainer.resolve(HttpService);

  private categories?: Category[];
  private additionals?: Additional[];
  private questions?: Question[];


  public getCategories(): Category[] | undefined {
    return this.categories;
  }

  public getAdditionals(): Additional[] | undefined {
    return this.additionals;
  }

  public getQuestions(): Question[] | undefined {
    return this.questions;
  }

  public async loadCategoryData(fileName: string) {
    try {
      const data = await this.httpService.get<{ categories: Category[] }>(
        `/assets/data/${fileName}.json`
      );

      this.categories = data.categories;
    } catch (e) {
      GtnLogger.warn(`Loading config from ${fileName} failed!`);
    }
  }

  public async loadQuestionsData() {
    try {
      const data = await this.httpService.get<{ questions: Question[] }>(
        '/assets/data/questions.json'
      );

      this.questions = data.questions;
    } catch (e) {
      GtnLogger.warn('Loading questions failed!');
    }
  }

  public async loadAdditionalData(fileName: string) {
    try {
      const data = await this.httpService.get<{ additionals: Additional[] }>(
        `/assets/data/${fileName}.json`
      );

      this.additionals = data.additionals;
    } catch (e) {
      GtnLogger.warn(`Loading config from ${fileName} failed!`);
    }
  }
}
