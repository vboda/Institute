import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class CurrentUser {
        constructor(){}
        currentUser:any;
        setCurrentUser(user){
            this.currentUser = user;
        }
        getCurrentUser(){
            return this.currentUser;
        }
  }