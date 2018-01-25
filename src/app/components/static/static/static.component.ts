import { Component, OnInit } from '@angular/core';
import { CommonEventsService } from '../../../services/commons/events/events.service';
import { StaticEventsService } from '../../../services/static/events/static.events.service';
import { StaticDataService } from '../../../services/static/data/static.data.service';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {

  constructor(public _es: StaticEventsService, public _ds: StaticDataService, public _ces: CommonEventsService) {
      let that = this;
      this._ces._ss.subscribe((data) => {
        if (data.toggle) {
          that._ds.staticMonitor = true;
        } else {
          that._ds.staticMonitor = false;
        }
      });
      this._ces._tsts.subscribe((data) => {
        if (data.toggle && data.data === 'monitor') {
          that._ds.staticSettings = true;
        } else if (data.toggle && data.data === 'settings') {
          that._ds.staticSettings = !that._ds.staticSettings;
        }
      });
      this._ces._tstf.subscribe((data) => {
        if (data.toggle) {
          that._ds.staticFilter = !that._ds.staticFilter;
        }
      });
   }

  ngOnInit() {}

  toggleStaticSettings(data) {
    this._es.toggleStaticSettings(data);
    return false;
  }

  toggleStaticFilter() {
    this._es.toggleStaticFilter();
    return false;
  }

}
