import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  operation: string = 'login';
  fullName: string;
  nick: string;
  age: number;
  email: string;
  password: string;
  status: string = 'En línea';
  messagEveryday: any = 'Que piensas hoy?';

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register(){
    this.authenticationService.registerUser(this.email, this.password).then((dataOauth) => {
      const user = {
        uid: dataOauth.user.uid,
        fullName: this.fullName,
        nick: this.nick,
        age: this.age,
        email: this.email,
        status: this.status
      };
      this.userService.createUser(user).then(() => {
        alert('Registro Exitoso');
        this.router.navigate(['/profile']);
      }).catch((error) => {
        alert('Registro Fallido');
        console.log(error);
      });
    }).catch((errorOauthDB) =>{
      alert('Falla en autenticacion en el ingreso de datos');
      console.log(errorOauthDB);
    });
  }

  login(){
    this.authenticationService.loginUser(this.email, this.password).then(() => {
      alert('Ingreso Exitoso');
      this.router.navigate(['/home']);
    }).catch((error) => {
      alert('Ingreso Fallido');
      console.log(error);
    });
  }

  loginGoogle(){
    this.authenticationService.loginUserGoogle();
  }

  loginFacebook(){
    this.authenticationService.loginUserFacebook();
  }

}
