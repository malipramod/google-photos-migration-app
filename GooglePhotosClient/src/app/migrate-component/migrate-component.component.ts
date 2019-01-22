import { Component, OnInit } from '@angular/core';
import { LoginComponentService } from '../login-component/login-component.service';
import { Router } from '@angular/router';
import { MigrateComponentService } from './migrate-component.service';

@Component({
  selector: 'app-migrate-component',
  templateUrl: './migrate-component.component.html',
  styleUrls: ['./migrate-component.component.css']
})
export class MigrateComponentComponent implements OnInit {

  constructor(private loginService:LoginComponentService,private router:Router,private migrateService:MigrateComponentService) { }

  ngOnInit() {
    if(!this.loginService.checkLogIn()){
      alert('Please Authorize first');
      this.router.navigateByUrl("\Authorize");
    }else{
      this.migrateService.getAllAlbums('src').subscribe(
        (val:any) => console.log(val)
      )
    }
  }



}
