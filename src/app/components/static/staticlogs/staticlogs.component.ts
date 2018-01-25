import { Component, OnInit } from '@angular/core';
import { CommonsService } from '../../../services/commons/functions/commons/commons.service';
import { StaticDataService } from '../../../services/static/data/static.data.service';

@Component({
  selector: 'app-staticlogs',
  templateUrl: './staticlogs.component.html',
  styleUrls: ['./staticlogs.component.css']
})
export class StaticlogsComponent implements OnInit {

  constructor(public _cs: CommonsService, public _ds: StaticDataService) {}

  ngOnInit() {
  }

}
