import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
declare const gapi: any;

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements AfterViewInit {
  private clientId: string = '62681126361-p2dmnds3qt7h1e52ds98po6eem5f4f7i.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }

  public attachSignin(element: any) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();        
        localStorage.setItem("GoogleTokenSrc",googleUser.getAuthResponse().id_token);
        localStorage.setItem("GoogleIdSrc",profile.getId());
        localStorage.setItem("GoogleToeknExpiresSrc",(new Date(googleUser.getAuthResponse().expires_at)).toString());


      }, function (error: any) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }


  ngAfterViewInit(): void {
    this.googleInit();
  }

  constructor(private element: ElementRef) {
    console.log('ElementRef: ', this.element);
  }
}
