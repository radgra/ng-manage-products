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
  allProducts$: Observable<IProductWithSupplierRow[]>
  filteredProducts$: Observable<IProductWithSupplierRow[]>
  tabSelection$: BehaviorSubject<number> = new BehaviorSubject(FilterEnum.all)
  searchInputSub$: BehaviorSubject<string> = new BehaviorSubject('')
  deletedProducts$: BehaviorSubject<IProductWithSupplierRow> = new BehaviorSubject(null)
  orderedProduct$: BehaviorSubject<IProductWithSupplierRow> = new BehaviorSubject(null)
  searchInput$ = this.searchInputSub$.asObservable().pipe(distinctUntilChanged())

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    const deletedProducts = this.deletedProducts$.asObservable().pipe(
      scan((acc, val) => {
        if (val) {
          acc.push(val)
        }
        return acc
      }, []) 
    ) as Observable<IProductWithSupplierRow[]>

    const orderedProduct = this.orderedProduct$.asObservable().pipe(
      pluck('ProductID')
    )

    this.allProducts$ = this.getAllProducts().pipe(
      switchMap((products) => {
        return deletedProducts.pipe(
          map((elems: IProductWithSupplier[]) => {
            const reduced = products.reduce((acc:IProductWithSupplierRow[], p: IProductWithSupplierRow) => {
              const exists = elems.some(el => el.ProductID === p.ProductID)
              if (!exists) acc.push(p)
              return acc
            }, [])
            return reduced
          })
        )
      })
    )
    this.filteredProducts$ = this.getFilteredProducts()
    this.filteredProducts$.subscribe(console.log)

  }

  private getAllProducts() {
    const productsService$ = this.productsService.getProductsWithSuppliers().pipe(
      map(prod => prod.map((p: IProductWithSupplierRow) => {
        p.selected = false
        return p
      }))
    )
    return concat(of([]), productsService$) as Observable<IProductWithSupplierRow[]>
  }

  private getFilteredProducts() {
    return combineLatest(this.allProducts$, this.tabSelection$.asObservable(), this.searchInput$).pipe(
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


  private filterProductsBasedOnUnitsInStock(products: IProductWithSupplierRow[],
    filterSelection: number): IProductWithSupplierRow[] {
    if (filterSelection === FilterEnum.all) return products
    if (filterSelection === FilterEnum.inStock) return products.filter(p => p.UnitsInStock > 10)
    if (filterSelection === FilterEnum.outOfStock) return products.filter(p => p.UnitsInStock === 10)
    if (filterSelection === FilterEnum.scarce) return products.filter(p => p.UnitsInStock <= 10 && p.UnitsInStock > 0)
  }


  private filterProductsBasedOnSearch(products: IProductWithSupplierRow[], searchValue: string) {
    return products.filter(p => p.ProductName.toLowerCase().includes(searchValue.toLowerCase()))
  }

  onOrder() {
    const selection = this.tableSelection.getSelection()
  }

  onRemove() {
    console.log('remove')
    const selection = this.tableSelection.getSelection()
    selection.forEach(el => {
      this.deletedProducts$.next(el)
    })
  }

}
