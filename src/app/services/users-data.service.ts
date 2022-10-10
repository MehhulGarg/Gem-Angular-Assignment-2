import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor() { }
  public tech:Array<String>=[];

  public myData: Array<{ username: string; gender: string; email: string; phone: string; category: string; profile_photo:any; favTech:Array<String>}> =[];
public getData(){
  return this.myData;
}
 public setValues(value: String[]){
  this.tech=value;
 }
 public getValues(){
  return this.tech;
 }
 public getUsers():Observable<any> {
  return of(this.myData);
}

}
