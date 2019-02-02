import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService } from './admin.service';
import { TokenInterceptorService } from '../token-interceptor.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AdminService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true
              }]
})
export class AdminModule { }
