import { FundNgxModule } from './fund-ngx/fund-ngx.module';
import { Ui5WebComponentsModule } from './ui5-web-components/ui5-web-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { TabsSectionComponent } from './master-page/tabs-section/tabs-section.component';
import { TableSectionComponent } from './master-page/table-section/table-section.component';
import { FloatingToolbarComponent } from './master-page/floating-toolbar/floating-toolbar.component';
import { FormsModule } from '@angular/forms';
import { DetailHeaderComponent } from './detail-page/detail-header/detail-header.component';
import { SupplierInfoComponent } from './detail-page/supplier-info/supplier-info.component';
@NgModule({
  declarations: [
    AppComponent,
    MasterPageComponent,
    DetailPageComponent,
    TabsSectionComponent,
    TableSectionComponent,
    FloatingToolbarComponent,
    DetailHeaderComponent,
    SupplierInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ui5WebComponentsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FundNgxModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
