import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {RestService} from '../../services/rest.service';

import {NgxMaskModule, IConfig} from 'ngx-mask';
import {DocumentclickDirective} from '../../directives/document-click.directive';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {SplitButtonModule} from "primeng/splitbutton";
import {DropdownModule} from "primeng/dropdown";
import {AvatarModule} from "primeng/avatar";
import {TooltipModule} from "primeng/tooltip";
import {MegaMenuModule} from "primeng/megamenu";
import {TableModule} from "primeng/table";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {AccordionModule} from "primeng/accordion";
import {InputSwitchModule} from "primeng/inputswitch";
import {FieldsetModule} from "primeng/fieldset";
import {SidebarModule} from "primeng/sidebar";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    DocumentclickDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CardModule,
    SplitButtonModule,
    DropdownModule,
    AvatarModule,
    TooltipModule,
    MegaMenuModule,
    TableModule,
    RatingModule,
    TagModule,
    AccordionModule,
    InputSwitchModule,
    FieldsetModule,
    HttpClientModule,       // (Required) For share counts
    HttpClientJsonpModule,  // (Optional) Add if you want tumblr share counts
    NgxMaskModule.forRoot(options),
    SidebarModule
  ],
  exports: [
    TranslateModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CardModule,
    SplitButtonModule,
    DropdownModule,
    AvatarModule,
    TooltipModule,
    MegaMenuModule,
    TableModule,
    RatingModule,
    TagModule,
    AccordionModule,
    InputSwitchModule,
    FieldsetModule,
    DocumentclickDirective,
    NgxMaskModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,       // (Required) For share counts
    HttpClientJsonpModule,  // (Optional) Add if you want tumblr share counts
    SidebarModule
  ],
  providers: [RestService],
})
export class SharedModule {
}
