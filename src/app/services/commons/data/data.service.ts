import { Injectable } from '@angular/core';

/**
 * 
 * 
 * @export
 * @class DataService Injectable/Service
 */

@Injectable()
export class DataService {
  
  /*  */
  home: Boolean = true;

  /*  */
  stream: Boolean = false;
  /*  */
  hide: String = 'Hide';
  /*  */
  hideStatic: String = 'Hide';

  constructor() { }

}
