import { Injectable } from '@angular/core';

/* Declaring global variable io for sockets */
declare var io;

/**
 * 
 * 
 * @export
 * @class SocketsService Injectable/Service
 */

@Injectable()
export class SocketsService {

  /* Sockets object */
  sockets: any;

  constructor() {
    let that = this;
    this.sockets = io.connect('https://localhost:9010/');
  }

  /**
   * 
   * 
   * @returns 
   * @memberof SocketsService
   */
  getSocket() {
    return this.sockets;
  }

}
