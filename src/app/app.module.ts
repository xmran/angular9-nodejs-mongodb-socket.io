import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeeCreateComponent} from './components/employee-create/employee-create.component';
import {EmployeeEditComponent} from './components/employee-edit/employee-edit.component';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./service/api.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {en_US, NgZorroAntdModule, NZ_I18N} from "ng-zorro-antd";

import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    {provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
