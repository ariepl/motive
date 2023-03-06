
export class Utils {
  public static parseQuery(queryString: string): {[key: string]: string} {
    const query = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      // @ts-ignore
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  public static filterNullOrUndefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
  }

  public static capitalize(text?: string) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
  }

  public static deepMerge<T>(target: T, ...sources: Partial<T>[]): T {
    const isObject = (item: any): boolean => {
      return item === Object(item) && !Array.isArray(item);
    };

    // return the target if no sources passed
    if (!sources.length) {
      return target;
    }

    const result: T = target;

    if (isObject(result)) {
      const len: number = sources.length;

      for (let i = 0; i < len; i += 1) {
        const elm: any = sources[i];

        if (isObject(elm)) {
          for (const key in elm) {
            if (elm.hasOwnProperty(key)) {
              if (isObject(elm[key])) {
                if (!result[key] || !isObject(result[key])) {
                  result[key] = {};
                }
                this.deepMerge(result[key], elm[key]);
              } else {
                if (Array.isArray(result[key]) && Array.isArray(elm[key])) {
                  // concatenate the two arrays and remove any duplicate primitive values
                  result[key] = Array.from(new Set(result[key].concat(elm[key])));
                } else {
                  result[key] = elm[key];
                }
              }
            }
          }
        }
      }
    }

    return result;
  }

}
