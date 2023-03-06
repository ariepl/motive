import { singleton } from 'tsyringe';
import { GtnLogger } from '../../utils/logger/GtnLogger';
import {
  encodeParamsToFormData,
  encodeUrlParams,
} from './Utils';

@singleton()
export class HttpService {
  public async postWithJSONResponse<T = any>(
    url: string,
    payload: any,
    { useFormData = false } = {}
  ): Promise<T> {
    const response = await this.post(url, payload, { useFormData });

    const responseBody = await response
      .clone()
      .json()
      .catch(async (e) => {
        GtnLogger.warn(
          'Webservice error is not valid JSON: %s',
          await response.text()
        );
      });

    if (!response.ok) {
      throw {
        status: response.status,
        data: responseBody,
      };
    }

    return responseBody;
  }

  public async post(
    url: string,
    payload: any,
    { useFormData = false } = {}
  ): Promise<Response> {
    if (Object.values(payload).find((value) => value instanceof File)) {
      // has file attachment => useFormData
      useFormData = true;
    }

    const headers = {
      Accept: 'application/json',
    };

    let body;
    if (useFormData) {
      body = encodeParamsToFormData(payload);
    } else {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      body = encodeUrlParams(payload);
    }

    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });
    } catch (e) {
      GtnLogger.warn('Request failed: %o', e);
      throw e;
    }

    return response;
  }

  // TODO: extract fetch handling into own method
  public async get<T extends object>(url: string): Promise<T> {
    const headers = {
      Accept: 'application/json',
    };

    let response;
    try {
      response = await fetch(url, {
        method: 'GET',
        headers,
      });
    } catch (e) {
      GtnLogger.warn('Request failed: %o', e);
      throw e;
    }

    const responseBody = await response
      .clone()
      .json()
      .catch(async (e) => {
        GtnLogger.warn(
          'Webservice error is not valid JSON: %s',
          await response.text()
        );
      });

    if (!response.ok) {
      throw {
        status: response.status,
        data: responseBody,
      };
    }

    return responseBody;
  }
}
