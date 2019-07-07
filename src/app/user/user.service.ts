import { Injectable } from '@angular/core';
import  {User} from './user';
import {USER_PERSONS} from './user-data';
import { findIndex } from 'lodash';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient){}

  private upersons=USER_PERSONS;

  getInventoryList(url) : any{
    return this.http.get(url);
  }

  getBrandList(url) : any{
    return this.http.get(url);
  }


  addInventory(url,data):any{
    return this.http.post(url,data);
  }
  editInventory(url,data):any{
    return this.http.put(url,data);
  }

  getUsersFromData():User[]{
    console.log(this.upersons);
    return this.upersons;
  }
 
  addUser(user:User){
    this.upersons.push(user);
    console.log(this.upersons);

  }
  
  updateUser(user:User){
    let index=findIndex(this.upersons,(u:User)=>{
      return u.id=== user.id;
    })
    this.upersons[index]=user;
  }
  deleteUser(url){
   return this.http.delete(url);
  }

}
