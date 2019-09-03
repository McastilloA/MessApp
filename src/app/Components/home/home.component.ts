import { RequestService } from './../../Services/request.service';
import { AuthenticationService } from './../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../Interfaces/user';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  friends: User[];
  serchHome: '';
  user: User;
  friendEmail: string;
  userSend: string;

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private requestService: RequestService, private router: Router) { }

  ngOnInit() {
    this.getListFriends();
  }

  userProfile() {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((dataUser: User) => {
        this.user = dataUser;
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
        }
      },(error) => {
        console.log(error);
      });
    },(error) => {
      console.log(error);
    });
  }

  getListFriends() {
    this.userService.getUsers().valueChanges()
      .subscribe((data: User[]) => {
        this.friends = data;
      }, (error) => {
        console.log(error);
      });
    this.userProfile();
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    }
    this.requestService.createRequest(request).then(() => {
      alert('Solicitud enviada exitosamente!');
      this.router.navigate(['/home']);
    }).catch((error) => {
      alert('Hubo error');
      console.log(error);
    });
  }

  addMessage(){
    this.userService.updateUser(this.user).then(() =>  {
      alert('OK Message');
    }).catch((error) => {
      console.log(error);
    });
  }

}
