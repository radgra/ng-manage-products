import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IProductWithSupplier, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  product:IProductWithSupplier = null
  constructor(private productsService: ProductsService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params:ParamMap) => {
        const id = params.get('productId')
        return this.productsService.getProduct(+id)
      })  
    ).subscribe(p => {
      console.log(p)
      this.product = p
    })
  }

}
