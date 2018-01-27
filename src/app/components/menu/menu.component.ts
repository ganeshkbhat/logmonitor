import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/commons/data/data.service';
import { StreamDataService } from '../../services/stream/data/stream.data.service';
import { StaticDataService } from '../../services/static/data/static.data.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private _ds: DataService, private _sds: StreamDataService, private _stds: StaticDataService, private _rtr: Router) { 
    
  }

  ngOnInit() {
  }

  showHome() {
    this._ds.stream = true;
    this._ds.home = true;
    this._rtr.navigateByUrl('/intro');
    return false;
  }

  showMonitor(data) {
    this._ds.stream = true;
    this._ds.home = false;
    this._sds.streamSettings = true;
    this._sds.streamShowAuthFile = 'Auth';
    this._rtr.navigateByUrl('/monitor/settings');
    return false;
  }

  showStatic(data) {
    this._ds.stream = false;
    this._ds.home = false;
    this._stds.staticSettings = true;
    this._rtr.navigateByUrl('/viewer/settings');
    return false;
  }

  showSystem(data) {

    return false;
  }

}
