import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../model/roles.model';
import { Area } from '../model/area.model';
import { User } from '../model/user.model';
import { Title } from '../model/title.model';


@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://127.0.0.1:8000/api/';
 
getRoles(data: any){
  return this.http.get<Roles[]>(this.apiUrl+'edituser',data);
}
getAreaList(data:any){
  return this.http.get<Area>(this.apiUrl+'edituser',data);
}
gettingUser(data: any){
  return this.http.post<User[]>(this.apiUrl+'edituser',data);
}
updateUser(data:any, token:any){
  return this.http.put(this.apiUrl+'index-user',data);
}
getTitle(data:any, token:any){
  return this.http.post<Title[]>(this.apiUrl+'edituser',data);
}
desactiveUsr(data:any){
  return this.http.put(this.apiUrl+'down-user',data);
}
activateUsr(data:any){
  return this.http.put(this.apiUrl+'activate-user',data);
}

}