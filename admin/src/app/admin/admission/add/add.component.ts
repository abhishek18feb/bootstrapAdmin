import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder ,Validators, FormArray } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  genders: string[]=['Male', 'Female', 'Other']
  religions: string[]=['Hindu', 'Muslim', 'Sikh', 'Jain', 'Buddh', 'Christian']
  countries: string[]=['Indian', 'Napal', 'Bhutan', 'Afganistan', 'Dubai']
  classArray: string[]=['Nursary', 'LKG', 'UKG', '1','2','3','4','5','6','7','8','9','10','11','12']
  sections: string[]=['A', 'B', 'C', 'D']
  branches: string[]
  serverError: string=''

  constructor(private _router:Router, private _adminservice:AdminService,private fb: FormBuilder) { }

  ngOnInit() {
    this.fetchData()
  }
  fetchData() {
    this._adminservice.getAllBranch()
    .subscribe(
      res => {
        this.branches = res.result.branches
        console.log(this.branches)
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
  admissionForm = this.fb.group({
                    firstName: ['', Validators.required],
                    middleName: [''],
                    lastName: [''],
                    dob: ['', Validators.required],
                    gender: ['', Validators.required],
                    religion: ['', Validators.required],
                    nationality: ['', Validators.required],
                    class: ['', Validators.required],
                    section: ['', Validators.required],
                    branch: ['', Validators.required],
                    previousSchool: [''],
                    previousClass: [''],
                    previousSchoolAddress: [''],
                    file: [null, Validators.required],
                    sibling: this.fb.array([
                                this.fb.group({
                                    name: ['', Validators.required],
                                    class: ['', Validators.required],
                                    school: ['', Validators.required]
                                  })
                                ])
                  });
    get siblingFormGroup() {
      return this.admissionForm.get('sibling') as FormArray;
    }
    addSibling() {
      this.siblingFormGroup.push(
            this.fb.group({
              name: ['', Validators.required],
              class: ['', Validators.required],
              school: ['', Validators.required]
            })
        );
    }
    removeSibling(index) {
      this.siblingFormGroup.removeAt(index);
    }
    onSubmit(){
      
    }

}
