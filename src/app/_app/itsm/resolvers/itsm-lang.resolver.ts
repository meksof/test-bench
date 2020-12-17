import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/_common/services/language.service';


@Injectable(
    {
        providedIn: 'root'
    }
)
export class ItsmLangResolver implements Resolve<boolean>
{
    constructor( private userLanguage: LanguageService) { }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    {
        return this.userLanguage.loadLanguage(['itsm']);
    }
}
