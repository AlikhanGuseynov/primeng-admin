import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { ListComponent } from './list/list.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule
  ]
})
export class RequestModule { }
