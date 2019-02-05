import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdmissionModule { }
