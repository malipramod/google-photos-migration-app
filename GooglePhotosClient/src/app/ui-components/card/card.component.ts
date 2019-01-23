import { Component, OnInit, Input } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
