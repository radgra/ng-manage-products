import { ISupplier } from './../../models/supplier.interface';
import { IProduct } from '../../models/product.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'


export interface IProductWithSupplier extends IProduct {
  supplierData:ISupplier
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsSubject: BehaviorSubject<IProductWithSupplier[]> = new BehaviorSubject([])
  products$ = this.productsSubject.asObservable()
  constructor(private http: HttpClient) { 

    combineLatest([this.loadProducts(),this.loadSuppliers()]).pipe(
      map(([products,suppliers]:[IProduct[], ISupplier[]]) => {
        return products.map((p:IProductWithSupplier) => {
          p.supplierData = suppliers.find((s:ISupplier) => p.SupplierID === s.SupplierID)
          return p
        })
      })
    ).subscribe((products:IProductWithSupplier[]) => this.productsSubject.next(products))
  }

  private loadProducts() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get('./assets/Products.json',{headers})
  }
  
  private loadSuppliers()  {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get('./assets/Suppliers.json',{headers})
  }


  removeProducts(productIds:number[]) {
    const products = this.productsSubject.getValue()
    const updatedProducts = products.filter(p => {
      return !productIds.some(id => p.ProductID === id)
    })
    this.productsSubject.next(updatedProducts)
  }

  orderProducts(productIds:number[], qty:number) {
    const products = this.productsSubject.getValue()

    productIds.forEach(id => {
      const productToBuy = products.find(p => p.ProductID === id)
      if(productToBuy) [
        productToBuy.UnitsInStock = productToBuy.UnitsInStock + qty
      ]
    })

    this.productsSubject.next(products)
  }

  getProduct(productId:number) {
    return this.productsSubject.pipe(
      switchMap(products => {
        const selectedProduct = products.find(p => p.ProductID == productId)
        return of(selectedProduct)
      })
    )
  }

}
