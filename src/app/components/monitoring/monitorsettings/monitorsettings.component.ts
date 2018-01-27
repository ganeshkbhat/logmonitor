import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonEventsService } from '../../../services/commons/events/events.service';
import { StreamEventsService } from '../../../services/stream/events/stream.events.service';
import { StreamDataService } from '../../../services/stream/data/stream.data.service';

@Component({
  selector: 'app-monitorsettings',
  templateUrl: './monitorsettings.component.html',
  styleUrls: ['./monitorsettings.component.css']
})
export class MonitorsettingsComponent implements OnInit {

  constructor(public _es: StreamEventsService, public _ces: CommonEventsService, public _ds: StreamDataService, private _rtr: Router) {
    let that = this;
  }

  ngOnInit() {}

  streamFirstLineFormatShow() {}

  streamKeysShow() {}

  streamColumnsShow() {}

  startStreaming(data) {
    this._ds.streamSearch = true;
    this._ds.streamSettings = false;
    this._ds.streamShowAuthFile = 'Auth';
    this._rtr.navigateByUrl('/monitor/logs');
    return false;
  }

  clearSettings(){
    // Clear all variables first
    this._ds.streamShowAuthFile = 'Auth';
    return false;
  }

  // make this pure function
  shiftStreamSection(moveOption: String) {
    let i = this._ds.streamShowAuthFileOptions.indexOf(this._ds.streamShowAuthFile);
    if ((i === (this._ds.streamShowAuthFileOptions.length - 1) && moveOption === 'next') || (i === 0 && moveOption === 'previous')) {
      this._ds.streamShowAuthFile = this._ds.streamShowAuthFileOptions[i];
    } else {
      if (moveOption === 'p') {
        this._ds.streamShowAuthFile = this._ds.streamShowAuthFileOptions[i-1];
      } else if (moveOption === 'n') {
        this._ds.streamShowAuthFile = this._ds.streamShowAuthFileOptions[i+1];
      }
    }
    return false;
  }

  shiftStreamPrevious() {
    this.shiftStreamSection('p');
    return false;
  }

  shiftStreamNext() {
    this.shiftStreamSection('n');
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

  streamEqualTo(){}
  streamGreaterThan(){}
  streamLesserThan(){}
  streamContains(){}
  streamDoesNotContain(){}
  streamTypeOf(){}
  streamNotTypeOf(){}

  streamAddFilter(){
    return false;
  }

}
