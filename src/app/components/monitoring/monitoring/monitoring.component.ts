import { Component, OnInit } from '@angular/core';
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
    this._ces._sm.subscribe((data) => {
      if (data.toggle) {
        that._ds.stream = true;
      } else {
        that._ds.stream = false;
      }
    });
    this._ces._tss.subscribe((data) => {
      if (data.toggle && data.data === 'monitor') {
        that._ds.streamSettings = true;
      } else if (data.toggle && data.data === 'settings') {
        that._ds.streamSettings = !that._ds.streamSettings;
        if (that._ds.streamSettings === false) {
          that._ces._ssc.emit({toggle: true});
        } else {
          that._ces._ssc.emit({toggle: false});
        }
      } else if (data.toggle && data.data === 'settingshide') {
        that._ds.streamSettings = !that._ds.streamSettings;
      }
    });
    this._ces._tssr.subscribe((data) => {
      if (data.toggle) {
        that._ds.streamSearch = !that._ds.streamSearch;
      }
    });
  }

  ngOnInit() {
  }

  toggleStreamSettings(data) {
    this._es.toggleStreamSettings(data);
    return false;
  }

  toggleStreamSearch() {
    this._es.toggleStreamSearch();
    return false;
  }

  showauth(){
    this._ds.streamShowAuthFile = 'Auth';
    this._ds.streamLogColumns = '';
    return false;
  }

  showtype(){
    this._ds.streamShowAuthFile = 'Type';
    return false;
  }

  showfilter(){
    this._ds.streamShowAuthFile = 'Filter'
    return false;
  }

  showgraph(){
    this._ds.streamShowAuthFile = 'Graph'
    return false;
  }

}
