import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/commons/menu/events.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private _es: EventsService) { }

  ngOnInit() {
  }

  showHome() {
    this._es.showHome();
    return false;
  }

  showMonitor(data) {
    this._es.showMonitor(data);
    return false;
  }

  showStatic(data) {
    this._es.showStatic(data);
    return false;
  }

}
