import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './themes/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BuyFormComponent } from './widget/buy-form/buy-form.component';
import { SellFormComponent } from './widget/sell-form/sell-form.component';
import { SpinnerComponent } from './utilities/spinner/spinner.component';
import { DialogComponent } from './utilities/dialog/dialog.component';

@NgModule({
  declarations: [AppComponent, WidgetComponent, BuyFormComponent, SellFormComponent, SpinnerComponent, DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
