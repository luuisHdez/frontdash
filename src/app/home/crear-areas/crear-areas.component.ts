import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/dataService/data.service';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from 'src/app/model/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-areas',
  templateUrl: './crear-areas.component.html',
  styleUrls: ['./crear-areas.component.css']
})
export class CrearAreasComponent implements OnInit {

  constructor(private dataService:DataService, private fA:FormBuilder,
    private location:Location, private toastr:ToastrService) { }
  fa:FormGroup;
  data:any;
  submitted = false;
  user:User[]=[];
  token:any;
  createForm(){
    this.fa = this.fA.group({
      area:['', Validators.required],
      responsable:['',Validators.required],
      fecha:['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.dataService.gettinUser().subscribe((res:any) =>{
      this.data = res;
      this.user = this.data.data;
    });
  }
  
  get f(){
    return this.fa.controls;
  }
  onSubmit(){
    this.token = jwt_decode(localStorage.getItem("token"));
    this.submitted = true;
    if(this.fa.invalid){
      return;
    }
    let datos ={
      form: this.fa.value,
      user_id: this.token.user_id
    }
    
    this.dataService.crearArea(datos).subscribe((res:any) =>{
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
      }else{
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:1000,
          progressBar:true
        });
      }
    });
    this.fa.reset();
  }
  goBack(){
    this.location.back();
  }
}
