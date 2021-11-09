import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { DataService } from '../dataService/data.service';
import { User } from '../model/user.model';
@Component({
  selector: 'app-index-user',
  template: 
` 
<mat-card-content id="divi">
<div class="content">
  <div id="panel">
  <mat-card-title> <mat-card-subtitle>Panel de Administración</mat-card-subtitle>
            
  <button mat-button id="button1" routerLink="/register" class="mat-elevation-z1" >Crear Nuevo Usuario</button>

</mat-card-title>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <!-- Position Column -->
  <ng-container matColumnDef="acciones">
    <th mat-header-cell *matHeaderCellDef>No.</th>
    <td mat-cell *matCellDef="let element">
    <button mat-button color="primary" routerLink="/edituser/{{element._id}}">Editar</button>
                <button *ngIf="element.status === true" mat-button color="warn" routerLink="/down-user/{{element._id}}">Desactivar</button>
                <button *ngIf="element.status === false" mat-button color="warn" routerLink="/activate-user/{{element._id}}">Activar</button></td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef>Nombre Completo</th>
    <td mat-cell *matCellDef="let element">{{element._name}}</td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="area">
    <th mat-header-cell *matHeaderCellDef>Área o Dirección</th>
    <td mat-cell *matCellDef="let element">{{element.area}}</td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="puesto">
    <th mat-header-cell *matHeaderCellDef>Puesto</th>
    <td mat-cell *matCellDef="let element">{{element.puesto}}</td>
  </ng-container>

  <ng-container matColumnDef="fecha">
  <th mat-header-cell *matHeaderCellDef>Fecha de Creación</th>
  <td mat-cell *matCellDef="let element">{{element.creado}}</td>
</ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr
      mat-row
      *matRowDef="let row; columns: displayedColumns;"
      ></tr>
</table>
      <mat-paginator [pageSizeOptions]="[5, 10, 20]"
      showFirstLastButtons 
      aria-label="Select page of periodic elements">
      </mat-paginator>
  </div>
</div>
<div id="cent" class="content-center">
  
</div>
</mat-card-content>
  `,
  styles: [`
    
  #button1{
    float: right;
    background-color: white;
    color: rgba(0,0,0,.6);
    font-size: 17px;
    border-radius: 0%;
   }
   mat-card-subtitle{
     display: inline-flex;
     font-size:25px
   }
   .mat-card-title {
    display: contents;
    margin-bottom: 8px;
}
   
  table{
   width: 100%;
   text-align:center;
   display: inline-table;
 }
 .mat-form-field {
   font-size: 14px;
 }
mat-card{
   border-radius: 10px;
   margin: 16px;
   margin-left: 32px;
   display: flex;
   justify-content: center;
   align-items: baseline;
}
.mat-row:hover .mat-cell {
   border-color: currentColor;
 }
 th.mat-header-cell {
   text-align: center;
 }
 td.mat-cell:first-of-type{
     padding-left: 24px;
 }
    
    `]
})
export class IndexUserComponent implements OnInit {
settings: any;
token:any;
decode: any;
user: User[]= [];
data:any;
_name: any;
p:number = 1;
status:any;
dataSource:User[]=[];
displayedColumns:string[]= ['acciones','name','area','puesto','fecha'];
home:any;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  this.getUserList();
  this.home = false;
  }
  click(){
    this.router.navigate(['/register']);
  }
  getUserList(){
    this.token = localStorage.getItem('token');
    this.decode = jwt_decode(this.token);
    console.log('id of user',this.decode.user_id);
    this.dataService.getUserList(this.decode).subscribe((res) =>{
      this.data = res;
      this.dataSource = this.data.data;
      console.log('is working',this.dataSource);
    },
    err=>{
      console.log(err);
    });
  }
  Search(){
    if(this._name == ""){
      this.ngOnInit();
    }else{
      this.user = this.user.filter(res =>{
        return res._name.toLocaleLowerCase().match(this._name.toLocaleLowerCase);
      });
    }
  }
  key: any= 'id';
  reverse:boolean = false;
  sort(key:any){
    this.key = key;
  this.reverse = !this.reverse;
  } 
  selectedUser: any;
}
