import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user';
import { Baseurl } from '../helpers/base';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('tarikul')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(user: any) {
        return this.http.post(Baseurl +'Account/Login', JSON.stringify(user), this.httpOptions)
    }

    reg(user: IUser){
        return this.http.post(Baseurl +'Account/Registration', JSON.stringify(user), this.httpOptions)
    }

    getAllUser(){
        return this.http.get(Baseurl +'Account/GetAllUser')
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('tarikul');
        this.currentUserSubject.next(null);
    }

    setToken(user: any){
        localStorage.setItem('tarikul', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    isLoggednIn() : boolean {
        return localStorage.getItem("tarikul") !== null;
    }
}