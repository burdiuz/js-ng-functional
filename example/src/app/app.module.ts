import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, TestComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ResourceComponent } from './resource/resource.component';

console.log(TestComponent);

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ResourceComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
