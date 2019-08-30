import { UserService } from './../../Services/user.service';
import { AuthenticationService } from './../../Services/authentication.service';
import { User } from './../../Interfaces/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private router: Router, private firebaseStorage: AngularFireStorage) { }

  ngOnInit() {
    this.profileUser();
  }

  profileUser(){
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((dataProfile:User) => {
        this.user = dataProfile;
      },(error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  saveSetting(){
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg')
      .putString(this.croppedImage, 'data_url');
      pictures.then(() => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((success) => {
          this.userService.setAvatar(success, this.user.uid).then(() => {
          }).catch((error) => {
            alert('error al subir Avatar');
            console.log(error);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    }else{
      this.userService.updateUser(this.user).then(() => {
        alert('Actualización exitosa');
        this.router.navigate(['home']);
      }).catch((error) => {
        alert('Error de actualizacion:');
        console.log(error);
      });
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

}
