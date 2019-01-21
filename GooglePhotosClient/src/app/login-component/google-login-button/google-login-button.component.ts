import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-google-login-button',
  templateUrl: './google-login-button.component.html',
  styleUrls: ['./google-login-button.component.css']
})
export class GoogleLoginButtonComponent implements OnInit {

  constructor() { }

  @Input() buttonTitle:string;
  ngOnInit() {
  }

}
