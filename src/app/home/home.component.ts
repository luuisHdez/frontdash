import { Component, OnInit} from '@angular/core';
import { DataService } from '../dataService/data.service';
import { ToastrService } from 'ngx-toastr';

import jwt_decode from "jwt-decode";
import { Router }  from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  token:any;
  decode: any;
  nameUser:any;
  home = false;

  constructor(private dataService:DataService, private route:Router,
    private toastr: ToastrService) { }
    
    
  ngOnInit():any {
this.token = jwt_decode(localStorage.getItem("token"));
this.nameUser = this.token.name;
const route = this.route.url;
      if(route == '/'){
     this.route.navigate(['/init']);
      }
  }
    click(){
      this.token = localStorage.getItem('token');
      if(this.token){
        this.decode = jwt_decode(this.token);
        console.log(this.decode.user_id);
        this.dataService.authrole(this.decode).subscribe(res =>{
          this.data = res;
          console.log(this.data);
          if(this.data.status === 1){
            this.route.navigate(['index-user']);
          }else if(this.data.status === 0 ){
            this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
              timeOut: 1500,
              progressBar: true
            });
          }
        });
      }
    }
    logout(){
      localStorage.removeItem('token');
      this.route.navigate(['login']);
    }
    navigate(){
      const rout = this.route.url;
  if(rout == '/init'){
    return;
  }
  else{
    this.route.navigate(['/init']);
  }
    }
}