import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService, private _router:Router) { }

  registerForm = new FormGroup({
     email: new FormControl(''),
     password: new FormControl(''),
   });

  ngOnInit() {
  }
  registerUser(event){
    this._auth.registerUser(this.registerForm.value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/admin/dashboard'])
      },
      err => console.log(err)
    )
  }
}
