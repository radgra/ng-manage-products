import { map, startWith } from 'rxjs/operators';
import { IProductWithSupplier } from './../services/products.service';
import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Observable, concat, of } from 'rxjs';

export enum FilterEnum {
  all,
  outOfStock,
  inStock,
  scarce
}
export interface IProductWithSupplierRow extends IProductWithSupplier {
  selected:boolean
} 

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit {
  title = "Manage Products"
  products$:Observable<IProductWithSupplierRow[]>
  constructor(private productsService:ProductsService) { }

  ngOnInit() {
    const productsService$ = this.productsService.getProductsWithSuppliers().pipe(
      map(prod => prod.map((p:IProductWithSupplierRow) => {
        p.selected = false
        return p
      }))
    )
  this.products$ = concat(of([]), productsService$)

  }


  tabSelectionChange(event) {
    console.log(event)
  }

}
