import {
  Component,
  OnInit, AfterViewInit, AfterViewChecked,
  ViewChild, ElementRef
} from '@angular/core';
import { CommonEventsService } from '../../../services/commons/events/events.service';
import { StreamEventsService } from '../../../services/stream/events/stream.events.service';
import { StreamDataService } from '../../../services/stream/data/stream.data.service';
import { StreamSocketsService } from '../../../services/stream/sockets/stream.sockets.service';
import 'rxjs/add/operator/filter';

declare var Terminal;

@Component({
  selector: 'app-monitorlogs',
  templateUrl: './monitorlogs.component.html',
  styleUrls: ['./monitorlogs.component.css']
})
export class MonitorlogsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  xterm: any;
  count: number = 1;
  
  constructor(public _es: StreamEventsService, public _ces: CommonEventsService, public _ds: StreamDataService, public _ss: StreamSocketsService) {
    let that = this;
    this._ces._ssc.subscribe((data) => {
      if (!that._ds.streamSettings && that.xterm && that.myCanvas) {
        that.xterm.open(that.myCanvas.nativeElement, true);
        that.xterm.fit();

        if (document.body.clientWidth > 1026) {
          that.xterm.resize(document.body.clientWidth / 8, 30);
        } else if (document.body.clientWidth > 800) {
          that.xterm.resize(document.body.clientWidth / 9, 30);
        } else if (document.body.clientWidth < 800 && document.body.clientWidth > 600) {
          that.xterm.resize(document.body.clientWidth / 10, 25);
        } else if (document.body.clientWidth < 600) {
          that.xterm.resize(document.body.clientWidth / 12, 20);
        }

        that._ss.startStreaming(that._ds.streamLogFilePathString);
        
      }
    });
    this._ces._sscstart
    .subscribe((data: any) => {
      that.xterm.write(`\r\n` + JSON.stringify(data) + that.count++);
    });
  }

  ngOnInit() {}

  restartStreaming() {}

  stopStreaming() {}

  ngAfterViewInit() {}

  ngAfterViewChecked() {
    let that = this;
    if (!that._ds.streamSettings && !that.xterm) {
      Terminal.scrollback = that._ds.streamScrollback;
      that.xterm = new Terminal();
      that._ss.startStreaming(that._ds.streamLogFilePathString);
      that._ces._ssc.emit();
    } else if (that._ds.streamSettings && that.xterm) {
      that.xterm = undefined;
    }
  }

}
