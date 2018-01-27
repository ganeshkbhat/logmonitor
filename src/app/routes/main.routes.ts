import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from '../components/intro/intro.component';

const appRoutes: Routes = [
    { path: 'intro', component:  IntroComponent },
    { path: 'monitor', loadChildren: 'app/components/monitoring/monitoring.module#MonitoringModule' },
    { path: 'viewer', loadChildren: 'app/components/static/static.module#StaticModule' },
    { path: '**', redirectTo: '/intro', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);