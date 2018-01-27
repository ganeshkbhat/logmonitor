import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitoringComponent } from '../monitoring/monitoring.component';
import { MonitorsettingsComponent } from '../monitorsettings/monitorsettings.component';
import { MonitorlogsComponent } from '../monitorlogs/monitorlogs.component';
import { MonitorgraphsComponent } from '../monitorgraphs/monitorgraphs.component';

const monitorRoutes: Routes = [
    {
        path: '',
        component: MonitoringComponent,
        children: [
            { path: 'settings', component:  MonitorsettingsComponent },
            { path: 'logs', component:  MonitorlogsComponent },
            { path: 'graphs', component:  MonitorgraphsComponent }
        ]
    }
    
];

export const monitorRoutingProviders: any[] = [
    
];

export const routing: ModuleWithProviders = RouterModule.forChild(monitorRoutes);