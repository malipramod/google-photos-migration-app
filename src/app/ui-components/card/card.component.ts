import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() coverPhotoBaseUrl: string;
  @Input() mediaItemsCount: string;
  @Input() productUrl: string;
  @Input() title: string;
  @Input() id: string;
  @Output() migrateAlbum:EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  startMigrateAlbum(albumId:string){
    this.migrateAlbum.emit(albumId);
  }

}
