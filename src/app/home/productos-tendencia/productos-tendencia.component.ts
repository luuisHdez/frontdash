import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IngresosService } from '../../dataService/ingresos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-productos-tendencia',
  templateUrl: './productos-tendencia.component.html',
  styleUrls: ['./productos-tendencia.component.css'],
})

export class ProductosTendenciaComponent implements OnInit {
//displayed
  constructor(private dataService:IngresosService, private formBuilder:FormBuilder,) { }
  displayedColumns:string[]= ['position','name','l'];
  dataSource:any;
  chart:any;
  mixedChart:any;
  data:any;
  Datae:any;
  formIngresos:FormGroup
  areas:any[]=[];
  submitted = false;
  Datate:any;
  _percents:any;
  _data:any;
  _percent:any;
  createForm(){
    this.formIngresos = this.formBuilder.group ({
      area:[null,Validators.required],
      dateFrom:[null, Validators.required],
      dateTo: [null, Validators.required],
      ingresos: ['', Validators.required]
    });
  }
  get f(){
    return this.formIngresos.controls;
  }

  ngOnInit(): void {
    this.chart = document.getElementsByTagName('canvas');
    Chart.register(...registerables);
    this.loadChart();
    this.createForm();

  }
  loadChart():void{
    let data = {
      area:'',
      dateFrom: '2020-01-01',
      dateTo: '2021-10-06',
      ingresos: 'mayor'
    }
    this.dataService.initIngresos(data).subscribe(res =>{
      this.data = res;
      this.areas = this.data.areas;
      console.log('data received',this.data);
      console.log('data received',this.data.methods);
      this.dataSource = this.data.products;
      let percent:number=0;
      this.dataSource.forEach((element:any) => {
        element.percents = percent;
        return element;
      });

        let totals = this.data.methods.map((res:any)=> res.count);
        console.log('esto es prods',totals);

        let label = this.data.methods.map((res:any)=> res.name_convenio);
        console.log(label);

    //  //random color
     let color1 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
     let color2 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
     let color3 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
     let color4 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
     let color5 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
     
      this.mixedChart = new Chart(this.chart,{
        type: 'radar',
        data:{
          datasets:[{
            label:'Tendencia de productos por área',
            data:totals,
    borderColor: color2,
    pointBackgroundColor: color3,
    pointBorderColor: color4,
    pointHoverBackgroundColor: color5,
    pointHoverBorderColor: 'rgb(255, 99, 132)'
          }],
          labels:label,
        },
        options:{
          elements: {
            line: {
              borderWidth: 3,

            }
          }
        },
      });
}); 
}
onSubmit(){
  this.submitted = true;
  if(this.formIngresos.invalid){
    return;
  }
  console.log(this.formIngresos.value);
  let form = {
    area: this.formIngresos.get("area").value,
    dateFrom: moment(this.formIngresos.get("dateFrom").value).format('YYYY-MM-DD'),
    dateTo: moment(this.formIngresos.get("dateTo").value).format('YYYY-MM-DD'),
    ingresos: this.formIngresos.get("ingresos").value
  }
  this.dataService.initIngresos(form).subscribe(res =>{
    this.data = res;
    this.areas = this.data.areas;
    this.dataSource = this.data.products;
    
    console.log('data received',this.data);
    console.log('data received',this.data.methods);
    
    if(this.data != null){
      let totals = this.data.methods.map((res:any)=> res.count);
        console.log('esto es prods',totals);

        let label = this.data.methods.map((res:any)=> res.name_convenio);
        console.log(label);
   //random color
   let color2 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
   let color3 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
   let color4 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
   let color5 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
   
   this.mixedChart.destroy();
   this.chart = document.getElementsByTagName('canvas');
    this.mixedChart = new Chart(this.chart,{
      type: 'radar',
      data:{
        datasets:[{
          label:'Tendencia de productos por área',
          data:totals,
          
  borderColor: color2,
  pointBackgroundColor: color3,
  pointBorderColor: color4,
  pointHoverBackgroundColor: color5,
  pointHoverBorderColor: 'rgb(255, 99, 132)',
        }],
        labels:label,
      },
      options:{
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    });
    }else{
      console.log("la data no está siendo recibida");
    }

    if(localStorage.getItem('products')){
      console.log('localStorage is setting');
     let currentLocalStorage = JSON.parse(localStorage.getItem('products'));
     localStorage.removeItem('products');
    
     localStorage.setItem('products', JSON.stringify(this.data.products));
     let newLocalStorage = JSON.parse(localStorage.getItem('products'));
    
     let toValidate:any[]=[];
     console.log('actual',currentLocalStorage,'nuevo',newLocalStorage);
      for(let a of newLocalStorage){
        for (let b of currentLocalStorage){
           if(a.name_categ === b.name_categ)
          toValidate.push(b);
        }
      }
      console.log('this array is to validate', toValidate);
      console.log('this array is the new', newLocalStorage);
      let percent:any[]=[];
      let i:number;
    
      console.log('length of newLocal', newLocalStorage);
      for (i=0;i<newLocalStorage.length;i++){
        if(newLocalStorage[i] < toValidate[i]){
          percent.push(Math.abs(Math.round((newLocalStorage[i].total_price / toValidate[i].total_price)*100)-100));
        }else{
          console.log('dsdasdasd',newLocalStorage[i].total_price);
        percent.push(Math.round((newLocalStorage[i].total_price / toValidate[i].total_price)*100)-100);
        }
      }
    
      console.log('estos son los porcentajes',percent);
      console.log('this is dataSource',this.dataSource);
      let j:number = 0;
      this.dataSource.forEach((res:any) =>{
        res.percents = percent[j];
        j++;
        return res;
      });
      console.log('final dataSource',this.dataSource);
    }else{
      localStorage.setItem('products', JSON.stringify(this.data.products));
    }
    

}); 

                                            // porcentajes(data:any[]){
                                            //   this.data = data;
                                            //   console.log(this.data,'dtatatatata');
                                            //   if(localStorage.getItem('products')){
                                            //     console.log('localStorage is setting');
                                            //    let currentLocalStorage = JSON.parse(localStorage.getItem('products'));
                                            //    localStorage.removeItem('products');

                                            //    localStorage.setItem('products', JSON.stringify(data));
                                            //    let newLocalStorage = JSON.parse(localStorage.getItem('products'));

                                            //    let toValidate:any[]=[];
                                            //    console.log('actual',currentLocalStorage,' ','nuevo',newLocalStorage);
                                            //     for(let a of newLocalStorage){
                                            //       for (let b of currentLocalStorage){
                                            //          if(a.name_categ === b.name_categ)
                                            //         toValidate.push(b);
                                            //       }
                                            //     }
                                            //     console.log('this array is to validate', toValidate);
                                            //     console.log('this array is the new', newLocalStorage);
                                            //     let percent:any[]=[];
                                            //     let i:number;
                                            //     for (i=0;i<newLocalStorage.length;i++){
                                            //       console.log('dsdasdasd',newLocalStorage[i].total_price);
                                            //       percent.push(Math.round(newLocalStorage[i].total_price / toValidate[i].total_price*100));
                                            //     }
                                            //     console.log(percent);
                                            //     console.log('this is dataSource',this.dataSource);
                                            //     let j:number =0;
                                            //     this.dataSource.forEach((res:any) =>{
                                            //       res.percents = percent[j];
                                            //       j++;
                                            //       return res;
                                            //     })
                                            //     console.log(this.dataSource);
                                            //   }else{
                                            //     localStorage.setItem('products', JSON.stringify(data));
                                            //   }
  //   if(localStorage.getItem('products')){
  //    this.currentLocal = JSON.parse(localStorage.getItem('products'));
  //    localStorage.removeItem('products');
  //    console.log('actual storage', this.currentLocal);

  //   let t= localStorage.setItem('products', JSON.stringify(data));
  //   console.log('Storage Actualizado',JSON.parse(localStorage.getItem('products')));
  //     let currenData:any[]=[];

  //   this.currentLocal.forEach((ele:any) =>{
  //      currenData =  [currenData+(ele.total_price)+'-'];
  //   });
  //   console.log('Data Actual',currenData);

  //   let newData:any[]=[];
  //   data.forEach((Ele:any) =>{
  //     newData = [newData+(Ele.total_price)+'-'];
  //   });
  //   console.log("New Data", newData);

  //   const getLengthOfObject = (obj:any) => { 
  //     let lengthOfObject = Object.keys(obj).length; 
  //     return lengthOfObject;
  //   }

  //   let percentToString = currenData.toString();
  //   let percentSplit = percentToString.split('-',getLengthOfObject(this.currentLocal[0]));
  //   console.log("Actual Percent",percentSplit);
    
  //   let newPercent = newData.toString();
  //   let newPercentSplit = newPercent.split('-', getLengthOfObject(this.data))
  //   console.log("New Percent",newPercentSplit);

  //   for(var i=0;i<newPercentSplit.length;i++){
     
  //    if(parseFloat(newPercentSplit[i]) < parseFloat(percentSplit[i])){
  //     this.totalpercent= parseFloat(newPercentSplit[i])/ parseFloat(percentSplit[i])*100;
  //      console.log(-(parseFloat(this.totalpercent)).toFixed(2));
  //      this._percents = {
  //      }
  //      this._percents['value'] = this.totalpercent;
  //      this.i++;
  //      this.totals.push(this._percents);
  //      this.dataSource[this.i].push(this.totals);
  //      console.log(this.totals);
  //    }else{
  //      this.totalpercent= parseFloat(newPercentSplit[i])/ parseFloat(percentSplit[i])*100;
  //      console.log("percents",(parseFloat(this.totalpercent)).toFixed(2));
  //    }
    
  //    this.dataSource.push(this.totals);
  //    console.log(this.dataSource);
  //   }
  //   console.log('Este es el porcentaje',this.totals);
  // }else{
  //   localStorage.setItem('products', JSON.stringify(data));
  // }
  }}

  
    
  
  
  
  


  