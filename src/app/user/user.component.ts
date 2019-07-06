import { Component, OnInit } from '@angular/core';
import{UserService} from './user.service';
import  {User}from './user';
import {clone} from 'lodash';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  inventoryItems:any[]=[]
  brands:any[]=[]
  users:User[];
  userForm:boolean=false;
  isNewUser:boolean;
  newInventoryItem:any={};
  editUserForm:boolean=false;
  editedUser:any={};
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.getInventory();
    this.getBrandList();
  }

  getInventory = function(){
   this.userService.getInventoryList('http://localhost:8080/api/v1/brandDetails').subscribe(
    (data: any) => {
      console.log(data)
      this.inventoryItems = data
    }, // success path
    error => {
      this.error = error // error path
    }
  );
  }
  getBrandList = function(){
    this.userService.getBrandList('http://localhost:8080/api/v1/getAll').subscribe(
     (data: any) => {
       console.log(data)
       this.brands = data
     }, // success path
     error => {
       this.error = error // error path
     }
   );
   }
  getUsers=function(){
    this.users=this.userService.getUsersFromData();
  }

  showEditUserForm(user:User){
    if(!user){
      this.userForm=false;
      return;
    }
    this.editUserForm=true;
    this.editedUser=clone(user);


  }
  showAddUserForm(){

    // resets form if edited user
    if(this.inventoryItems.length){
      this.newInventoryItem={};
    }
    this.userForm=true;
    this.isNewUser=true;

  }
  saveInventoryItem=function(item:any){
    console.log(item)
    if(item && !item.id){
      //add a new user
      this.userService.addInventory('http://localhost:8080/api/v1/brandDetails',item).subscribe(
        
      );
    }
   
  }
  saveItem=function(item:any){
    console.log(item)
    if(this.isNewUser){
      //add a new user
      this.userService.addUser(item);
    }
    this.userForm=false;
  }
  updateUser(){
    this.userService.updateUser(this.editedUser);
    this.editUserForm=false;
    this.editedUser={};
  }

  removeUser(user:User){
    this.userService.deleteUser(user);
  }
  cancelEdits(){
    this.editedUser={};
    this.editUserForm=false;
  }

  cancelNewUser(){
    this.newInventoryItem={};
    this.userForm=false;
  }
}
