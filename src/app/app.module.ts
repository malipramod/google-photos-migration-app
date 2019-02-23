import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ElementRef } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {HttpClientModule } from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { MyNavComponent } from './ui-components/my-nav/my-nav.component';
import { MigrateComponentComponent } from './migrate-component/migrate-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { GoogleLoginButtonComponent } from './login-component/google-login-button/google-login-button.component';
import { LoginComponentService } from './login-component/login-component.service';
import { MigrateComponentService } from './migrate-component/migrate-component.service';
import { AlbumComponentComponent } from './migrate-component/album-component/album-component.component';
import { MaterialModule } from './material.module';
import {ButtonComponent} from './ui-components/button/button.component';
import { CardComponent } from './ui-components/card/card.component';
const appRoute: Routes = [
  { path: 'Migrate', component: MigrateComponentComponent },
  { path: 'Authorize', component: LoginComponentComponent }
];

  

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    MigrateComponentComponent,
    LoginComponentComponent,
    GoogleLoginButtonComponent,
    AlbumComponentComponent,
    ButtonComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(appRoute)
  ],
  providers: [LoginComponentService,MigrateComponentService],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
