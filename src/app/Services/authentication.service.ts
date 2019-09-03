import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  registerUser(email: string, password: string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginUserGoogle(){
    return this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginUserFacebook(){
    return this.angularFireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  getStatus(){
    return this.angularFireAuth.authState;
  }

  Logout(){
    return this.angularFireAuth.auth.signOut();
  }

}
