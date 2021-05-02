import { DetailPageComponent } from './detail-page/detail-page.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:"", component:MasterPageComponent},
  {path:"products/:productId", component:DetailPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
