import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }
  updateData(data:any){
    return this.http.post(this.apiUrl+'init',data);
    }
  }

