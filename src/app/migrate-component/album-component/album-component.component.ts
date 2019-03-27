import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album-component',
  templateUrl: './album-component.component.html',
  styleUrls: ['./album-component.component.css']
})
export class AlbumComponentComponent implements OnInit {

  constructor() { }
  image:string;
  @Input() coverPhotoBaseUrl: string;
  @Input() mediaItemsCount: string;
  @Input() productUrl: string;
  @Input() title: string;
  @Input() id: string;

  ngOnInit() {
  }

}
