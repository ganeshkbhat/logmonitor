import { Injectable } from '@angular/core';
import { SocketsService } from '../../commons/sockets/sockets.service';

/**
 * 
 * 
 * @export
 * @class StaticSocketsService Injectable/Service
 */

@Injectable()
export class StaticSocketsService {

  /* Sockets Object */
  sockets: any;
  
  constructor(public _ss: SocketsService) { 
    let that = this;
    this.sockets = this._ss.getSocket();
  }

}
