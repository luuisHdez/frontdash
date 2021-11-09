import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { GoalsService } from '../../dataService/goals.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Goals } from 'src/app/model/goals.model';

@Component({
  selector: 'app-deletemetas',
  templateUrl: './deletemetas.component.html',
  styleUrls: ['./deletemetas.component.css']
})
export class DeletemetasComponent implements OnInit {

  constructor(private goalService:GoalsService, private toasTr:ToastrService,
    private fG: FormBuilder, private location:Location,
    private router:Router, private activatedRouter:ActivatedRoute) { }

    formDelete:FormGroup;
    token:any;
    data:any;
    _name:any;
    lastnamef:any;
    lastnamem:any;
    datefrom: any;
    monto: any;
    dateto:any;
    _namearea:any;
    submitted = false;
    meta:any;
    goal: Goals[] = [];
    id:any;
  ngOnInit(): void {
    this.token = jwt_decode(localStorage.getItem('token'));
    this.createForm();
    this.id = this.activatedRouter.snapshot.params.id;
    this.meta = {
      user_id: this.token.user_id,
      goal: this.id
    }
    this.goalService.getGoalDetails(this.meta).subscribe(res =>{
      console.log('data retrieved',res);
      this.data = res;
      this._name = this.data.goal[0]._name;
      this.lastnamef = this.data.goal[0].lastnamef;
      this.lastnamem = this.data.goal[0].lastnamem;
      this.datefrom = this.data.goal[0].datefrom;
      this.monto = this.data.goal[0].monto;
      this.dateto = this.data.goal[0].dateto;
      this._namearea = this.data.goal[0]._namearea;
      this.formDelete.disable();
      this.formDelete.get('id').setValue(this.data.goal[0]._idmetas);
    });
  }
  createForm(){
    this.formDelete = this.fG.group({
      area: [''],
      user: [''],
      month: [''],
      anio: ['', Validators.required],
      monto: ['', Validators.required],
      id: ['', Validators.required]
    });
  }
  get f(){
    return this.formDelete.controls;
  }
  goBack(){
    this.location.back();
  }
  val:any;
  onSubmit(){
    this.token = jwt_decode(localStorage.getItem('token'));

    this.val = this.formDelete.get('id').value;
    this.meta = {
      user_id: this.token.user_id,
      goal: this.val
    }
    this.goalService.deleteGoals(this.meta).subscribe(res =>{
      this.data = res;
      if(this.data.status === 1){
        this.router.navigate(["/index-metas"]);
        this.toasTr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
      }else{
        this.toasTr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code),{
          timeOut: 1000,
          progressBar: true
        });
      }
    });

}
}