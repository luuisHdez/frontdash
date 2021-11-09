import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Goals } from '../model/goals.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
indexGoals(data:any){
return this.http.post<Goals[]>(this.apiUrl+'index-metas',data);
}
getFill(data:any){
  return this.http.post(this.apiUrl+'edit-metas',data);
}
editGoal(data:any){
  return this.http.put(this.apiUrl+'edit-metas',data);
}
getFills(){
  return this.http.get(this.apiUrl+'create-metas');
}
createGoal(data:any){
  return this.http.post(this.apiUrl+'create-metas',data);
}
deleteGoals(data:any){

  return this.http.post(this.apiUrl+'delete-metas', data);
}
getGoalDetails(data:any){
  return this.http.put(this.apiUrl+'delete-metas',data);
}
}
