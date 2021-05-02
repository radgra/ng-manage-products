import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProductWithSupplier, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {
  product:IProductWithSupplier = null
  private productSub:Subscription
  constructor(private productsService: ProductsService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.productSub = this.route.paramMap.pipe(
      switchMap((params:ParamMap) => {
        const id = params.get('productId')
        return this.productsService.getProduct(+id)
      })  
    ).subscribe(p => {
      this.product = p
    })
  }

  ngOnDestroy() {
    this.productSub.unsubscribe()
  }

}
