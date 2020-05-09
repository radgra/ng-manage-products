import { IProductWithSupplierRow } from './../master-page.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss']
})
export class TableSectionComponent implements OnInit {
  @Input() products:IProductWithSupplierRow[]
  constructor() { }

  ngOnInit(): void {
  }


  getStylingForStock(row:IProductWithSupplierRow) {
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
