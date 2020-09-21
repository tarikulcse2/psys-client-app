import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Baseurl } from '../helpers/base';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}
constructor(private http: HttpClient) { }


  getAll(){
    return this.http.get(Baseurl +'task')
  }
  getById(id: number){
    return this.http.get(Baseurl +'task/'+ id)
  }

  add(task: any){
    return this.http.post(Baseurl +'task', JSON.stringify(task), this.httpOptions)
  }

  update(task: any){
    return this.http.put(Baseurl +'task', JSON.stringify(task), this.httpOptions)
  }

  delete(id: number){
    return this.http.delete(Baseurl +'task/'+ id)
  }

  getAssing(userId: number){
    return this.http.get(Baseurl +'task/GetAssign?userId='+ userId)
  }

}
