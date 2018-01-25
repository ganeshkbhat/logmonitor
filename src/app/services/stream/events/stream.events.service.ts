import { Injectable, EventEmitter } from '@angular/core';
import { CommonEventsService } from '../../commons/events/events.service';

/**
 * 
 * 
 * @export
 * @class StreamEventsService Injectable/Service
 */

@Injectable()
export class StreamEventsService {

  constructor(private _ces: CommonEventsService) { }
  
  /**
   * 
   * 
   * @param {any} data 
   * @memberof StreamEventsService
   */
  toggleStreamSettings(data) {
    this._ces._tss.emit({ toggle: true, data: data });
  }

  /**
   * 
   * 
   * @memberof StreamEventsService
   */
  toggleStreamSearch() {
    this._ces._tssr.emit({ toggle: true });
  }

}
