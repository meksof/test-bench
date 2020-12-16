import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LanguageService } from './services/language.service';

@Injectable({
    providedIn: 'root'
})
export class MainLangResolver implements Resolve<boolean> {

    constructor(
        private languageService: LanguageService
    ) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.languageService.loadLanguageByAppName(null);
    }
}
