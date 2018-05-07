import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { HttpModule } from '@angular/http';
import { HeaderModule } from './components/header/header.module';



@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
  HeaderModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
