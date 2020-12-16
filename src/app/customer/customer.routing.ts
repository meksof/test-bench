// -----------------------------------------------------------------------
// <copyright file="customer.routing.ts" company="AntemetA">
//     Copyright (c) AntemetA. All rights reserved.
// </copyright>
// -----------------------------------------------------------------------
import { Route, Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';

const customerRoute: Route = {
    path: '',
    component: CustomerComponent,
    children: [
        {
            path: 'backup',
            loadChildren: () => import('./bckp/bckp.module').then(m => m.BckpModule)
        },
        {
            path: 'service',
            loadChildren: () => import('./itsm/itsm.module').then(m => m.ItsmModule)
        }
    ]
};

const customerRoutes: Routes = [
    customerRoute
];

export const CustomerRoutingModule = RouterModule.forChild(customerRoutes);
