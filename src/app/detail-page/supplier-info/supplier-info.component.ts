import { Component, Input, OnInit } from '@angular/core';
import { ISupplier } from 'src/models/supplier.interface';

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.scss']
})
export class SupplierInfoComponent implements OnInit {
  @Input() supplier:ISupplier
  constructor() { }

  ngOnInit(): void {
  }

}
