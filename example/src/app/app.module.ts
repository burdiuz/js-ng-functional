import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, TestComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { ResourceComponent } from './resource/resource.component';
import { FooterLinkComponent } from './footer-link/footer-link.component';
import { CommandComponent } from './command/command.component';
import { CommandDisplayComponent } from './command-display/command-display.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ResourcesComponent } from './resources/resources.component';
import { NextStepsComponent } from './next-steps/next-steps.component';
import { FooterLinksComponent } from './footer-links/footer-links.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ResourceComponent,
    TestComponent,
    FooterLinkComponent,
    CommandComponent,
    CommandDisplayComponent,
    HeaderComponent,
    FooterComponent,
    ResourcesComponent,
    NextStepsComponent,
    FooterLinksComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
