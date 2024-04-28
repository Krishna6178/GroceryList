// shared.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Item{
  name:string;
}
@Injectable({
  providedIn: 'root',
})

export class SharedService {
  //private userSource = new BehaviorSubject<string>('');
  private userSource = new BehaviorSubject<string>(localStorage.getItem('currentUser') || '');
  currentUser = this.userSource.asObservable();
  //url="http://54.82.78.127:3001/api/grocery";
  url="http://3.91.56.77:3001/api/grocery";
  constructor(private http: HttpClient){}

  // updateUser(newUser: string) {
  //   this.userSource.next(newUser);
  // }

  updateUser(user: string) {
    localStorage.setItem('currentUser', user);
    this.userSource.next(user);
  }

  getGroceryByRoom(room:string) {
    return this.http.get(this.url +"/room/" +room);
    //console.log("room url"+this.url +"/room/" +room );
}
}
