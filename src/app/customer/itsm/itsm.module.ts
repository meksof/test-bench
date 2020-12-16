import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests/requests.component';
import { CustomerItsmRouting } from './itsm.routing';
import { ItsmComponent } from './itsm.component';
import { SharedModule } from 'src/app/_common/shared.module';
import { ItsmLangResolver } from 'src/app/_app/itsm/resolvers/itsm-lang.resolver';



@NgModule({
  declarations: [
    RequestsComponent,
    ItsmComponent
  ],
  imports: [
    CustomerItsmRouting,
    CommonModule,
    SharedModule
  ],
  providers: [
    ItsmLangResolver
  ]
})
export class ItsmModule { }
