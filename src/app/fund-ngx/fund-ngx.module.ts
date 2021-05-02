import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarModule } from '@fundamental-ngx/core';
import { ButtonModule } from '@fundamental-ngx/core';
import { ActionBarModule, ObjectNumberModule } from '@fundamental-ngx/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BarModule,
    ButtonModule,
    ActionBarModule,
    ObjectNumberModule
  ],
  exports: [
    BarModule,
    ButtonModule,
    ActionBarModule,
    ObjectNumberModule
  ]

})
export class FundNgxModule { }
