import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'aa-requests',
    templateUrl: './requests.component.html',
    styleUrls: [
        './requests.component.scss'
    ]
})
export class RequestsComponent implements OnInit, OnDestroy
{
    translationKey: string = 'ITSM.TABLE.DATE';
    instantTranslation: string;
    asyncTranslation: Observable<string>;
    constructor(
        private translate: TranslateService
    ) { }

    ngOnInit ()
    {
        this.asyncTranslation = this.translate.get(this.translationKey);
        this.instantTranslation = this.translate.instant(this.translationKey);
    }

    ngOnDestroy (): void
    {
    }
}
