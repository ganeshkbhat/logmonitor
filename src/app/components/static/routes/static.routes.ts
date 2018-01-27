import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaticsettingsComponent } from '../staticsettings/staticsettings.component';
import { StaticlogsComponent } from '../staticlogs/staticlogs.component';

const staticRoutes: Routes = [
    { path: 'settings', component:  StaticsettingsComponent },
    { path: 'logs', component:  StaticlogsComponent },
    //{ path: 'graphs', component:  MonitorgraphsComponent },
    { path: '**', redirectTo: '/intro', pathMatch: 'full' }
];

export const staticRoutingProviders: any[] = [
    
];

export const routing: ModuleWithProviders = RouterModule.forChild(staticRoutes);