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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SafeHtmlPipe
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
    MegaMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
