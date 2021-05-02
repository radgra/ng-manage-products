import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/models/product.interface';



@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {
  @Input() product:IProduct
  constructor() { }

  ngOnInit(): void {
  }

  get status() {
    return this.product.UnitsInStock > 9 ? "positive" : "critical"
  }

  get progressState() {
    return this.product.UnitsInStock > 9 ? "Success" : "Warning"

  }
}
