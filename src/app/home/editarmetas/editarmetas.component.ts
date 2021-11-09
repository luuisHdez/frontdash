import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { GoalsService } from '../../dataService/goals.service';
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

//objects
import { Area } from 'src/app/model/area.model';
import { Month } from 'src/app/model/month.model';
import { User } from 'src/app/model/user.model';
import { Goals } from 'src/app/model/goals.model';

@Component({
  selector: 'app-editarmetas',
  templateUrl: './editarmetas.component.html',
  styleUrls: ['./editarmetas.component.css']
})
export class EditarmetasComponent implements OnInit {

  constructor(private goalService:GoalsService, private toasTr:ToastrService,
    private fG: FormBuilder, private location:Location,
    private activatedRouter:ActivatedRoute) { }
  token:any;
  data:any;
  fills:any;
  area:any []=[];
  months: Month[]=[];
  users: User[]=[];
  m:FormGroup;
  submitted= false;
  goal: Goals[] =[];
  meta:any;
  responsable:any;
  dateto:any;
  monto:any;
  datefrom:any;
  _namearea:any;
  ngOnInit(): void {
    this.token = jwt_decode(localStorage.getItem('token'));
    this.createform();
    this.getFills();
    const id = this.activatedRouter.snapshot.params.id;
    this.m.get('id').setValue(id);
    this.meta = {
      user_id: this.token.user_id,
      goal: this.id
    }
    console.log(this.meta);
    this.data = this.goalService.getFill(this.meta).subscribe(res =>{
      console.log(res);
      this.fills = res;
      this.area = this.fills.areas;
      console.log(this.area);
      this.goal = this.fills.goals;
      console.log(this.goal);
      this.datefrom = this.goal[0].datefrom;
      this.dateto = this.goal[0].dateto;
      this.responsable = this.goal[0].responsable;
      this.dateto = this.goal[0].dateto;
      this._namearea = this.goal[0]._namearea;
      const m = this.goal.find (m => m.monto);
      this.m.get('monto').setValue(m.monto);
      
    });
  }
  id:any;
  
  getFills(){
    this.token = jwt_decode(localStorage.getItem('token'));
    this.id = this.activatedRouter.snapshot.params.id;
    
  }
  createform(){
    this.m = this.fG.group({
      area: [''],
      responsable: [''],
      dateto: [''],
      datefrom: [''],
      monto: [''],
      id: ['']
    });
  }

  get f(){
    return this.m.controls;
  }
  dataGoal:any;
  onSubmit(){
    
    this.token = jwt_decode(localStorage.getItem('token'));
    
    this.submitted = true;
    if(this.m.invalid){
      return;
    }
    console.log('form value',this.m.value);
    this.dataGoal = {
      form: this.m.value,
      user_id: this.token.user_id
    }
    console.log('form'+this.dataGoal);
    this.goalService.editGoal(this.dataGoal).subscribe(res => {
      this.data =res;
      if(this.data.status===1){
        this.toasTr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
      }else {
        this.toasTr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
      }
    });
  }
  goBack(){
    this.location.back();
  }
  lenght:any;
  select(){
    const id = this.activatedRouter.snapshot.params.id;
    this.meta = {
      user_id: this.token.user_id,
      goal: this.id
    }
    this.data = this.goalService.getFill(this.meta).subscribe(res =>{
      this.fills = res;
      this.goal = this.fills.goals;
      console.log(this.goal);
     this.lenght=  this.m.get("area").value;
     let user = this.m.get("responsable");
     user.setValue(this.lenght._name+' '+this.lenght.lastnamef+' '+this.lenght.lastnamem);

});
}
}
