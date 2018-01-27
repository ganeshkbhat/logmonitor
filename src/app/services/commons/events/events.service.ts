import { Injectable, EventEmitter } from '@angular/core';
import { MenuScreenShows } from '../interfaces/commons';

/**
 * 
 * 
 * @export
 * @class CommonEventsService Injectable/Service
 */

@Injectable()
export class CommonEventsService {
  
  // IMPORTANT: CORE Events file - Dont change events or its properties

  /*
   * Toggle Stream Search Event
  */
  _tssr: EventEmitter<any>;

  
  /*
   * Toggle Static Filter Event
  */
  _tstf: EventEmitter<any>;

  /*
   * Stream Settings Component Instantiate Event
  */
  _ssc: EventEmitter<MenuScreenShows>;

  /*
   * Stream Settings Component Start Event
  */
  _sscstart: EventEmitter<any>;

  constructor() {
    /* 
     * Instantiate all event emitters for listening
    */
    this._tssr = new EventEmitter();
    this._tstf = new EventEmitter();
    this._ssc = new EventEmitter();
    this._sscstart = new EventEmitter();
  }
  
}
