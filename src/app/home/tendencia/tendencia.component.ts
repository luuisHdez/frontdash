import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import jwt_decode  from 'jwt-decode';
import { IngresosService } from '../../dataService/ingresos.service';
import { Prueba } from '../../model/prueba';
import * as moment from 'moment';

@Component({
  selector: 'app-tendencia',
  templateUrl: './tendencia.component.html',
  styleUrls: ['./tendencia.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TendenciaComponent implements OnInit {
  canvas: any;
  ctx: any;
  mychart:any
  chart:any;
  dataSource:any;
  ELEMENT_DATA:any[];
  mixedChart:any;
  formTendencia:FormGroup;
  token:any;
  areas:any[]=[];
  submitted = false;
  ingreso:any;
  area0:Prueba[] =[];
  area1:Prueba[] = [];
  area2:Prueba[] = [];
  area3:Prueba[] = [];
  area4:Prueba[] = [];
  area5:Prueba[] = [];
  area6:Prueba[] = [];
  area7:Prueba[] = [];
  area8:Prueba[] = [];
  area9:Prueba[] = [];
  
  orderList:Array<any>[] = [];
  month:any[]=[];
  
  constructor(private ingresoService:IngresosService, private tP:FormBuilder) {
    
   }
public data:any;
createForm(){
  this.formTendencia = this.tP.group({
    area:[null,Validators.required],
    dateFrom:[null, Validators.required],
    dateTo: [null, Validators.required],
    ingresos: ['', Validators.required]
  });
}
datita:any[]=[];
  ngOnInit(): void {
    let graph =document.getElementsByClassName('ngx-charts-outer') as HTMLCollectionOf<HTMLElement>;
    if(graph.length != 0){
      graph[0].style.paddingLeft = "26%";
      graph[0].style.width="500px";
      graph[0].style.marginLeft="8%";
    }
    this.token = jwt_decode(localStorage.getItem("token"));
    let user = this.token.user_id;

    let data = {
      user_id :user,
      date_from: '2020-01-01',
      date_to: '2020-07-30'
    }

    this.ingresoService.gaugeChart(data).subscribe((res:any) => {
      console.log('esta es la data que retorna',res);
      this.data = res;
     this.datita = this.data.data;
     console.log(this.datita);
     Object.assign(this.datita);
      
    });
    
    this.createForm();
    Chart.register(...registerables);
    this.canvas = document.getElementsByTagName('canvas');
    
    this.loadChart();
  }
  result:any;
  i:any =0;
  length0:any = [];
  length1:any = [];
  length2:any = [];
  length3:any = [];
  length4:any = [];
  length5:any = [];
  length6:any = [];
  length7:any = [];
  length8:any = [];
  length9:any = [];
  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  loadChart() {
    Chart.register(...registerables);
    this.canvas = document.getElementsByTagName('canvas');
    this.token = jwt_decode(localStorage.getItem("token"));
    let user = this.token.user_id;

    let data = {
      user_id :user,
      date_from: '2020-01-01',
      date_to: '2020-07-30'
    }
    this.ingresoService.gaugeChart(data).subscribe((res:any) =>{
      this.data = res;
      this.areas = this.data.areasList;
      this.month = this.data.months;
      console.log('kudkunaksdjn',this.data);
      console.log("meses", this.data.months);
      let it:number =0;
      let arreglo:any[]=[];
       for(let f of this.data.list){
       arreglo[it] = {
         total: this.data.totales[it],
         area: this.data.list[it]
      }
       it++;
       }
        let orderList:any = arreglo.sort(function(a , b) { return b.total - a.total });
        console.log("este es el orderlist", orderList);
        let area0 = (<any>(orderList)[0].area);
        let area1 = (<any>(orderList)[1].area);
        let area2 = (<any>(orderList)[2].area);
        let area3 = (<any>(orderList)[3].area);
        let area4 = (<any>(orderList)[4].area);
        let area5 = (<any>(orderList)[5].area);
        let area6 = (<any>(orderList)[6].area);
        let area7 = (<any>(orderList)[7].area);
        let area8 = (<any>(orderList)[8].area);
        let area9 = (<any>(orderList)[9].area);
                       let x:number=0;
                       this.data.areaChart.forEach((res:any)=>{
                       if(res.name_dept === area0){
                        this.area0.push(res);
                        x++;
                         }
                       });
                       x =0;
                      let o:number=0;
                       this.month.forEach((res:any)=>{
                        if(res._month === this.area0[x].meses){
                          this.length0[o] = this.area0[x].sum;
                          o++;
                          if(this.area0.length-1 >x){
                            console.log(x);
                            x++;
                          }
                        }else{this.length0[o] = 0;
                        o++;}
                        
                       });
                       console.log('esto es el resultado',this.length0);
x=0;
o=0;
                       this.data.areaChart.forEach((res:any)=>{
                       if(res.name_dept === area1){
                        this.area1.push(res);
                        x++;
                         }
                       });

                       let y:number =0;
                       this.month.forEach((res:any)=>{
                        if(res._month === this.area1[y].meses){
                          
                          this.length1[o] = this.area1[y].sum;
                          o++;
                          if(this.area1.length-1 >y){

                            console.log(y);
                            y++;
                          }
                        }else{this.length1[o] = 0;
                          //console.log(this.length[o]);
                        o++;}
                        
                       });
                       console.log('esto es el resultado',this.length1);
                       //-------------------------------
                       y=0;
                       o=0;
                       this.data.areaChart.forEach((res:any)=>{
                        if(res.name_dept === area2){
                         this.area2.push(res);
                          }
                        });
                        this.month.forEach((res:any)=>{
                         if(res._month === this.area2[y].meses){
                           
                           this.length2[o] = this.area2[y].sum;
                           o++;
                           if(this.area2.length-1 >y){
 
                             console.log(y);
                             y++;
                           }
                         }else{this.length2[o] = 0;
                           //console.log(this.length[o]);
                         o++;}
                         
                        });
                        console.log('esto es el resultado',this.length2);
                        //---------------------------------------
                        y=0;
                        o=0;
                        this.data.areaChart.forEach((res:any)=>{
                         if(res.name_dept === area3){
                          this.area3.push(res);
                           }
                         });
                         this.month.forEach((res:any)=>{
                          if(res._month === this.area3[y].meses){
                            
                            this.length3[o] = this.area3[y].sum;
                            o++;
                            if(this.area3.length-1 >y){
  
                              console.log(y);
                              y++;
                            }
                          }else{this.length3[o] = 0;
                            //console.log(this.length[o]);
                          o++;}
                          
                         });
                         console.log('esto es el resultado',this.length3);
                         //-----------------------------
                         y=0;
                         o=0;
                         this.data.areaChart.forEach((res:any)=>{
                          if(res.name_dept === area4){
                           this.area4.push(res);
                            }
                          });
                          this.month.forEach((res:any)=>{
                           if(res._month === this.area4[y].meses){
                             
                             this.length4[o] = this.area4[y].sum;
                             o++;
                             if(this.area4.length-1 >y){
   
                               console.log(y);
                               y++;
                             }
                           }else{this.length4[o] = 0;
                             //console.log(this.length[o]);
                           o++;}
                           
                          });
                          console.log('esto es el resultado',this.length4);
                          //----------------------------------
                          y=0;
                          o=0;
                          this.data.areaChart.forEach((res:any)=>{
                           if(res.name_dept === area5){
                            this.area5.push(res);
                             }
                           });
                           this.month.forEach((res:any)=>{
                            if(res._month === this.area5[y].meses){
                              
                              this.length5[o] = this.area5[y].sum;
                              o++;
                              if(this.area5.length-1 >y){
    
                                console.log(y);
                                y++;
                              }
                            }else{this.length5[o] = 0;
                              //console.log(this.length[o]);
                            o++;}
                            
                           });
                           console.log('esto es el resultado',this.length5);
                          //----------------------------------
                          y=0;
                          o=0;
                          this.data.areaChart.forEach((res:any)=>{
                           if(res.name_dept === area6){
                            this.area6.push(res);
                             }
                           });
                           this.month.forEach((res:any)=>{
                            if(res._month === this.area6[y].meses){
                              
                              this.length6[o] = this.area6[y].sum;
                              o++;
                              if(this.area6.length-1 >y){
    
                                console.log(y);
                                y++;
                              }
                            }else{this.length6[o] = 0;
                              //console.log(this.length[o]);
                            o++;}
                            
                           });
                           console.log('esto es el resultado',this.length6);
                          //----------------------------------
                          y=0;
                          o=0;
                          this.data.areaChart.forEach((res:any)=>{
                           if(res.name_dept === area7){
                            this.area7.push(res);
                             }
                           });
                           this.month.forEach((res:any)=>{
                            if(res._month === this.area7[y].meses){
                              
                              this.length7[o] = this.area7[y].sum;
                              o++;
                              if(this.area7.length-1 >y){
    
                                console.log(y);
                                y++;
                              }
                            }else{this.length7[o] = 0;
                              //console.log(this.length[o]);
                            o++;}
                            
                           });
                           console.log('esto es el resultado',this.length7);
                          //----------------------------------
                          y=0;
                          o=0;
                          this.data.areaChart.forEach((res:any)=>{
                           if(res.name_dept === area8){
                            this.area8.push(res);
                             }
                           });
                           this.month.forEach((res:any)=>{
                            if(res._month === this.area8[y].meses){
                              
                              this.length8[o] = this.area8[y].sum;
                              o++;
                              if(this.area8.length-1 >y){
    
                                console.log(y);
                                y++;
                              }
                            }else{this.length8[o] = 0;
                              //console.log(this.length[o]);
                            o++;}
                            
                           });
                           console.log('esto es el resultado',this.length8);
                          //----------------------------------
                          y=0;
                          o=0;
                          this.data.areaChart.forEach((res:any)=>{
                           if(res.name_dept === area9){
                            this.area9.push(res);
                             }
                           });
                           this.month.forEach((res:any)=>{
                            if(res._month === this.area3[y].meses){
                              
                              this.length9[o] = this.area9[y].sum;
                              o++;
                              if(this.area9.length-1 >y){
    
                                console.log(y);
                                y++;
                              }
                            }else{this.length9[o] = 0;
                              //console.log(this.length[o]);
                            o++;}
                            
                           });
                           console.log('esto es el resultado',this.length9);
                         
                        
                       
      let color0 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";
      let color1 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";
      let color2 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";
      let color3 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";
      let color4 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";
      let color5 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";
      let color6 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";
      let color7 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";
      let color8 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";
      let color9 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + "," + 0.5 + ")";

 this.canvas = new Chart (this.canvas, { 
      type: 'line',
      data: {
          datasets: [{
              label: area0,
              data: this.length0,
              backgroundColor: color0,
              fill: true,
          },
          {
            label: area1,
            data: this.length1,
            backgroundColor: color1,
            fill: true,
        },
        {
          label: area2,
          data: this.length2,
          backgroundColor: color2,
          fill: true,
      },
      {
        label: area3,
        data: this.length3,
        backgroundColor: color3,
        fill: true,
    },
    {
      label: area4,
      data: this.length4,
      backgroundColor: color4,
      fill: true,
  },
  {
    label: area5,
    data: this.length5,
    backgroundColor: color5,
    fill: true,
},
{
  label: area6,
  data: this.length6,
  backgroundColor: color6,
  fill: true,
},
{
  label: area7,
  data: this.length7,
  backgroundColor: color7,
  fill: true,
},
{
  label: area8,
  data: this.length8,
  backgroundColor: color8,
  fill: true,
},
{
  label: area9,
  data: this.length9,
  backgroundColor: color9,
  fill: true,
},
          ],
          labels: this.months
      },
  });
});
}
get f(){
  return this.formTendencia.controls;
}

onSubmit(){
  console.log(this.formTendencia.value,'values of form');
  this.token = jwt_decode(localStorage.getItem("token"));

  let form = {
    area: this.formTendencia.get("area").value,
    date_from: moment(this.formTendencia.get("dateFrom").value).format('YYYY-MM-DD'),
    date_to: moment(this.formTendencia.get("dateTo").value).format('YYYY-MM-DD'),
    ingresos: this.formTendencia.get("ingresos").value,
    user_id: this.token.user_id
  }
  this.ingresoService.gaugeChart(form).subscribe(res =>{
    console.log(res);
  });
  
}
       color1 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color2 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color3 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color4 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color5 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color6 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color7 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color8 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color9 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color10 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       color11 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","  +  Math.floor(Math.random() * 255) + ")";
       
  view: any = [500,400];
  legend: boolean = true;
  legendTitle= 'Tendencia de Áreas';
  legendPosition: any = 'below';
  gaugeType = "arch";
  gaugeValue = 28.3;
  gaugeLabel = "";
  gaugeAppendText = "km/hr";
  colorScheme:any = {
    domain: [this.color1,this.color2,this.color3,this.color4,this.color5,this.color6,this.color7,this.color8,this.color9,this.color10],
  };

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}