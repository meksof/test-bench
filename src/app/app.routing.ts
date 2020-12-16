import { RouterModule, Routes } from '@angular/router';
import { MainLangResolver } from './_common/main-lang.resolver';


// * Debug des routes en DEV uniquement
// * Passer la valeur suivante à true pour cela
const devEnableTracing = false;

const appRoutes: Routes = [
    {
        path: '', resolve: { lang: MainLangResolver},
        children: [
            {
                path: '',
                loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
            }
        ]
    }
];

export const AppRoutingModule = RouterModule.forRoot(
    appRoutes,
    {
        paramsInheritanceStrategy: 'always',
        // ! Ne pas modifier le code ci-dessous
        enableTracing: devEnableTracing
        // ! Fin de l'alerte
    }
);
