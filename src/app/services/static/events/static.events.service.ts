import { Injectable } from '@angular/core';
import { CommonEventsService } from '../../commons/events/events.service';

/**
 * 
 * 
 * @export
 * @class StaticEventsService Injectable/Service
 */

@Injectable()
export class StaticEventsService {

  constructor(private _ces: CommonEventsService) { }

  /**
   * 
   * 
   * @param {any} data 
   * @memberof StaticEventsService
   */
  toggleStaticSettings(data) {
    this._ces._tsts.emit({ toggle: true, data: data });
  }

  /**
   * 
   * 
   * @memberof StaticEventsService
   */
  toggleStaticFilter() {
    this._ces._tstf.emit({ toggle: true });
  }

}
