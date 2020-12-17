import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { tap, map, concatMap, switchMap, filter, catchError } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';


type areas = 'customer' | 'admin';
type AppName = 'main' | 'bckp' | 'comp' | 'itsm';
interface LoadedLanguage {
    main: boolean;
    bckp: boolean;
    comp: boolean;
}

@Injectable()
export class LanguageService {
    // #region Properties

    private readonly defaultLang = 'en-US';
    private readonly regexpLang: RegExp = /en-US|fr-FR/;

    private _lang: string = this.defaultLang;
    private allReadyLoaded: boolean = false;
    private oldLang: string;

    public loadedLanguages: LoadedLanguage = {
        main: false,
        bckp: false,
        comp: false
    };

    // #endregion Properties

    // #region Constructors

    constructor(
        private translate: TranslateService
    ) {

        this._lang = this.formatLang(this.translate.getBrowserCultureLang());
        this.language = this._lang;

    }

    // #endregion Constructors

    // #region Public Accessors

    public get language(): string {
        return this.translate.currentLang || this._lang;
    }

    public set language(lang: string) {
        this.oldLang = this._lang;
        this._lang = lang;

        this.translate.resetLang(this.oldLang);
        this.translate.use(this._lang);
    }

    // #endregion Public Accessors

    // #region Public Methods

    public getLangs(): string[] {
        return this.translate.getLangs();
    }

    public loadCommonLanguage(): Observable<boolean> {
        if (this.allReadyLoaded) {
            return of(true);
        }

        return this.translate.getTranslation(`${this._lang}`)
            .pipe(
                tap((x: object) => {
                    this.allReadyLoaded = true;
                    this.translate.setTranslation(this._lang, x, false);
                }),
            )
            .pipe(
                switchMap(() => this.loadAppLanguage('bckp'))
            )
            .pipe(
                switchMap(() => this.loadAppLanguage('main', 'admin'))
            );
    }

    loadLanguage(apps?: AppName | AppName[]): Observable<boolean> {
        if (!apps || apps.length === 0)
        {
            return this.loadMainLanguage();
        }

        if (typeof apps === 'string')
        {
            return this.loadAppLanguage(apps);
        }

        if (Array.isArray(apps))
        {
            return from(apps)
                .pipe(
                    concatMap((app: AppName) => this.loadAppLanguage(app)),
                    catchError(() => of(false))
                );
        }

        return of(true);
    }

    public setlanguage(language: string): Observable<boolean> {
        if (language === this.language) {
            return of(true);
        }

        this.allReadyLoaded = false;

        this.language = language;

        return this.loadCommonLanguage();
    }

    // public toggleLanguage(profile: Profile): void
    // {
    //     const idx: number = AppConstants.Languages.findIndex((lg) => lg === this.language);
    //     const next: number = (idx + 1) % (AppConstants.Languages.length);

    //     profile.language = AppConstants.Languages[next];
    //     this.store.dispatch(fromAuthProfileStoreActions.AuthProfileLanguageChanged({ profile: profile }));
    // }

    // #endregion Public Methods

    // #region Private Methods

    private formatLang(l: string): string {
        if (l === 'fr') {
            return 'fr-FR';
        }

        return l.match(this.regexpLang) ? l : this.defaultLang;
    }

    public loadAppLanguage(app: AppName, area: areas = 'customer'): Observable<boolean> {
        if (this.loadedLanguages[app])
        {
            return of(true);
        }

        return this.loadTranslation(`${area}/${app}/${this._lang}`)
            .pipe(
                tap(() => this.loadedLanguages[app] = true)
            );
    }

    private loadMainLanguage(): Observable<boolean> {
        if (this.loadedLanguages.main)
        {
            return of(true);
        }

        return this.loadTranslation(`${this._lang}`)
            .pipe(
                tap(() => this.loadedLanguages.main = true),
                // tap(() => console.debug(this.loadedLanguages.main))
                catchError(() => of(false))
            );
    }

    private loadTranslation(path: string): Observable<boolean> {
        return this.translate.getTranslation(path)
            .pipe(
                tap((x: object) => {
                    this.translate.setTranslation(this._lang, x, true);
                }),
                map(() => true),
                catchError(() => of(false))
            );
    }

    // #endregion Private Methods
}
