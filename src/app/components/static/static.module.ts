import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonscmpModule } from '../commons/commons.module';
import { staticRoutingProviders, routing } from './routes/static.routes';

import { StaticComponent } from './static/static.component';
import { StaticsettingsComponent } from './staticsettings/staticsettings.component';
import { StaticlogsComponent } from './staticlogs/staticlogs.component';

import { CommonEventsService } from '../../services/commons/events/events.service';
import { SocketsService } from '../../services/commons/sockets/sockets.service';
import { CommonsService } from '../../services/commons/functions/commons/commons.service';
import { DataService } from '../../services/commons/data/data.service';
import { StaticDataService } from '../../services/static/data/static.data.service';
import { StaticEventsService } from '../../services/static/events/static.events.service';
import { StaticSocketsService } from '../../services/static/sockets/static.sockets.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonscmpModule,
    routing
  ],
  declarations: [
    StaticComponent,
    StaticsettingsComponent,
    StaticlogsComponent
  ],
  providers: [
    staticRoutingProviders,
    CommonEventsService,
    SocketsService,
    CommonsService,
    DataService,
    StaticDataService,
    StaticEventsService,
    StaticSocketsService
  ]
})
export class StaticModule { }
