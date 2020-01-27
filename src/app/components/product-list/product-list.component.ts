import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  mySize : number;

  productList = Array<Product>();
  total: number;

  page: number = 0;
  size: number = 20;
  direction: string;
  columnSelected: string;
  orderProperty: string; // para condicion ngclass de iconos

  maxPage: number; // para el hijo

  columns = [
    { columnDef: 'productId', header: '#' },
    { columnDef: 'name', header: 'Name' },
    { columnDef: 'description', header: 'Description' }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit()
  {
    this.loadTable();
  }


  loadTable(): void
  {
    this.productService.getProductsPageSize(this.page, this.size)
      .subscribe(
        response => {
          this.productList = response.items;
          this.total = response.total;
          this.calcMaxPage();
        },
        error => {
          console.log(error);
        }
      )
  }


  changeSize(): void
  {
    this.size = this.mySize;
    this.loadTable();
    this.page = 0; // para actualizar la paginación
  }

  calcMaxPage(): void // calcular limite de paginas que tendra el paginador
  {
    this.maxPage = Math.ceil(this.total / this.size); // redondeo para arriba
  }


  sortTable(propertyName: string): void
  {
    this.columnSelected = propertyName;
    this.checkDirection(propertyName);
      
    this.productService.getProductsDirectionOrderByPageSize(this.direction, this.columnSelected, this.page, this.size)
    .subscribe(
      response => {
        this.productList = response.items;
      }
      ,error =>{
        console.log(error);
      }
    )  
  }


  checkDirection(propertyName: string) // para cambiar icono de ordenación con ngClass
  {
    if (this.orderProperty === propertyName)
    {
      this.orderProperty = 'asc' + propertyName;
      this.direction = 'ASC';
    }
    else if (this.orderProperty === 'asc' + propertyName)
    {
      this.orderProperty = propertyName;
      this.direction = 'DESC';
    }
    else
    {
      this.orderProperty = 'asc' + propertyName;
      this.direction = 'ASC';
    }
  }


  changePage(numPage: number): void // cargo tabla segun la pagina que eliga el componente hijo
  {
    this.page = numPage; 
    this.loadTable();
  }

}
