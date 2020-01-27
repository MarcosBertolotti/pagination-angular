import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list-pagination',
  templateUrl: './product-list-pagination.component.html',
  styleUrls: ['./product-list-pagination.component.css']
})
export class ProductListPaginationComponent implements OnInit {

  @Input()
  page: number
  @Input()
  maxPage: number

  arr = Array; // para poder mostrar todas las paginas, no lo uso

  @Output()
  selectedPageEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  selectPage(numPage: number): void
  {
    this.selectedPageEvent.emit(numPage);
  }

}
