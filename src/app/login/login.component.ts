import { Component, OnInit } from '@angular/core';

import { DataService } from '../dataService/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  data: any;
  token: any;
  submitted= false;

  constructor(private dataService: DataService, private toastr: ToastrService,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm();
  }
  loginForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  } 

  get f(){
    return this.form.controls;
  }
  onSubmit(){
    this.submitted = true;
    if(this.submitted){
      //console.log(this.form.value);
    }
    if(this.form.invalid){
      return;
    }
    this.dataService.login(this.form.value).subscribe( res=>{
      this.data =res;
      console.log(this.data);
      if(this.data.status === 1){
        this.token = this.data.data;
        console.log(this.token);// show in console the token
        localStorage.setItem('token',this.token);
        this.router.navigate(['/init']);
        this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:1000,
          progressBar:true
        });
      }else if(this.data.status === 0){
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
      }
  });
  }
}
