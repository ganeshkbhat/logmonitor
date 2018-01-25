import { Injectable } from '@angular/core';
import { CommonEventsService } from '../events/events.service';

/**
 * 
 * 
 * @export
 * @class EventsService Injectable/Service
 */

@Injectable()
export class EventsService {

  constructor(private _ces: CommonEventsService) { }

  /**
   * 
   * 
   * @param {any} data 
   * @memberof EventsService
   */
  showMonitor(data) {
    this._ces._sm.emit({ toggle: true });
    this._ces._ss.emit({ toggle: false });
    this._ces._sh.emit({ toggle: false });
    this._ces._tss.emit({ toggle: true, data: data });
  }

  /**
   * 
   * 
   * @param {any} data 
   * @memberof EventsService
   */
  showStatic(data) {
    this._ces._ss.emit({ toggle: true });
    this._ces._sm.emit({ toggle: false });
    this._ces._sh.emit({ toggle: false });
    this._ces._tsts.emit({ toggle: true, data: data });
  }
  
  /**
   * 
   * 
   * @memberof EventsService
   */
  showHome() {
    this._ces._sh.emit({ toggle: true });
    this._ces._ss.emit({ toggle: false });
    this._ces._sm.emit({ toggle: false });
  }

}
