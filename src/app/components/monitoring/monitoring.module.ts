import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonscmpModule } from '../commons/commons.module';
import { routing, monitorRoutingProviders } from './routes/monitoring.routes';

import { MonitoringComponent } from './monitoring/monitoring.component';
import { MonitorsettingsComponent } from './monitorsettings/monitorsettings.component';
import { MonitorlogsComponent } from './monitorlogs/monitorlogs.component';
import { MonitorgraphsComponent } from './monitorgraphs/monitorgraphs.component';

import { CommonEventsService } from '../../services/commons/events/events.service';
import { SocketsService } from '../../services/commons/sockets/sockets.service';
import { CommonsService } from '../../services/commons/functions/commons/commons.service';
import { DataService } from '../../services/commons/data/data.service';
import { StreamDataService } from '../../services/stream/data/stream.data.service';
import { StreamEventsService } from '../../services/stream/events/stream.events.service';
import { StreamSocketsService } from '../../services/stream/sockets/stream.sockets.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CommonscmpModule,
    routing
  ],
  declarations: [
    MonitoringComponent,
    MonitorsettingsComponent,
    MonitorlogsComponent,
    MonitorgraphsComponent
  ],
  providers: [ 
    monitorRoutingProviders,
    CommonEventsService,
    SocketsService,
    CommonsService,
    DataService,
    StreamDataService,
    StreamEventsService,
    StreamSocketsService
  ]
})
export class MonitoringModule { }
