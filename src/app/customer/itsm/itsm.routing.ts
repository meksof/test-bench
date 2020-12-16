import { Route, RouterModule } from '@angular/router';
import { ItsmLangResolver } from 'src/app/_app/itsm/resolvers/itsm-lang.resolver';
import { ItsmComponent } from './itsm.component';
import { RequestsComponent } from './requests/requests.component';


const customerItsmRoute: Route = {
    path: '',
    component: ItsmComponent,
    data: {
        searchBarPlaceholder: 'PLACEHOLDER.SEARCH'
    },
    children: [
        {
            path: 'requests',
            component: RequestsComponent,
            data: {
                title: 'Service / Requests'
            }
        }
    ],
    resolve: {
        language: ItsmLangResolver
    }
};

export const CustomerItsmRouting = RouterModule.forChild([
    customerItsmRoute
]);
