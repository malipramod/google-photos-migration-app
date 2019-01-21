import { Component, ElementRef } from '@angular/core';
import { LoginComponentService } from './login-component.service';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  sourceTitle: string = 'Source';
  destinationTitle: string = 'Destination';
  public loginToGoogle(type: string) {
    resolve(this.loginComponentService.googleInit(type, this.element));
    console.log(this.loginComponentService.checkLogIn());
  }

  constructor(private element: ElementRef, private loginComponentService: LoginComponentService) {
  }
}
