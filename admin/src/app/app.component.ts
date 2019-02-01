import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'admin';
  private login = 0;
  ngOnInit() {
    if(!!localStorage.getItem('token')){
      this.login=1;
    }else{
      this.login=0;
      console.log(localStorage.getItem('token'))
    }
  }
  ngDoCheck() {
    if(!!localStorage.getItem('token')){
      this.login=1;
    }else{
      this.login=0;
      console.log(localStorage.getItem('token'))
    }
  }
}
