import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import "rxjs/Rx"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router:Router) { }

  user = {yourName:''};

  ngOnInit() {
  }

  onSubmit(){
    console.log('LoginComponent');
    this._router.navigate(['/home'])

  }

}
