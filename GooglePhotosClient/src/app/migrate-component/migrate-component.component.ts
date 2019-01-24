import { Component, OnInit } from '@angular/core';
import { LoginComponentService } from '../login-component/login-component.service';
import { Router } from '@angular/router';
import { MigrateComponentService } from './migrate-component.service';
import * as AppConstant from '../app.constant';

@Component({
  selector: 'app-migrate-component',
  templateUrl: './migrate-component.component.html',
  styleUrls: ['./migrate-component.component.css']
})
export class MigrateComponentComponent implements OnInit {

  constructor(private loginService: LoginComponentService, private router: Router, private migrateService: MigrateComponentService) { }
  albums: any;
  nextButton: string = "Next";
  nextPageToken: string;
  ngOnInit() {
    if (!this.loginService.checkLogIn()) {
      alert('Please Authorize first');
      this.router.navigateByUrl("\Authorize");
    } else {
      this.migrateService.getAllAlbums('src', null).subscribe(
        (val: any) => {
          this.albums = val.albums;
          this.nextPageToken = val.nextPageToken;
        }
      )
    }
  }

  next() {
    if (!this.loginService.checkLogIn()) {
      alert('Please Authorize first');
      this.router.navigateByUrl("\Authorize");
    } else {
      this.migrateService.getAllAlbums('src', this.nextPageToken).subscribe(
        (val: any) => {
          this.albums = val.albums
          this.nextPageToken = val.nextPageToken;
        }
      )
    }
  }

  startMigrateAlbum(album: any) {
    // this.migrateService.migrateAlbum('src',albumId).subscribe(
    //   (val:any)=>{
    //     console.log(val);
    //   },
    //   (err:string)=>console.log(err)
    // )
    let pageToken = null;
    length = (Math.floor(album.mediaItemsCount / AppConstant.pageSize) + 1);
    for (let i = 0; i < length; i++) {
      this.getItemsFromAlbum('src',album,pageToken)
    }
  }

  getItemsFromAlbum(type: string, album: any, pageToken: string) {
    this.migrateService.getAllItemsFromAlbum(type, album.id, pageToken).subscribe(
      (val: any) => {
        console.log(val);
        pageToken = val.nextPageToken;
      },
      (err: string) => {
        console.log(err);
      }
    )
  }
}
