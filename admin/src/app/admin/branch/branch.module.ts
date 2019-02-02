import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BranchRoutingModule, ComponentList } from './branch-routing.module';


@NgModule({
  declarations: [ComponentList],
  imports: [
    CommonModule,
    BranchRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BranchModule { }
