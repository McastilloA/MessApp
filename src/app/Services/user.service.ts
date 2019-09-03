import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) {}

  // Regresan Observable
  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  getUserById(uid){
    return this.angularFireDatabase.object(`/users/${uid}`);
  }

  createUser(user){
    return this.angularFireDatabase.object(`/users/${user.uid}`).set(user);
  }

  updateUser(user){
    return this.angularFireDatabase.object(`/users/${user.uid}`).update(user);
  }

  setAvatar(avatar, uid){
    return this.angularFireDatabase.object(`/users/${uid}/avatar`).set(avatar);
  }

  addFriends(userId, friendId){
    this.angularFireDatabase.object(`/users/${userId}/friends/${friendId}`).set(friendId);
    return this.angularFireDatabase.object(`/users/${friendId}/friends/${userId}`).set(userId);
  }

}
