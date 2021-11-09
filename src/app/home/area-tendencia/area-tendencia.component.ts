import { Component, OnInit , } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { DataService } from '../../dataService/data.service';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-area-tendencia',
  templateUrl: './area-tendencia.component.html',
  styleUrls: ['./area-tendencia.component.css']
  
})
export class AreaTendenciaComponent implements OnInit {
chart:any;
  dataSource:any;
  displayedColumns:string[]= ['position','name','porcentaje'];
  ELEMENT_DATA:any[];
  mixedChart:any;
  tp:FormGroup;
  token:any;
  areas:any[]=[];
  submitted = false;
  ingreso:any;

  constructor(private dataService:DataService, private tP:FormBuilder) { }
  createForm(){
    this.tp = this.tP.group({
      area:[null,Validators.required],
      dateFrom:[null, Validators.required],
      dateTo: [null, Validators.required],
      ingresos: ['', Validators.required]
    });
  }
  get f(){
    return this.tp.controls;
  }
  
  ngOnInit(): void {
    this.chart = document.getElementsByTagName('canvas');
  
    Chart.register(...registerables);
    this.loadChart();
    this.createForm();
       
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource = this.ELEMENT_DATA;
    console.log(this.dataSource);
   
  }
  total:any;
data:any;
Datae:any;
  loadChart():void{
    
     this.dataService.areaTendency(this.token).subscribe(res =>{
       this.data = res;
       console.log('esta es la data recibida',this.data);
       this.Datae = this.data.data;
       this.areas = this.data.areas;
      let percent:number = 0;
       this.dataSource = this.data.table;
       this.dataSource.forEach((res:any)=>{
        res.percent = percent;
        return res;
       });
       console.log('datita',this.dataSource);

       let totals = this.data.data.map((res:any)=> res.total_price);
       let labels = this.data.data.map((res:any)=> res.name_categ);
       
     //random color
     let color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
     let color2 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
     let color3 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
     let color4 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
     this.chart = document.getElementById('myfirstChart');

      this.mixedChart = new Chart(this.chart, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Bar Dataset',
                data: totals,
                order: 2,
                backgroundColor:color2,
                borderColor:color4,
                hoverBackgroundColor:color,
                borderWidth:5
            }, {
                label: 'Line Dataset',
                data: totals,
                type: 'line',
                order: 1,
                backgroundColor: color4,
                borderColor: color3,
                borderWidth:1,
            }],
            labels: labels
        },
     });
     });
     
}
onSubmit(){
  this.submitted = true;
  console.log(moment(this.tp.get("dateFrom").value).format('YYYY-MM-DD'));
  if(this.tp.invalid){
    return;
  }
  let Form ={
    area: this.tp.get("area").value,
    dateFrom: moment(this.tp.get("dateFrom").value).format('YYYY-MM-DD'),
    dateTo: moment(this.tp.get("dateTo").value).format('YYYY-MM-DD'),
    ingreso: this.tp.get("ingresos").value
  }
console.log('Value existing',Form);
this.dataService.areaTendency(Form).subscribe(res =>{
  this.data = res;
  console.log('esta es la data recibida',this.data);
  this.Datae = this.data.data;
  this.areas = this.data.areas;

  let totals = this.data.data.map((res:any)=> res.total_price);
  let labels = this.data.data.map((res:any)=> res.name_categ);
  

  this.dataSource = this.data.table;
  console.log(this.dataSource);

let color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
let color2 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
let color3 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
let color4 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";

this.mixedChart.destroy();
 this.chart = document.getElementsByTagName('canvas');
 this.mixedChart = new Chart(this.chart, {
   type: 'bar',
   data: {
       datasets: [{
           label: 'Bar Dataset',
           data: totals,
           order: 2,
           backgroundColor: color,
           borderColor: color3,
           hoverBackgroundColor:color2,
           borderWidth:5,
       }, {
           label: 'Line Dataset',
           data: totals,
           type: 'line',
           order: 1,
           backgroundColor:color2,
           borderColor:color4,
           borderWidth: 5
       }],
       labels: labels
   }, 
});
if(localStorage.getItem('areas')){
  console.log("localStrogare is already set");
  let currentLocalStorage = JSON.parse(localStorage.getItem('areas'));
  localStorage.removeItem('areas');

  localStorage.setItem('areas', JSON.stringify(this.data.data));
  let newLocalStorage = JSON.parse(localStorage.getItem('areas'));

  let toValidate:any[]=[];
  console.log('current data', currentLocalStorage, 'newLocalStorage', newLocalStorage);
  for(let a of newLocalStorage){
    for(let b of currentLocalStorage){
      if(a.name_categ === b.name_categ)
      toValidate.push(b);
    }
  }
  console.log('this array is to validate', toValidate);
  console.log('this array is the new one', newLocalStorage);

  let percent:any[] = [];
  let i:number;

  console.log('length of newLocal', newLocalStorage);
  for(i=0;i<newLocalStorage.length;i++){
    if(newLocalStorage[i] < toValidate[i]){
      percent.push(Math.abs(Math.round(newLocalStorage[i].total_price / toValidate[i].total_price)*100 - 100));
    }else{
      console.log('dsdasdasd',newLocalStorage[i].total_price);
        percent.push(Math.round((newLocalStorage[i].total_price / toValidate[i].total_price)*100)-100);
    }
  }
  console.log("percents", percent);
  console.log('this id dataSource', this.dataSource);
  let j:number = 0;
  this.dataSource.forEach((res:any)=>{
    res.percent = percent[j];
    j++;
    return res;
  });
  console.log('final dataSource', this.dataSource);
}else{
  localStorage.setItem('areas', JSON.stringify(this.data.data));
}


});
}
}