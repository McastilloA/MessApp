import { RequestComponent } from './Components/modals/request/request.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { User, status } from './Interfaces/user';
import { RequestService } from './Services/request.service';
import { UserService } from './Services/user.service';
import { AuthenticationService } from './Services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MessApp';
  user: User;
  requests: any[] = [];
  mailsShown: any[] = [];

  constructor (public router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private requestService: RequestService, private dialogService: DialogService ) {
      this.authenticationService.getStatus().subscribe((status) => {
        this.userService.getUserById(status.uid).valueChanges().subscribe((dataOauthUser: User) => {
          this.user = dataOauthUser;
          this.requestService.getRequestForEmail(this.user.email).valueChanges().subscribe((dataRequests: any) => {
            this.requests = dataRequests;
            this.requests = Object.values(this.requests);
            this.requests = this.requests.filter((response) => {
              return response.status !== 'Accepted' && response.status !== 'Rejected';
            });
            this.requests.forEach((runRequest) => {
              if (this.mailsShown.indexOf(runRequest.sender) === -1) {
                this.mailsShown.push((runRequest.sender));
                this.dialogService.addDialog(RequestComponent, {scope: this, currentRequest: runRequest});
              }
            });
          }, (error) => {
            console.log('WTF error:', error);
          });
        });
      });
    }
}