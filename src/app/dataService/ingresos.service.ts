import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient, ) { }
  initIngresos(data:any){
    return this.http.post(this.apiUrl+'productos-tendencia',data);
}
gaugeChart(data:any){
  return this.http.post(this.apiUrl+'tendencia',data);
  }
}