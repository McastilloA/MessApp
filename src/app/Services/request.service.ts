import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  createRequest(request){
    const cleanEmail = request.receiver_email.replace( /\./g, ',' );
    return this.angularFireDatabase.object(`requests/${cleanEmail}/${request.sender}`).set(request);
  }

  statusRequest(request, status){
    const cleanEmail = request.receiver_email.replace( /\./g, ',');
    return this.angularFireDatabase.object(`requests/${cleanEmail}/${request.sender}/status`).set(status);
  }

  getRequestForEmail(email){
    const cleanEmail = email.replace(/\./g, ',');
    return this.angularFireDatabase.object(`requests/${cleanEmail}`);
  }
}
