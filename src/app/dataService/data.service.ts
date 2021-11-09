import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Roles } from '../model/roles.model';
import { Area } from '../model/area.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) {}
  
  registerUser(data:any){
    return this.http.post(this.apiUrl+'register',data);
  }
  login(data:any){
    return this.http.post(this.apiUrl+'login',data);
  }
  getD(data:any){
    return this.http.post(this.apiUrl+'',data);
}
  getfull(){
  return this.http.get(this.apiUrl+'');
}
getRoles(data: any){
  return this.http.get<Roles[]>(this.apiUrl+'register',data);
}
authrole(data:any){
  return this.http.post(this.apiUrl+'index/user',data);
}
getUserList(data:any){
  return this.http.post<User[]>(this.apiUrl+'index_user',data);
}
getAreaList(data:any){
  return this.http.get<Area>(this.apiUrl+'register',data);
}
tendency(){
  return this.http.get(this.apiUrl+'index-tendencia');
}
areaTendency(data:any){
  return this.http.post(this.apiUrl+'areatendencia',data);
}
getAreas(data:any){
  return this.http.post(this.apiUrl+'index-areas',data);
}
crearArea(data:any){
  return this.http.post(this.apiUrl+'crear-area',data);
}
gettinUser(){
  return this.http.get<User>(this.apiUrl+'crear-area');
}
gettuser(data:any){
  return this.http.post(this.apiUrl+'editar-area',data);
}
updateArea(data:any){
  return this.http.put(this.apiUrl+'editar-area',data);
}
getproducts(){
  return this.http.get(this.apiUrl+'productos-tendencia');
}
getdatabase(data:any){
  return this.http.post(this.apiUrl+'productos-tendencia',data);
}
deleteArea(data:any){
  return this.http.post(this.apiUrl+'delete-area',data);
}
getAreaDelete(data:any){
  return this.http.put(this.apiUrl+'delete-area',data);
}
}