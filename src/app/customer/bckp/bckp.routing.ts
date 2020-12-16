import { Route, RouterModule } from '@angular/router';
import { BckpLangResolver } from 'src/app/_app/bckp/resolvers/bckp-lang.resolver';
import { BckpComponent } from './bckp.component';
import { JobsComponent } from './jobs/jobs.component';


const customerBckpRoute: Route = {
    path: '',
    component: BckpComponent,
    data: {
        searchBarPlaceholder: 'PLACEHOLDER.SEARCH'
    },
    children: [
        {
            path: 'jobs',
            component: JobsComponent,
            data: {
                title: 'Backup / Jobs'
            }
        }
    ],
    resolve: {
        language: BckpLangResolver
    }
};

export const CustomerBckpRouting = RouterModule.forChild([
    customerBckpRoute
]);
