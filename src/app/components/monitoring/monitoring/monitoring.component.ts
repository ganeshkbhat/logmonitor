import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonEventsService } from '../../../services/commons/events/events.service';
import { StreamEventsService } from '../../../services/stream/events/stream.events.service';
import { StreamDataService } from '../../../services/stream/data/stream.data.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

constructor(public _es: StreamEventsService, public _ces: CommonEventsService, public _ds: StreamDataService) {
    let that = this;
    that._ds.streamSettings = true;
    this._ces._tssr.subscribe((data) => {
      if (data.toggle) {
        that._ds.streamSearch = !that._ds.streamSearch;
      }
    });
  }

  ngOnInit() {
  }

  toggleStreamSettings(data) {
    this._ds.streamSearch = true;
    this._ds.streamSettings = false;
    this._ds.streamShowAuthFile = 'Auth';
    return false;
  }

}
