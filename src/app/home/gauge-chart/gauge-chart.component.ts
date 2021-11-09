import { Component, OnInit } from '@angular/core';
import { single } from './data';
import { DataService } from 'src/app/dataService/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit{
  single: any[];
  view:any= [400,300];
  legend: boolean = true;
  legendPosition: any = 'below';

  constructor(private dataService:DataService, private _http:HttpClient) {
    Object.assign(this, { single });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit(){
    this.dataService.tendency().subscribe(res =>{
      console.log(res);
    });
  }
}

