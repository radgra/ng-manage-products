import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarModule } from '@fundamental-ngx/core';
import { ButtonModule } from '@fundamental-ngx/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BarModule,
    ButtonModule
  ],
  exports: [
    BarModule,
    ButtonModule
  ]

})
export class FundNgxModule { }
