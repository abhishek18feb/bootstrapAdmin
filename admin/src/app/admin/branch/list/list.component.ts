import { Component, OnInit } from '@angular/core';
import { FormControl , FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { AuthGuard } from '../../../auth.guard';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private listItems=[];
  private serverError='';
  constructor(private _router:Router, private _adminservice:AdminService) { }

  ngOnInit() {
    this._adminservice.getAllBranch()
    .subscribe(
      res => {
        this.listItems = res.result.branches;
        console.log(this.listItems);
      },
      err => {  console.log(err)
                if( err instanceof HttpErrorResponse ) {
                  if (err.status === 409) {
                    this.serverError = err.error.message
                  }
                  if (err.status === 401) {
                    this.serverError = 'Unauthorization Error plz logout and login again'
                  }
                }
            }
    )
  }
  deleteBranch(id){
    console.log(id);
  }

}
