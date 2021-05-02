import { startWith, map } from 'rxjs/operators';
import { IProductWithSupplierRow } from './../master-page.component';
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss']
})
export class TableSectionComponent implements OnInit, OnChanges {
  selectionChangedSub$:Subject<null> = new Subject() 
  allSelected$:Observable<boolean> = this.selectionChangedSub$.asObservable().pipe(
    map(_ => {
      const result = this.areAllSelected()
      return result
    })
  ) 
  @Input() products:IProductWithSupplierRow[]
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.products) {
      console.log('table')
      console.table(changes.products.currentValue)
      this.selectionChangedSub$.next()
    }
  }

  getStylingForStock(row:IProductWithSupplierRow) {
    if(row.UnitsInStock < 10) return 'unit-shortage'
    return 'unit-in-stock'
  }

  areAllSelected() {
    // debugger
    if(!this.products) return false
    if(this.products.length === 0) return false
    const result = this.products.every(p => p.selected)
    return result
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
    this.selectionChangedSub$.next()
  }

  onCheck(event:CustomEvent, product:IProductWithSupplierRow) {
    product.selected = !product.selected
    this.products = [...this.products]
    console.log('emitted')
    this.selectionChangedSub$.next()
  }

  getSelection() {
    return this.products.filter(p => !!p.selected)
  }

  onRowClick(product:IProductWithSupplierRow) {
    this.router.navigate(['/', 'products', product.ProductID])
  }
}
