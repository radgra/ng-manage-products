import { map } from 'rxjs/operators';
import { IProductWithSupplier } from './../services/products.service';
import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';

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
  products:IProductWithSupplierRow[]
  constructor(private productsService:ProductsService) { }

  ngOnInit() {
    this.productsService.getProductsWithSuppliers().pipe(
      map(prod => prod.map((p:IProductWithSupplierRow) => {
        p.selected = false
        return p
      }))
    )
    .subscribe(products => this.products = products)
  }

  getStylingForStock(row:IProductWithSupplier) {
    if(row.UnitsInStock < 10) return 'unit-shortage'
    return 'unit-in-stock'
  }

  areAllSelected() {
    if(!this.products) return false
    return !this.products.some(p => !p.selected)
  }

  onToggleAll(event) {
    const allSelected = this.areAllSelected()
    if(allSelected) {
      this.products = this.products.map(p => {
        p.selected = false
        return p
      })
    } else {
      this.products = this.products.map(p => {
        p.selected = true
        return p
      })
    }
  }

}
