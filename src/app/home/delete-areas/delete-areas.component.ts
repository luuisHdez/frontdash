import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/dataService/data.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-areas',
  templateUrl: './delete-areas.component.html',
  styleUrls: ['./delete-areas.component.css']
})
export class DeleteAreasComponent implements OnInit {

  constructor(private activateRout: ActivatedRoute, private dataService:DataService,
    private formBuilder:FormBuilder,private location:Location,
    private toasTr:ToastrService) { }
    token:any;
    formDeleteArea:FormGroup;
    data:any;
    submitted =false;
    createForm(){
      this.formDeleteArea = this.formBuilder.group({
          dirección:[''],
          responsable: [''],
          fecha: [''],
          area_id: ['']
      });
    }
    direccion:any;
    fecha:any;
    name:any;
    lastnamef:any;
    lastnamem:any;
  ngOnInit(): void {
    this.createForm();
    this.token = jwt_decode(localStorage.getItem('token'));
    let idarea = parseInt(this.activateRout.snapshot.params.id);
    let request = {
      token: this.token.user_id,
      idarea : idarea
    }
    this.dataService.getAreaDelete(request).subscribe((res:any)=>{
      this.data = res;
      console.log(this.data);
      this.direccion = this.data.area[0]._namearea;
      this.fecha = this.data.area[0].fecha_creacion;
      this.name = this.data.area[0]._name;
      this.lastnamef = this.data.area[0].lastnamef;
      this.lastnamem = this.data.area[0].lastnamem;
      this.formDeleteArea.get('area_id').setValue(this.data.area[0]._idarea);
      this.formDeleteArea.disable();
    });

  }
  goBack(){
    this.location.back();
  }
  onSubmit(){
   console.log(this.formDeleteArea.value);
    this.submitted = true;
    this.token = jwt_decode(localStorage.getItem('token'));
    let request = {
      user_id:  this.token.user_id,
      area_id: this.activateRout.snapshot.params.id
    }
    console.log(request);
    this.dataService.deleteArea(request).subscribe((res:any) =>{
      this.data = res;
      if(this.data.status === 1){
        this.toasTr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),{
          timeOut: 2000,
          progressBar: true,
        });
      }else{
        this.toasTr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message),{
          timeOut: 2000,
          progressBar: true
        }); 

      }
    });
  }
}
