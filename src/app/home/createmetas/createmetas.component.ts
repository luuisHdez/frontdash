import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { GoalsService } from 'src/app/dataService/goals.service';
import jwt_decode from 'jwt-decode';
import { Location } from '@angular/common';

@Component({
  selector: 'app-createmetas',
  templateUrl: './createmetas.component.html',
  styleUrls: ['./createmetas.component.css']
})
export class CreatemetasComponent implements OnInit {

  constructor(private toastr:ToastrService, private router:Router, private cF:FormBuilder,
    private goalService:GoalsService, private location:Location) { }

    createF:FormGroup;
    submitted = false;
    token:any;
    data:any;
    area: any[] = [];

    createForm(){
      this.createF = this.cF.group({
        areas: [null, Validators.required],
        responsable: [null,Validators.required],
        datefrom: [null, Validators.required],
        dateto: [null, Validators.required],
        monto: [null, Validators.required]
      });
    }
  ngOnInit(): void {
    this.createForm();
    this.token = localStorage.getItem('token');
    if(this.token){
      this.goalService.getFills().subscribe(res => {
        console.log(res);
        this.data = res;
        this.area = this.data.areas;
        console.log(this.area)
      });
    }
  }
  get f(){
    return this.createF.controls;
  }
  datita:any
  onSubmit(){
    this.token = jwt_decode(localStorage.getItem('token'));
    
    this.submitted = true;
    if(this.createF.invalid){
      return;
    }
    console.log(this.createF.value);
    this.datita = {
      user_id: this.token.user_id,
      form: this.createF.value,
      
    }
    this.goalService.createGoal(this.datita).subscribe(res =>{
      console.log('form value',res);
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
      }else{
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
      }
    });
    this.createF.reset();
  }
  goBack(){
    this.location.back();
  }
  lenght:any;
  select(){
    this.goalService.getFills().subscribe(res => {
      this.data = res;
      this.area = this.data.areas;
     this.lenght=  this.createF.get("areas").value;
     let user = this.createF.get("responsable");
     user.setValue(this.lenght._name+' '+this.lenght.lastnamef+' '+this.lenght.lastnamem);

});
}
}
