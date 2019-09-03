import { AuthenticationService } from './../../Services/authentication.service';
import { ConversationService } from './../../Services/conversation.service';
import { User } from './../../Interfaces/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  user: User;
  conversation_Id: string;
  textMessage: any;
  conversations: any[];
  shake: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
    private conversationService: ConversationService, private authenticationService: AuthenticationService) {

    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((dataUserConversation: User) => {
        this.user = dataUserConversation;
        this.userService.getUserById(this.friendId).valueChanges().subscribe((dataById: User) => {
          this.friend = dataById;
          const ids = [this.user.uid, this.friend.uid].sort();
          this.conversation_Id =  ids.join('|');
          this.getConversations();
        }, (error) => {
          console.log(error);
        });
      });
    });
  }

  ngOnInit() {
  }

  sendMesagge() {
    const message = {
      uid: this.conversation_Id,
      timestamp: Date.now(),
      text: this.textMessage,
      send: this.user.uid,
      receiver: this.friend.uid,
      type: 'text'
    };
    this.conversationService.createConversation(message).then(() => {
      this.textMessage = '';
    });
  }

  sendZumbido() {
    const message = {
      uid: this.conversation_Id,
      timestamp: Date.now(),
      text: 'zumbido',
      send: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };
    this.conversationService.createConversation(message).then(() => {
      this.doZumbido();
    });
  }

  doZumbido(){
    const audioZumbido = new Audio('assets/sound/zumbido.m4a');
    audioZumbido.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  getConversations(){
    this.conversationService.getConversation(this.conversation_Id).valueChanges().subscribe((dataConversations) => {
      this.conversations = dataConversations;
      this.conversations.forEach((message) => {
        if (!message.seen) {
          message.seen = true;
          this.conversationService.editConversation(message);
          if (message.type == 'text') {
            const audioMessage = new Audio ('assets/sound/new_message.m4a');
            audioMessage.play();
          }else if (message.type == 'zumbido'){
            this.doZumbido();
          }
        }
      });
    },(error) =>{
      console.log(error);
    });
  }

  getUserFullname(id){
    if (id == this.friend.uid) {
      return this.friend.fullName;
    }else{
      return this.user.fullName;
    }
  }

  getUserAvatar(id){
    if (id == this.friend.uid) {
      return this.friend.avatar;
    }else{
      return this.user.avatar;
    }
  }

}
