import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder ,Validators, FormArray } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth.service';
import { AuthGuard } from '../../../auth.guard';

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

  constructor(private _router:Router, private _adminservice:AdminService,private fb: FormBuilder, private toastr: ToastrService) { }

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
                    studentImage: [null, Validators.required],
                    aadhaar: ['', Validators.required],
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
    onSelectedFile(event) {
        let reader = new FileReader();
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.admissionForm.get('studentImage').setValue(file);
          // this.admissionForm.append('studentImage',
          //               event.target.files[0],
          //               event.target.files[0].name);
        }
      }
    removeSibling(index) {
      this.siblingFormGroup.removeAt(index);
    }
    onSubmit(){
      let siblingDeatils = JSON.stringify(this.admissionForm.get('sibling').value);
      console.log(siblingDeatils);
      const formData  = new FormData();
      formData.append('studentImage', this.admissionForm.get('studentImage').value);
      formData.append('firstName', this.admissionForm.get('firstName').value);
      formData.append('middleName', this.admissionForm.get('middleName').value);
      formData.append('lastName', this.admissionForm.get('lastName').value);
      formData.append('dob', this.admissionForm.get('dob').value);
      formData.append('gender', this.admissionForm.get('gender').value);
      formData.append('religion', this.admissionForm.get('religion').value);
      formData.append('nationality', this.admissionForm.get('nationality').value);
      formData.append('class', this.admissionForm.get('class').value);
      formData.append('section', this.admissionForm.get('section').value);
      formData.append('branch', this.admissionForm.get('branch').value);
      formData.append('previousSchool', this.admissionForm.get('previousSchool').value);
      formData.append('previousClass', this.admissionForm.get('previousClass').value);
      formData.append('previousSchool', this.admissionForm.get('previousSchool').value);
      formData.append('previousSchoolAddress', this.admissionForm.get('previousSchoolAddress').value);
      formData.append('sibling', siblingDeatils);
      formData.append('aadhaar', this.admissionForm.get('aadhaar').value);

      this._adminservice.addNewStudent(formData)
      .subscribe(
        res => {
          this.toastr.success('Student Added Successfully', 'Success!');
          this._router.navigate(['/admin/admission/list'])
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
      //console.log(this.admissionForm.value);
    }

}
