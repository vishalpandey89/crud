import { Component, OnInit } from '@angular/core';
import{UserService} from './user.service';
import  {User}from './user';
import {clone} from 'lodash';
import { environment } from '../../environments/environment';
import { LoaderComponentService } from '../loader/loader.service';

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
  error: any;
  isShowAlert:boolean=false;
  alertMessage: any;
  constructor(private userService:UserService,private loaderService: LoaderComponentService) { }

  ngOnInit() {
    this.getInventory();
    this.getBrandList();
  }

  getInventory(){
    this.showLoader();
  this.userService.getInventoryList(environment.baseURL+'brandDetails').subscribe(
    (data: any) => {
      console.log(data)
      this.inventoryItems = data
      this.hideLoader();

    }, // success path
    error => {
      this.error = error // error path
      this.hideLoader();

    }
  );
  }
  getBrandList(){
    this.showLoader();
    this.userService.getBrandList(environment.baseURL+'getAll').subscribe(
     (data: any) => {
       console.log(data)
       this.brands = data
       this.hideLoader();
     }, // success path
     error => {
      this.hideLoader();

       this.error = error // error path
     }
   );
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
    if(this.inventoryItems.length){
      this.newInventoryItem={};
    }
    this.userForm=true;
    this.isNewUser=true;

  }
  hideItemForm(){
    this.newInventoryItem={};
    this.userForm=false;
    this.isNewUser=false;
  }
  showEditItemForm(item){
      window.scrollBy(0, -1000000);
      this.newInventoryItem=item;
    
    this.userForm=true;
    this.isNewUser=false;

  }
  saveInventoryItem(item:any){
    this.showLoader();
    if(item && !item.id){
      //add a new user
      this.userService.addInventory(environment.baseURL+'brandDetails',item).subscribe(
        (data: any) => {
          console.log(data)
          this.inventoryItems.push(data);
          this.newInventoryItem={};
          this.hideLoader();
          this.showAlert("Item Added Successfully");


        }, // success path
        error => {
          this.error = error // error path
          this.hideLoader();

        }
      );
    }
    else{
      this.userService.editInventory(environment.baseURL+'brandDetails/'+item.id,item).subscribe(
        (data: any) => {
          console.log(data)
          this.inventoryItems.push(data);
          this.newInventoryItem={};
          this.hideLoader();
          this.showAlert("Item Updated Successfully");


        }, // success path
        error => {
          this.error = error // error path
          this.hideLoader();

        }
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

  removeItem(item:any){
    this.showLoader();
    this.userService.deleteUser(environment.baseURL+'brandDetails/'+item.id).subscribe(
      (data: any) => {
        console.log(data)
        this.inventoryItems.splice(this.inventoryItems.indexOf(item),1);
    console.log(this.inventoryItems);
    this.hideLoader();
    this.showAlert("Item Removed Successfully");

      }, // success path
      error => {
        this.error = error // error path
        this.hideLoader();

      }
    );
  }

  public showLoader(): void {
    this.loaderService.show();
  }
  public hideLoader(): void {
    this.loaderService.hide();
  }
  public showAlert(message){
    this.alertMessage=message;
    this.isShowAlert=true;      
    setTimeout(function(){
      this.isShowAlert=false; 
      this.alertMessage="";
     
    
    },4000);
  }
}
