import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StaticComponent } from './components/static/static/static.component';
import { MonitoringComponent } from './components/monitoring/monitoring/monitoring.component';
import { MonitorsettingsComponent } from './components/monitoring/monitorsettings/monitorsettings.component';
import { StaticsettingsComponent } from './components/static/staticsettings/staticsettings.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './components/menu/menu.component';
import { IntroComponent } from './components/intro/intro.component';
import { MonitorlogsComponent } from './components/monitoring/monitorlogs/monitorlogs.component';
import { StaticlogsComponent } from './components/static/staticlogs/staticlogs.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { TagInputItemComponent } from './components/tag-input-item/tag-input-item.component';
import { TagInputMapComponent } from './components/tag-input-map/tag-input-map.component';
import { MonitorgraphsComponent } from './components/monitoring/monitorgraphs/monitorgraphs.component';

import { CommonEventsService } from './services/commons/events/events.service';
import { SocketsService } from './services/commons/sockets/sockets.service';
import { CommonsService } from './services/commons/functions/commons/commons.service';
import { DataService } from './services/commons/data/data.service';
import { EventsService } from './services/commons/menu/events.service';
import { StreamEventsService } from './services/stream/events/stream.events.service';
import { StreamDataService } from './services/stream/data/stream.data.service';
import { StreamSocketsService } from './services/stream/sockets/stream.sockets.service';
import { StaticDataService } from './services/static/data/static.data.service';
import { StaticEventsService } from './services/static/events/static.events.service';
import { StaticSocketsService } from './services/static/sockets/static.sockets.service';
import { OrderByPipe } from 'ngx-pipes';

@NgModule({
  declarations: [
    AppComponent,
    StaticComponent,
    MonitoringComponent,
    MonitorsettingsComponent,
    StaticsettingsComponent,
    SidebarComponent,
    MenuComponent,
    IntroComponent,
    MonitorlogsComponent,
    StaticlogsComponent,
    TagInputComponent,
    TagInputItemComponent,
    TagInputMapComponent,
    MonitorgraphsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    CommonEventsService,
    EventsService,
    SocketsService,
    CommonsService,
    DataService,
    StreamEventsService,
    StreamDataService,
    StreamSocketsService,
    StaticDataService,
    StaticEventsService,
    StaticSocketsService,
    OrderByPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
