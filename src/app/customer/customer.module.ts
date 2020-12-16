import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';

import { CustomerRoutingModule } from './customer.routing';

@NgModule({
    declarations: [
        CustomerComponent
    ],
    imports: [
        CustomerRoutingModule,
        CommonModule
    ]
})
export class CustomerModule { }
