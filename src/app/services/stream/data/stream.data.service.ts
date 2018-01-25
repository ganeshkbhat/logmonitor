import { Injectable } from '@angular/core';
import { DataService } from '../../commons/data/data.service';

/**
 * 
 * 
 * @export
 * @class StreamDataService Injectable/Service
 * @extends {DataService}
 */

@Injectable()
export class StreamDataService extends DataService {

    /* Log settings and data */
    streamSettings: Boolean = true;

    /* XTermJS scrollback settings */
    streamScrollback = 2000;

    /* Log Type - JSON or Delimiter or Standard types */
    streamLogType: String = '';
    streamLogFileOptions: String[] = [
      'JSON File',
      'Comma Seperated',
      'Semi-Colon Seperated',
      'Space Seperated',
      'Tab Seperated',
      'Single Quote Seperated',
      'Double Quote Seperated',
      'Square Bracket Seperated',
      'Round Bracket Seperated',
      'Define Other Seperator for', 
      'Bunyan (JSON) Default format',
      'Winston (JSON) Default format',
      'Apache HTTPD (Space) Default format',
      'Apache TOMCat (Space) Default format',
      'NGinx (Space) Default format',
      'Unknown (Prints text lines)'
    ];

    /* Log Custom Seperator Options */
    streamLogSeperatorType: String = '';
    streamLogSeperatorTypeOptions: String[] = [
      'One Side Seperator',
      'Two Side Seperator'
    ];

    streamLogSingleSeperator: String = '';
    streamLogDualSeperatorOne: String = '';
    streamLogDualSeperatorTwo: String = '';

    /* Auth Details */
    streamShowAuthFileOptions: String[] = [
      'Auth',
      'Type',
      'Filter',
      'Graph'
    ];
    streamShowAuthFile: String = 'Auth';
    streamAuthTypeOptions: String[] = [
      'No Authentication or Local File',
      'Root or Other User\'s File (Linux)'
    ];
    streamAuthType: String = '';
    
    /* Log File Path Option Settings */
    streamLogFilePathString: String = '';

    /* Log Column details */
    streamLogColumns: String = '';
    streamLogColumnsFormat: String[] = ['one'];
    streamLogColumnsKeys: String[] = ['one'];

    /* Log Search Settings */
    streamSearch: Boolean = false;
    streamsearch: any = {
        msg: '',
        pid: '',
        time: '',
        hostname: ''
    };

    /* Decide size and clear it from memory (Choice of no storage?) */
    streamLogs: any[] = [];
    streamKeys: any[] = [];
    
    /* Filter Settings */
    streamFilterKeyList: String[] = [];

    /* Graph Settings */
    streamGraphSettings: Boolean = true;

    streamGraphXAxis: String = '';
    streamGraphXRange: number[] = [];
    streamGraphXInterval: number = 1;

    streamGraphYAxis: String = '';
    streamGraphYRange: number[] = [];
    streamGraphYInterval: number = 1;

    constructor() {
      super();
     }

}
