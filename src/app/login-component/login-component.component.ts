import { Component, ElementRef, OnInit } from '@angular/core';
import { LoginComponentService } from './login-component.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  sourceTitle: string;
  destinationTitle: string;
  srcImage: string = "";
  destImage: string = "";
  srcExpiresIn:number = 0;
  destExpiresIn:number = 0;

  public loginToGoogle(type: string) {
    this.loginComponentService.googleInit(this.element, type).then(
      (val) => {
        if (type === 'src') {
          this.sourceTitle = localStorage.getItem("loggedInEmailSrc");
          this.srcImage = localStorage.getItem("loggedInImageSrc");
        } else if (type === 'dest') {
          this.destinationTitle = localStorage.getItem("loggedInEmailDest");
          this.destImage = localStorage.getItem("loggedInImageDest");
        }
        if (this.loginComponentService.checkLogIn()) {
          setTimeout(() => {
            this.router.navigateByUrl("/Migrate");
          }, 500);
        }
      },
      (err) => { console.log(err) }
    );
  }

  ngOnInit() {
    let now:Date = new Date();

    this.sourceTitle = localStorage.getItem("loggedInEmailSrc") ? localStorage.getItem("loggedInEmailSrc") : "Login with Google";
    this.srcImage = localStorage.getItem("loggedInImageSrc") ? localStorage.getItem("loggedInImageSrc") : "";
    this.destinationTitle = localStorage.getItem("loggedInEmailDest") ? localStorage.getItem("loggedInEmailDest") : "Login with Google";
    this.destImage = localStorage.getItem("loggedInImageDest") ? localStorage.getItem("loggedInImageDest") : "";
    this.srcExpiresIn = Math.floor((Number.parseInt(((new Date(localStorage.getItem('GoogleToeknExpiresSrc'))).getTime() - now.getTime()).toString()))/(1000*60));
    this.destExpiresIn = Math.floor((Number.parseInt(((new Date(localStorage.getItem('GoogleToeknExpiresDest'))).getTime() - now.getTime()).toString()))/(1000*60));


  }

  constructor(private element: ElementRef, private loginComponentService: LoginComponentService, private router: Router) {
  }

}
