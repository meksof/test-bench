import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'aa-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: [
        './jobs.component.scss'
    ]
})
export class JobsComponent implements OnInit, OnDestroy
{
    translationKey: string = 'BACKUP.JOBS.LIST.TABLE.DURATION';
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
