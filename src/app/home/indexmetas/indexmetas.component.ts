import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../../dataService/goals.service';

import jwt_decode from 'jwt-decode';
import { Goals } from 'src/app/model/goals.model';


@Component({
  selector: 'app-indexmetas',
  templateUrl: './indexmetas.component.html',
  styleUrls: ['./indexmetas.component.css']
})
export class IndexmetasComponent implements OnInit {

  constructor(private goalService:GoalsService) { }
//Here we gonna make a variables
token:any;
data:any;
p:number=1;
dataSource:Goals[]=[];
displayedColumns:string[]= ['acciones','monto','fecha','area','responsable'];



ngOnInit(): void {
    this.token = jwt_decode(localStorage.getItem('token'));
    this.goalService.indexGoals(this.token).subscribe(res =>{
      this.data = res;
      this.dataSource = this.data.data;
      console.log(this.dataSource);
    }); 
}
Search(){
  
}
key:any='_idmetas';
reverse:boolean = false;
sort(key:any){
  this.key = key;
  this.reverse = !this.reverse;
}

}