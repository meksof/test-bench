import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs/jobs.component';
import { CustomerBckpRouting } from './bckp.routing';
import { BckpComponent } from './bckp.component';
import { SharedModule } from 'src/app/_common/shared.module';
import { BckpLangResolver } from 'src/app/_app/bckp/resolvers/bckp-lang.resolver';



@NgModule({
  declarations: [
    JobsComponent,
    BckpComponent
  ],
  imports: [
    CustomerBckpRouting,
    CommonModule,
    SharedModule
  ],
  providers: [
    BckpLangResolver
  ]
})
export class BckpModule { }
