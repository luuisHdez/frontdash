import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

  export class AuthGuard implements CanActivate{
    constructor( private router: Router ){

    }
    token: any;
    canActivate(){
        this.token = localStorage.getItem('token');
        if(this.token){
            return true;
        }else{
           return this.router.navigate(['login']);
        }
    }

}

