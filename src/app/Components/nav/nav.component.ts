import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../Services/authentication.service';
import { UserService } from '../../Services/user.service';
import { User } from '../../Interfaces/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  friends: User[];
  user: User;
  friendEmail: '';

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.profileUser();
  }

  profileUser(){
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((dataUser:User) => {
        this.user = dataUser;
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
        }
      }, (error2) =>{
        console.log(error2);
      });
    }, (error) => {
      console.log(error);
    });
  }

  logOut(){
    if (confirm('Seguro deseas cerrar sesión')) {
      this.authenticationService.Logout();
      this.router.navigate(['/login'])
    }else{
      return false;
    }
  }

}
