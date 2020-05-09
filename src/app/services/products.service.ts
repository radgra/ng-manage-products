import { ISupplier } from './../../models/supplier.interface';
import { IProduct } from '../../models/product.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators'


export interface IProductWithSupplier extends IProduct {
  supplierData:ISupplier
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get('./assets/Products.json',{headers})
  }
  
  getProductsWithSuppliers():Observable<IProductWithSupplier[]> {
    return combineLatest(this.getProducts(),this.getSuppliers()).pipe(
      map(([products,suppliers]:[IProduct[], ISupplier[]]) => {
        return products.map((p:IProductWithSupplier) => {
          p.supplierData = suppliers.find((s:ISupplier) => p.SupplierID === s.SupplierID)
          return p
        })
      })
    )
  }
  
  getSuppliers()  {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get('./assets/Suppliers.json',{headers})

  }
}
