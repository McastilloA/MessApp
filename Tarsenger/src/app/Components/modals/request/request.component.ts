import { AuthenticationService } from './../../../Services/authentication.service';
import { User } from './../../../Interfaces/user';
import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { UserService } from './../../../Services/user.service';
import { RequestService } from './../../../Services/request.service';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  currentRequest: any;
  user: User;
  friend: User;
  userSend: User;

  constructor(public dialogService: DialogService, private userService: UserService, private requestService: RequestService, private authenticationService: AuthenticationService) {
    super(dialogService);

    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data:User) => {
        this.userSend = data;
        console.log(this.userSend);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  confirm() {
    this.requestService.statusRequest(this.currentRequest, 'Accepted').then(
      () => {
        this.userService.addFriends(this.scope.user.uid, this.currentRequest.sender).then(
          () => {
            alert('Solicitud aceptada con exito!');
          }).catch((error) => {
            console.log(error);
          });
      }).catch((error) => {
        console.log(error);
      });
  }

  delete() {
    this.requestService.statusRequest(this.currentRequest, 'Rejected').then(
      () => {
        alert('Solicitud Rechazada con exito!');
      }).catch((error) => {
        console.log(error);
      });
  }

}