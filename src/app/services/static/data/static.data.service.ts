import { Injectable } from '@angular/core';
import { DataService } from '../../commons/data/data.service';

/**
 * 
 * 
 * @export
 * @class StaticDataService Injectable/Service
 * @extends {DataService}
 */

@Injectable()
export class StaticDataService extends DataService {

  /*  */
  staticMonitor: Boolean = false;
  /*  */
  staticSettings: Boolean = true;
  /*  */
  staticFilter: Boolean = false;

  /*  */
  staticLogs: any[] = [];
  /*  */
  staticScrollback = 1000000;

  constructor() {
    super();
  }

}
