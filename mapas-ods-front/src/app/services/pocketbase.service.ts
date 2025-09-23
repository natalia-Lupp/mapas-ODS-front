import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
   providedIn: 'root'
})

export class PocketBaseService {
   pb: PocketBase;

   constructor() {
      this.pb = new PocketBase("http://127.0.0.1:8090");
   }

   async login(email: string, pwd: string) {
      console.log("xxxxxxx");
      try {
         const authData = await this.pb.collection('users').authWithPassword(email, pwd);
         console.log(authData);
         return authData.token;
      } catch (error) {
         console.error(error);
         throw error;
      }
   }


}