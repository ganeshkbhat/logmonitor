import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TagInputComponent } from '../commons/tag-input/tag-input.component';
import { TagInputItemComponent } from '../commons/tag-input-item/tag-input-item.component';
import { TagInputMapComponent } from '../commons/tag-input-map/tag-input-map.component';

import { CommonEventsService } from '../../services/commons/events/events.service';
import { SocketsService } from '../../services/commons/sockets/sockets.service';
import { CommonsService } from '../../services/commons/functions/commons/commons.service';
import { DataService } from '../../services/commons/data/data.service';
import { StaticDataService } from '../../services/static/data/static.data.service';
import { StaticEventsService } from '../../services/static/events/static.events.service';
import { StaticSocketsService } from '../../services/static/sockets/static.sockets.service';
import { StreamDataService } from '../../services/stream/data/stream.data.service';
import { StreamEventsService } from '../../services/stream/events/stream.events.service';
import { StreamSocketsService } from '../../services/stream/sockets/stream.sockets.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    TagInputComponent,
    TagInputItemComponent,
    TagInputMapComponent
  ],
  providers: [
    CommonEventsService,
    SocketsService,
    CommonsService,
    DataService,
    StaticDataService,
    StaticEventsService,
    StaticSocketsService,
    StreamDataService,
    StreamEventsService,
    StreamSocketsService
  ],
  exports: [
    TagInputComponent,
    TagInputItemComponent,
    TagInputMapComponent
  ]
})
export class CommonscmpModule { }
