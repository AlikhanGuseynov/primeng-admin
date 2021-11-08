import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CardModule} from 'primeng/card';
import { HeaderComponent } from './header/header.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';
import {AvatarModule} from 'primeng/avatar';
import {TooltipModule} from 'primeng/tooltip';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import {MegaMenuModule} from 'primeng/megamenu';
import {TableModule} from "primeng/table";
import {RatingModule} from "primeng/rating";
import {HttpClientModule} from "@angular/common/http";
import { RequestListComponent } from './request-list/request-list.component';
import {TagModule} from "primeng/tag";
import { SettingsComponent } from './settings/settings.component';
import {AccordionModule} from 'primeng/accordion';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FieldsetModule} from "primeng/fieldset";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SafeHtmlPipe,
    RequestListComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    HttpClientModule,
    TagModule,
    AccordionModule,
    InputSwitchModule,
    FieldsetModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
