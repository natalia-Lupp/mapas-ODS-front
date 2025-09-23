import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { BASE_URLS } from './conts';

@Injectable({
   providedIn: 'root'
})

export class PocketBaseService {
   pb: PocketBase;

   constructor() {
      this.pb = new PocketBase(BASE_URLS.URL_POCKETBASE);
   }

   async login(email: string, pwd: string): Promise<string | any> {
      try {
         const authData = await this.pb.collection('users').authWithPassword(email, pwd);
         return authData.token;
      } catch (error) {
         console.error(error);
         throw error;
      }
   }


}