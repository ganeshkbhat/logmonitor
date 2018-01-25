import { Injectable } from '@angular/core';

/**
 * 
 * 
 * @export
 * @class CommonsService Injectable/Service
 */

@Injectable()
export class CommonsService {

  constructor() { }

  /**
   * 
   * 
   * @param {any} obj 
   * @returns 
   * @memberof CommonsService
   */
  clone(obj) {
    if (null == obj || 'object' != typeof obj) {
      return obj;
    }
    const copy = obj.constructor();
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr];
      }
    }
    return copy;
  }

}
