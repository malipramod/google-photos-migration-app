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

    constructor(private loginService: LoginComponentService, 
                private router: Router, 
                private migrateService: MigrateComponentService) { }
    albums: any;
    nextButton: string = "Next";
    nextPageToken: string;
    pageToken: string = null;
    mediaMap = [];
    ngOnInit() {
        this.next()
    }
    

    next() {
        if (!this.loginService.checkLogIn()) {
            alert('Please Authorize first');
            this.router.navigateByUrl("\Authorize");
        } else {
            this.migrateService.getAllAlbums('src', this.nextPageToken).then(
                (val: any) => {
                    this.albums = val.data.albums
                    this.nextPageToken = val.data.nextPageToken;
                }
            )
        }
    }

    startMigrateAlbum(album: any) {
        this.migrateService.migrateAlbum(album);
    }
}
