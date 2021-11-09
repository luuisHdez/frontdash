import { Component, Directive, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EditUserService } from '../../dataService/editUserService';
import { User } from 'src/app/model/user.model';
import { ToastrService } from 'ngx-toastr';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private location:Location,
    private activatedRoute: ActivatedRoute,
    private usrService: EditUserService, private toasTr:ToastrService) { }
    downUser: FormGroup;
    data:any;
    id:any;
    param:any;
    user:User[]=[];
    submitted = false;
      formGroup(){
        this.downUser = this.formBuilder.group({
          id:[''],
          name:[''],
          lastnamef:[''],
          lastnamem:[''],
          email: [''],
          role:[''],
          area:[''],
          puesto:['']
        });
      }
      name:any;
      role:any;
      email:any;
      lastnamem:any;
      lastnamef:any;
      puesto:any;
      area:any;
      ngOnInit(): void {
        this.formGroup();
        this.activatedRoute.paramMap.subscribe( res =>{
          this.param = res;
          this.id = this.param.params.id;
          console.log('this is the param from Url',this.id);
          this.usrService.gettingUser(this.param).subscribe(res=>{
            this.data = res;
            console.log(this.data);
            this.name = this.data.data[0]._name;
            this.lastnamef = this.data.data[0].lastnamef;
            this.lastnamem = this.data.data[0].lastnamem;
            this.role = this.data.data[0].rolename;
            this.email = this.data.data[0].email;
            this.area = this.data.data[0].namearea;
            this.puesto = this.data.data[0].puesto;
            this.downUser.disable();
            this.downUser.get('id').setValue(this.id);
          });
        });
      }
      
    get f(){
      return this.downUser.controls;
    }
    goBack(){
      this.location.back();
    }
    token:any;
    idUsers:any;
    dateUsr:any;
    currentId:any;
    activateUsr(){
      
      this.token = jwt_decode(localStorage.getItem('token'));
      this.currentId = this.activatedRoute.snapshot.params.id;
      this.dateUsr = {
        token: this.token.user_id,
        user_id: this.currentId
      }
      console.log('Data to find in backend', this.dateUsr);
      this.submitted = true;
      this.usrService.activateUsr(this.dateUsr).subscribe( res => {
        this.data = res;
        console.log(this.data);
        if(this.data.status === 1){
          this.toasTr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),{
            timeOut: 2000,
            progressBar: true
          });
        }else{
          this.toasTr.error(JSON.stringify(this.data.code),JSON.stringify(this.data.message),{
            timeOut: 2000,
            progressBar: true
          });
        }
      });
    }
    }
