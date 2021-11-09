import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DataService } from 'src/app/dataService/data.service';

@Component({
  selector: 'app-index-areas',
  templateUrl: './index-areas.component.html',
  styleUrls: ['./index-areas.component.css']
})
export class IndexAreasComponent implements OnInit {
  
  constructor(private dataService: DataService) { }
  ELEMENT_DATA:any[];
  dataSource:any;
  data:any;
  button = true;
  displayedColumns:string[]= ['position','name','weight','symbol'];
  ngOnInit(): void {
    this.getAreasList();
  }
  getAreasList(){
    let token = jwt_decode(localStorage.getItem("token"));
    console.log(token);
    
    this.dataService.getAreas(token).subscribe(res =>{
      console.log(res);
      this.data = res;

      const getLengthOfObject = (obj:any) => { 
        let lengthOfObject = Object.keys(obj).length; 
        console.log('datita',lengthOfObject);
      }
      
     getLengthOfObject(this.data.data[0]);
      this.dataSource = this.data.data;
      console.log(this.data.data)
    });
  }
}
