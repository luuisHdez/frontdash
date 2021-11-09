import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/dataService/data.service';
import { User } from 'src/app/model/user.model';
import jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-area',
  templateUrl: './editar-area.component.html',
  styleUrls: ['./editar-area.component.css']
})
export class EditarAreaComponent implements OnInit {
data:any;
token:any;
fea:FormGroup;
user:any;
responsable:any;
request:any;
fecha:any;
area:any;
lastnamef:any;
lastnamem:any;
submitted = false;
  constructor(private fEA:FormBuilder, private dataService:DataService,private router: Router,
    private activatedRoute:ActivatedRoute, private location:Location, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createform();
    this.token = jwt_decode(localStorage.getItem('token'));
    console.log(this.token);
    let idarea = parseInt(this.activatedRoute.snapshot.params.id);
    this.fea.get('id').setValue(idarea);
    console.log(typeof(idarea));
    this.request ={
      token: this.token.user_id,
      idarea: idarea
    }
    this.fea.get('area').disable();
    this.dataService.gettuser(this.request).subscribe((res:any) =>{
      console.log(res);
      this.data = res;
      this.user = this.data.users;
      console.log(this.user)
      let area = this.data.area;
      this.area = area[0]._namearea;
      this.responsable = area[0].responsable;
      this.lastnamef = area[0].lastnamef;
      this.lastnamem = area[0].lastnamem;
      const m = area.find((m:any) => m._namearea);
      this.fea.get('area').setValue(m._namearea);
      this.fecha = area[0].fecha_creacion;
      console.log(this.fecha);
    });
  }

  createform(){
    this.fea = this.fEA.group({
      area:[''],
      responsable:[''],
      fecha:[''],
      id: ['']
    });
  }
  get f(){
   return this.fea.controls;
  }
  onSubmit(){
    this.submitted = true;
    console.log(this.fea.value);
    if(this.fea.invalid){
      return
    }
    this.dataService.updateArea(this.fea.value).subscribe(res =>{
    this.data = res;
    if(this.data.status === 1){
      this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
        timeOut:1000,
        progressBar: true
      });
    }else{
      this.toastr.error("Ha ocurrido un error durante la actualización de datos");
    }
    
    });
  }
  goBack(){
    this.location.back();
  }
  
}
