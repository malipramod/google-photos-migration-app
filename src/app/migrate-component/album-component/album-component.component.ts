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
    // this.image="https://lh3.googleusercontent.com/lr/AJ-EwvkFqMyePPCt4aFiDLeEelJZxPS5Tif8bP6tqCieVqnTDqLQ68lpYkE0MVzss1C7ZivdVPFL-fTnCyxLzC4zG8b8QDaf0Jv_4zvucHMQ2ZtcGk4JMuWznFo-jMhWl_PPQ4DFBp1UBSw2tkW0nQ8cwIaOWXhcK3BhkGn4gm8Nw2JxTe5R_kzD27HYD19uOih7z33rRoOyhbwnUOvYUEiaHnHP4e3lgA1BFHr_MLYUdMCGmVmQzd0_dlKIi1hlCZiUb92eLok6845DZ62jcsUSZE0WlIhjg7nNLXEHJFdFoaRLNUW032J6DOeL71rHQEUBpFRMZHAS9TxaIk8YPVbZ8IjTCmydQUZNxNsKlMzlhQ3uf4ctaC39E_r8OLsk9L-N8L1tkslt8d64xEM0Vy7H4RocEyBeP0ub8yVL8gG-nybdolPqIfasjU9VAMol9jH4uLbT9jPFKGBrmdAmt8qDCcur9qlIvYayZn0tLKV0ELFLKKY0R0ESxiSV4xx0nHduPY6imLQRS7U5iXKnBoOlH8yTFZdzVBt1ckHutTBa26gzZX2epbccatW1ENuIA5fUpYD-53gOh7pFtKWJj--1OG5sb_frSm6Uq-E341zGNoSV_1hhMBCEG_HTiVf7LN9QthR2VtD-LgoWReNX1qE2yValgOI3bYF1Fk8q63qJ9_VRMXnt0RepIWbKBf_bM5cjZb0PPwvf_pXSw8D6Geg8JIA6QJKCtRaU9nQdoVYDdSed3_CqmDjQzYdPYsvxG_nk7IRqY9p83UBTTuye47xx42HHhLmOEja0hwPzEdpmhY2skP3r4Pq8cD2FES6rQZsJT0nNZUd3tQVU6Cb5h82XGUfNbaS5HbGRasEIPfIodSFInyyK_vvTrnrhPqesXS2YDBJW1lUMVfJUh_2R4QB8Fu6BR9rBd5H1aEeUhAeW";
  }

}
