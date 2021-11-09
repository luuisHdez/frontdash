import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UpdateService } from 'src/app/dataService/update.service';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css'] 
})
export class InitComponent implements OnInit {

constructor(private updateService:UpdateService) { }
token:any;
nameUser:any;
  ngOnInit(): void {
    this.token = jwt_decode(localStorage.getItem("token"));
    console.log(this.token);
    this.nameUser = this.token.name;
  }
  updateData(){
    let data = "data";
    let date_from = new Date();
    let date_to = date_from.setMonth(date_from.getMonth()-3);
    let datta ={
      data:data,
      date_from: moment(date_from).format('YYYY-MM-DD'),
      date_to: moment(date_to).format('YYYY-MM-DD')
    }
    this.updateService.updateData(datta).subscribe(res=>{
      console.log(res);
    });
  }
  updateArea(){
    let data = "area";
    let date_from = new Date();
    let date_to = date_from.setMonth(date_from.getMonth()-3);
    let datta = {
      data:data,
      date_from: moment(date_from).format('YYYY-MM-DD'),
      date_to: moment(date_to).format('YYYY-MM-DD')
    }
    this.updateService.updateData(datta).subscribe(res=>{
      console.log(res);
    });
  }
  updateRoles(){
      let data = "roles";
      let date_from =new Date();
      let date_to = date_from.setMonth(date_from.getMonth()-3);
      console.log(moment(date_to).format('YYYY-MM-DD'));
      console.log()
      let datta ={
        data:data,
        date_from: moment(date_from).format('YYYY-MM-DD'),
        date_to: moment(date_to).format('YYYY-MM-DD')
      }
      this.updateService.updateData(datta).subscribe(res=>{
        console.log(res);
      });
    }
}
