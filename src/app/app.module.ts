import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutingProviders, routing } from './routes/main.routes';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IntroComponent } from './components/intro/intro.component';
import { OrderByPipe } from 'ngx-pipes';

import { CommonEventsService } from './services/commons/events/events.service';
import { SocketsService } from './services/commons/sockets/sockets.service';
import { CommonsService } from './services/commons/functions/commons/commons.service';
import { DataService } from './services/commons/data/data.service';
import { StaticDataService } from './services/static/data/static.data.service';
import { StaticEventsService } from './services/static/events/static.events.service';
import { StaticSocketsService } from './services/static/sockets/static.sockets.service';
import { StreamDataService } from './services/stream/data/stream.data.service';
import { StreamEventsService } from './services/stream/events/stream.events.service';
import { StreamSocketsService } from './services/stream/sockets/stream.sockets.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MenuComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    OrderByPipe,
    appRoutingProviders,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
