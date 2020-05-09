import { IProductWithSupplierRow, FilterEnum } from './../master-page.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs-section',
  templateUrl: './tabs-section.component.html',
  styleUrls: ['./tabs-section.component.scss']
})
export class TabsSectionComponent implements OnInit {
  tabs:number[] = [FilterEnum.all, FilterEnum.inStock, FilterEnum.scarce,  FilterEnum.outOfStock,]
  _products:IProductWithSupplierRow[]
  allProducts:number
  productsInStock:number;
  productsScarce:number;
  productsOutOfStock:number;
  @Output() selectionChange:EventEmitter<number> = new EventEmitter()
  @Input() set products(products:IProductWithSupplierRow[]) {
    this.allProducts = products.length
    this.productsInStock = products.filter(p => p.UnitsInStock > 10).length
    this.productsScarce = products.filter(p => p.UnitsInStock <= 10).length
    this.productsOutOfStock = products.filter(p => p.UnitsInStock === 0).length
    this._products = products
  }
  
  
  constructor() { }

  ngOnInit(): void {
  }

  onTabSelected(e:CustomEvent) {
    const index = e.detail.tabIndex
    this.selectionChange.emit(this.tabs[index])
  }
}
