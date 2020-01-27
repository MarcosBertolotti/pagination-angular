import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: '[app-product-list-row]',
  templateUrl: './product-list-row.component.html',
  styleUrls: ['./product-list-row.component.css']
})
export class ProductListRowComponent implements OnInit {

  @Input()
  product: Product;

  constructor() { }

  ngOnInit() {
  }

}
