import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AreaTendencyService {

  constructor(private _http: HttpClient) { }
  getTendencyArea(){
    return this._http.get(environment.apiUrl+'/areatendency');
  }



  //

}
