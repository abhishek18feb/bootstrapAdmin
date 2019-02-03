import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BranchRoutingModule, ComponentList } from './branch-routing.module';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [ComponentList],
  imports: [
    CommonModule,
    BranchRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    //BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ]
})
export class BranchModule { }
