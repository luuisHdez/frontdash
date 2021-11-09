import { User } from "../model/user.model";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Roles } from "../model/roles.model";



@Injectable({
    providedIn: 'root'
  })
  export class UserService{
users:User;
role:Roles;
constructor(private http:HttpClient){}
getUser(user:User){
   this.users = user;
}
setUser(){
return this.users;
}

  }