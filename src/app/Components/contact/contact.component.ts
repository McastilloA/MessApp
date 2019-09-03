import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../../Services/user.service';
import { User } from 'firebase';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() uid: string;
  contact: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserById(this.uid).valueChanges().subscribe((dataUser: User) =>{
      this.contact = dataUser;
    });
  }

}
