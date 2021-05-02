import { TableSectionComponent } from './table-section/table-section.component';
import { map, startWith, distinctUntilChanged, scan, switchMap, pluck } from 'rxjs/operators';
import { IProductWithSupplier } from './../services/products.service';
import { ProductsService } from '../services/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, concat, of, BehaviorSubject, combineLatest } from 'rxjs';

export enum FilterEnum {
  all,
  outOfStock,
  inStock,
  scarce
}
export interface IProductWithSupplierRow extends IProductWithSupplier {
  selected: boolean
}

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit {
  @ViewChild(TableSectionComponent) tableSelection: TableSectionComponent
  title = "Manage Products"
  allProducts$: Observable<IProductWithSupplier[]>
  filteredProducts$: Observable<IProductWithSupplier[]>
  tabSelection$: BehaviorSubject<number> = new BehaviorSubject(FilterEnum.all)
  searchInputSub$: BehaviorSubject<string> = new BehaviorSubject('')
  searchInput$ = this.searchInputSub$.asObservable().pipe(distinctUntilChanged())

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.allProducts$ = this.productsService.products$
    this.filteredProducts$ = this.getFilteredProducts()
  }


  private getFilteredProducts() {
    return combineLatest([this.allProducts$, this.tabSelection$.asObservable(), this.searchInput$]).pipe(
      map(([products, filter, search]) => {
        const filtered = this.filterProductsBasedOnUnitsInStock(products, filter)
        return this.filterProductsBasedOnSearch(filtered, search)
      })
    )
  }


  tabSelectionChange(event: number) {
    this.tabSelection$.next(event)
  }

  onInputChange(event: string) {
    this.searchInputSub$.next(event)
  }


  private filterProductsBasedOnUnitsInStock(products: IProductWithSupplier[],
    filterSelection: number): IProductWithSupplier[] {
    if (filterSelection === FilterEnum.all) return products
    if (filterSelection === FilterEnum.inStock) return products.filter(p => p.UnitsInStock > 10)
    if (filterSelection === FilterEnum.outOfStock) return products.filter(p => p.UnitsInStock === 10)
    if (filterSelection === FilterEnum.scarce) return products.filter(p => p.UnitsInStock <= 10 && p.UnitsInStock > 0)
  }


  private filterProductsBasedOnSearch(products: IProductWithSupplier[], searchValue: string) {
    return products.filter(p => p.ProductName.toLowerCase().includes(searchValue.toLowerCase()))
  }

  onOrder() {
    const selection = this.tableSelection.getSelection()
    const productIds = selection.map(p => p.ProductID)
    this.productsService.orderProducts(productIds, 10)
  }
  
  onRemove() {
    const selection = this.tableSelection.getSelection()
    const productIds = selection.map(p => p.ProductID)
    this.productsService.removeProducts(productIds)
  }

}
