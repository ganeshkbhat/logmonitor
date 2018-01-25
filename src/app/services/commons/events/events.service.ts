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
   * Stream Monitor Screen Event
  */
  _sm: EventEmitter<MenuScreenShows>;

  /*
   * Stream Start Event
  */
  _ss: EventEmitter<MenuScreenShows>;

  /*
   * Stream/Static Menu Hide Event
  */
  _sh: EventEmitter<MenuScreenShows>;

  /*
   * Toggle Stream Stream Settings Show Event
  */
  _tss: EventEmitter<MenuScreenShows>;

  /*
   * Toggle Stream Search Event
  */
  _tssr: EventEmitter<any>;

  /*
   * Toggle Static Settings Show Event
  */
  _tsts: EventEmitter<MenuScreenShows>;

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
    this._sm = new EventEmitter();
    this._ss = new EventEmitter();
    this._sh = new EventEmitter();
    this._tss = new EventEmitter();
    this._tssr = new EventEmitter();
    this._tsts = new EventEmitter();
    this._tstf = new EventEmitter();
    this._ssc = new EventEmitter();
    this._sscstart = new EventEmitter();
  }
  
}
