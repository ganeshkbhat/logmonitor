import { Component, OnInit } from '@angular/core';
import { CommonEventsService } from '../../services/commons/events/events.service';
import { DataService } from '../../services/commons/data/data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor(public _es: CommonEventsService, public _ds: DataService) {
    
  }

  ngOnInit() {
  }

}
