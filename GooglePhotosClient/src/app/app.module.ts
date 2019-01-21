import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ElementRef } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule,MatToolbarModule,MatListModule, MatIconModule, MatButtonModule} from '@angular/material';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MigrateComponentComponent } from './migrate-component/migrate-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { GoogleLoginButtonComponent } from './login-component/google-login-button/google-login-button.component';
import { LoginComponentService } from './login-component/login-component.service';

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
    GoogleLoginButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [LoginComponentService],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
