import { Component, OnInit, Input } from '@angular/core';
import * as AppConstant from '../../app.constant';

@Component({
  selector: 'app-google-login-button',
  templateUrl: './google-login-button.component.html',
  styleUrls: ['./google-login-button.component.css']
})
export class GoogleLoginButtonComponent implements OnInit {
  googleLogo = AppConstant.googleLogo;
  constructor() { }

  @Input() buttonTitle:string;
  ngOnInit() {
  }

}
