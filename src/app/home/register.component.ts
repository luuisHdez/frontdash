
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../confirmed.validator';
import { DataService } from '../dataService/data.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Roles } from '../model/roles.model';
import { Area } from '../model/area.model';

import jwt_decode from "jwt-decode";
import { Title } from '../model/title.model';


@Component({
  selector: 'app-register',
  template: `
  <h1 id="h1" style="color: #70757d;">PANEL DE ADMINISTRACIÓN</h1>
  <mat-card class="card responsive">
  <mat-card-title>NUEVO USUARIO</mat-card-title>
  <mat-card-content>
      <form  [formGroup]="form">
          <mat-form-field id ="mat1" class="example-full-width" aspect="legacy">
              <mat-label>Nombre</mat-label>
              <input type="text" matInput formControlName="name" name="name" [ngClass]="{'is-invalid': submitted && f.name.errors}" placeholder="Nombre">
              <mat-hint></mat-hint>
              <mat-error *ngIf="submitted && f.name.errors">
                  <mat-error *ngIf="f.name.errors.required"><strong>campo requerido</strong></mat-error>
              </mat-error>
          </mat-form-field>
          
          <mat-form-field id ="mat1" class="example-full-width ml-15" aspect="legacy">
              <mat-label>Apellido paterno</mat-label>
              <input type="text" matInput formControlName="lastnamef" name="lastnamef" [ngClass]="{'is-invalid': submitted && f.lastnamef.errors}" placeholder="Apellido paterno">
              <mat-hint></mat-hint>
              <mat-error *ngIf="submitted && f.lastnamef.errors">
                  <mat-error *ngIf="f.lastnamef.errors.required"><strong>campo requerido</strong></mat-error>
              </mat-error>
          </mat-form-field>

          <mat-form-field id ="mat1" class="example-full-width mr-10" appearance="legacy">
              <mat-label>Apellido Materno</mat-label>
              <input type="text" matInput formControlName="lastnamem" name="lastnamem" [ngClass]="{'is-invalid': submitted && f.lastnamem.errors}" placeholder="Apellido materno">
              <mat-hint></mat-hint>
              <mat-error *ngIf="submitted && f.lastnamem.errors">
              <mat-error *ngIf="f.lastnamem.errors.required"><strong>campo requerido</strong></mat-error>
              </mat-error>
          </mat-form-field>
         
       <mat-form-field id ="mat1" class="example-full-width" appearance="legacy">
          <mat-label>Email</mat-label>
              <input type="email" matInput formControlName="email" name="email" [ngClass]="{'is-invalid': submitted && f.email.errors}" placeholder="Ex. pat@example.com">     
          <mat-error *ngIf="submitted && f.email.errors">Please enter a valid email address 
          <mat-error *ngIf="f.email.errors.required"><strong>Campor requerido</strong></mat-error>
          </mat-error> 
      </mat-form-field>

      <mat-form-field id ="mat1" class="example-full-width" appearance="legacy">
          <mat-label>Contraseña</mat-label>
              <input type="password" matInput formControlName="password" name="password" [ngClass]="{'is-invalid': submitted && f.password.errors}" placeholder="Password">
              <mat-hint></mat-hint>
          <mat-error *ngIf="submitted && f.password.errors">Debe contener al menos 6 carácteres
          <mat-error *ngIf="f.password.errors.required"><strong>Campo requerido</strong></mat-error>
          </mat-error> 
      </mat-form-field>

      <mat-form-field id ="mat1" class="example-full-width" appearance="legacy">
          <mat-label>Confirmar contraseña</mat-label>
              <input type="password" matInput formControlName="confirmPassword" name="confirmPassword" [ngClass]="{'is-invalid': submitted && f.confirmPassword.errors}" placeholder="Password">
              <mat-hint></mat-hint>
          <mat-error *ngIf="submitted && f.confirmPassword.errors">Debe contener almenos 6 carácteres  
          <mat-error *ngIf="f.confirmPassword.errors.required"><strong>Las contraseñas deben coincidir</strong></mat-error>
          </mat-error>
      </mat-form-field> 

         <mat-form-field id ="mat2" appearance="legacy">
           <mat-label>Role de usuario</mat-label>
           <mat-select formControlName="role_id" name="role_id">
             <mat-option  *ngFor="let r of role"  [value]="r.id" name="role_id">
                 {{r.name}}
             </mat-option>
           </mat-select>
         </mat-form-field>

         <mat-form-field id ="mat2" appearance="legacy">
           <mat-label>Administración</mat-label>
           <mat-select formControlName="area" name="_idarea">
             <mat-option *ngFor= " let a of this.area; let i=index" [value]="a._idarea" name="_idarea">
               {{ a._namearea }}
             </mat-option>
           </mat-select>
         </mat-form-field>

        <mat-form-field id ="mat2" appearance="legacy">
          <mat-label>Puesto del usuario</mat-label>
          <mat-select formControlName="puesto">
            <mat-option  *ngFor="let t of this.title; let i= index"  [value]="t._idtitle">
                  {{t._position}}
            </mat-option>
          </mat-select>
          </mat-form-field>

        <mat-divider></mat-divider>
        <p></p>
        <button id="b" (click)="onSubmit()"mat-button>Registrar</button>
      <button id="be" (click)="goBack()" mat-button>Cancelar</button>
      </form>
      
  </mat-card-content>
</mat-card>`, 
  styles: [`
  #mat1{
    margin-left: 8%;
    margin-right: 10%;
    width: 32%;
  }
  #mat2{
    margin-left: 5%;
    margin-right: 8%;
    widtH: 20%
  }
  mat-card-title{
      text-align: center;
      margin-right: 5%
  }
  mat-card{
    border-radius: 10px;
    margin: 16px;
    margin-left: 32px;
    display: flex;
    justify-content: center;
    align-items: baseline;
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
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  data: any;
  role:Roles[]=[];
  token: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
     private toastr:ToastrService, private location:Location) { }
  createForm(){//Here we´re creating and object Form with the data that we require
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      lastnamef: [null, Validators.required],
      lastnamem: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role_id: ['', Validators.required],
      area:['', Validators.required],
      puesto: ['', Validators.required]
    },{
      validator: MustMatch('password','confirmPassword')
    });
  }
  ngOnInit(): void {
    this.createForm();
    this.getRoleUser();
    this.getAreaList();
  }
  get f(){
    return this.form.controls;
  }
  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    console.log('form value before to send',this.form.value);
    this.dataService.registerUser(this.form.value).subscribe(res => {
      this.data = res;
      if(this.data.status === 1){
        this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
      }else{
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
        this.form.get('name').reset();
        this.form.get('lastnamef').reset();
        this.form.get('lastnamem').reset();
        this.form.get('email').reset();
        this.form.get('password').reset();
        this.form.get('confirmPassword').reset();
      }
    });
  }
  getRoleUser(){
    this.token = jwt_decode(localStorage.getItem('token'));
        this.dataService.getRoles(this.token).subscribe((res)=>{
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
  area: Area[]=[];
  decode:any;
  title: Title[]=[];
  getAreaList(){
      this.token = jwt_decode(localStorage.getItem('token'));
        this.dataService.getAreaList(this.token).subscribe((res)=>{
        this.data = res;
          this.area = this.data.data;
          this.title = this.data.title;
          console.log(this.area);
        },
      err=>{
        console.log(err);
      });
    }
}
