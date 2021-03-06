import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { NavComponent } from './nav/nav.component';

import{UserService} from './user/user.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderComponentService } from './loader/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent,
    NavComponent,
    LoaderComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UserService,LoaderComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
