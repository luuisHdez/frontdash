import { Component, OnInit } from '@angular/core';
import { UserService } from '../dataService/user.service';
import { Roles } from '../model/roles.model';
import { User } from '../model/user.model';
import { Area } from '../model/area.model';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import jwt_decode from "jwt-decode";
import { EditUserService } from '../dataService/editUserService';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Title } from '../model/title.model';


@Component({
  selector: 'app-edit-user',
  template: `
  <h1 id="h1" style="color: #70757d;">PANEL DE ADMINISTRACIÓN</h1>
  <mat-card class="card responsive">
  <mat-card-title>Edición de usuario</mat-card-title>
  <mat-card-content id="cont">
      <form [formGroup]="p"  >
      <input type="text" formControlName ="id" style="display: none;"> 
          <mat-form-field id ="mat1" class="example-full-width" aspect="legacy">
              <mat-label>Nombre</mat-label>
              <input type="text" matInput  name="name" formControlName="name">
              <mat-hint></mat-hint>
              <mat-error *ngIf="submitted && f.name.errors">
                  <mat-error *ngIf="f.name.errors.required"><strong>campo requerido</strong></mat-error>
              </mat-error>
          </mat-form-field>
          
          <mat-form-field id ="mat1" class="example-full-width ml-15" aspect="legacy">
              <mat-label>Apellido paterno</mat-label>
              <input type="text" matInput  name="lastnamef"   placeholder="Apellido paterno" formControlName="lastnamef">
              <mat-hint></mat-hint>
              <mat-error *ngIf="submitted && f.lastnamef.errors">
                  <mat-error *ngIf="f.lastnamef.errors.required"><strong>campo requerido</strong></mat-error>
              </mat-error>
          </mat-form-field>

          <mat-form-field id ="mat1" class="example-full-width mr-10" appearance="legacy">
              <mat-label>Apellido Materno</mat-label>
              <input type="text" matInput  name="lastnamem"   placeholder="Apellido materno" formControlName="lastnamem">
              <mat-hint></mat-hint>
              <mat-error *ngIf="submitted && f.lastnamem.errors">
              <mat-error *ngIf="f.lastnamem.errors.required"><strong>campo requerido</strong></mat-error>
              </mat-error>
          </mat-form-field>
         
       <mat-form-field id ="mat1" class="example-full-width" appearance="legacy">
          <mat-label>Email</mat-label>
              <input type="email" matInput  name="email"  placeholder="Ex. pat@example.com" formControlName="email">     
          <mat-error *ngIf="submitted && f.email.errors">Please enter a valid email address 
          <mat-error *ngIf="f.email.errors.required"><strong>Campor requerido</strong></mat-error>
          </mat-error> 
      </mat-form-field>

      <mat-form-field id ="mat1" class="example-full-width" appearance="legacy">
          <mat-label>Contraseña</mat-label>
              <input type="password" matInput  name="password" placeholder="Password" formControlName="password">
              <mat-hint></mat-hint>
          <mat-error *ngIf="submitted && f.password.errors">Debe contener al menos 6 carácteres
          </mat-error> 
      </mat-form-field>

         <mat-form-field id ="mat2" appearance="legacy" >
           <mat-label  style="color: black;">Rol Actual: {{this.rolename}}  </mat-label>
           <mat-select name="role_id" formControlName="role">
             <mat-option  *ngFor="let r of role; let i=index" [value]="r.id" >
                {{r.name}}
             </mat-option>
           </mat-select>
         </mat-form-field>

         <mat-form-field id ="mat2" appearance="legacy">
           <mat-label style="color: black;">Administración Actual: {{this.areaname}}</mat-label>
           <mat-select formControlName="area">
             <mat-option *ngFor="let a of this.area; let i=index"  [value]="a._idarea">
               {{a._namearea}}
             </mat-option>
           </mat-select>
         </mat-form-field>

        <mat-form-field id ="mat2" appearance="legacy">
          <mat-label style="color: black;">Puesto Actual: {{this.puesto}}</mat-label>
          <mat-select formControlName="puesto">
            <mat-option  *ngFor="let t of this.titles; let i= index"  [value]="t._idtitle" >
                  {{t._position}}
            </mat-option>
          </mat-select>
          </mat-form-field>

        <mat-divider></mat-divider>
        <p></p>
      </form>
      <button id="b" (click)="onSubmit()" mat-button>Registrar</button>
          <button id="be" (click)="goBack()" mat-button>Cancelar</button>
  </mat-card-content>
</mat-card>
  `,
  styles: [`
    #mat1{
      margin-left: 8%;
      margin-right: 10%;
      width: 32%;
    }
    #mat2{
      margin-left: 8%;
      margin-right: 10%;
      width: 32%;
    }
    mat-card-title{
        text-align: center;
        margin-right: 5%
    }
    mat-card {
          display: flex;
          margin-inline: auto;
          margin-top: 5%;
          width: 72%;
      }
      mat-card-title{
          color: #70757d;
      }
      button,#b{
         width: 30%;
         margin-left: 12%;
         box-shadow: 1px 1px  grey;
      }
      #h1{
        color: #70757d;
      text-align: -webkit-center;
      line-height: 0%;
    font-size: 30px;
      }
      `
  ]
})
export class EditUserComponent implements OnInit {
user: User;
rolename:any;
areaname:any;
puesto:any;
token: any
data:any;
iduser:any;
userData:any;
submitted = false;
r: any;
id:any;
p:FormGroup;
  constructor(private editUserService: EditUserService, private location: Location, private router:Router,
    private _activatedroute : ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService) { }
createform(){
  this.p = this.fb.group({
    role: [''],
    name: [null, Validators.required],
    lastnamef: [null, Validators.required],
    lastnamem: [null, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    area: [''],
    password: [''],
    puesto: [''],
    id: ['']
  });
}
  ngOnInit() {
    this.createform();
    this.gettingArea();
    this.getRoleUser();
//-----------------------------
this._activatedroute.paramMap.subscribe(params =>{
  this.data = params;
  console.log('id user',this.data.params.user);
  this.iduser = this.data.params.user
  this.editUserService.gettingUser(this.data).subscribe(res=>{
    this.dt = res;
    this.userin = this.dt.data;
    console.log('user',this.userin);
    const n = this.userin.find(n => n._name);
    this.p.get('name').setValue(n._name);
    const lf = this.userin.find(lf => lf.lastnamef);
    this.p.get('lastnamef').setValue(lf.lastnamef);
    const lm = this.userin.find(lm => lm.lastnamem);
    this.p.get('lastnamem').setValue(lm.lastnamem);
    const e = this.userin.find(e => e.email);
    this.p.get('email').setValue(e.email);
    this.rolename = this.userin[0].rolename;
    this.areaname = this.userin[0].namearea;
    this.puesto = this.userin[0].puesto;
    console.log('Rol',this.rolename,'Area',this.areaname,'puesto',this.puesto);
    const id = this._activatedroute.snapshot.params.id;
    this.p.get('id').setValue(id);
});
//-----------------------------
  });
  }
  area:Area[]=[];
  roles: Roles[]=[];
  titles: Title[]=[];
gettingArea(){
  this.token = jwt_decode(localStorage.getItem('token'));
  this.editUserService.getAreaList(this.token).subscribe((res)=>{
  this.data = res;
    this.area = this.data.data;
    this.roles = this.data.roles;
    this.titles = this.data.title;
    console.log('areas',this.area, 'roles',this.roles, 'titles',this.titles);
  },
err=>{
  console.log(err);
});
}
role:Roles[]=[];
getRoleUser(){
  this.token = jwt_decode(localStorage.getItem('token'));
      this.editUserService.getRoles(this.token).subscribe((res)=>{
        console.log(res);
      this.data = res;
        this.role = this.data.roles;
        console.log('askdjaskdjnas',this.role);
      },
    err=>{
      console.log(err);
    });
}
goBack(){
  this.location.back();
}

dt:any;  
userin:User[]=[];
gettingUser(){
   this._activatedroute.paramMap.subscribe(params =>{
    this.data = params;
    console.log('id user',this.data.params.user);
    this.iduser = this.data.params.user
    this.editUserService.gettingUser(this.data).subscribe(res=>{
      this.dt = res;
      this.userin = this.dt.data[0];
      console.log(this.userin);
    });
  });
}
get f(){
  return this.p.controls;
}

onSubmit(){
  this.token = jwt_decode(localStorage.getItem('token'));
 
  this.id = this._activatedroute.snapshot.params.id;
  this.submitted = true;
  console.log(this.id);

  
  if(this.p.invalid){
    return;
  }
  this.editUserService.updateUser(this.p.value, this.token).subscribe(res =>{
    console.log(res);
    this.data = res;
    if(this.data.status === 1){
      this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
        timeOut:1000,
        progressBar: true
      });
    }else{
      this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
        timeOut: 1000,
        progressBar: true
      });
    }
  });
  this.ngOnInit();
}
}