import { Component, OnInit } from '@angular/core';
import { CommonsService } from '../../../services/commons/functions/commons/commons.service';
import { StaticDataService } from '../../../services/static/data/static.data.service';

@Component({
  selector: 'app-staticsettings',
  templateUrl: './staticsettings.component.html',
  styleUrls: ['./staticsettings.component.css']
})
export class StaticsettingsComponent implements OnInit {

  constructor(public _cs: CommonsService, public _ds: StaticDataService) {}

  ngOnInit() {
  }

}